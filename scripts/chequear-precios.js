// Chequea el precio actual en Mercado Libre de cada producto cargado en la
// base y actualiza la fila si cambió. Pensado para correr solo, todos los
// días, desde GitHub Actions (ver .github/workflows/chequear-precios.yml) —
// no desde el sitio ni desde este repo en Vercel.
//
// Para correrlo a mano (por ejemplo para probarlo): copiá tu .env con las
// credenciales de la base y ejecutá:
//   node --env-file=.env scripts/chequear-precios.js

import mysql from 'mysql2/promise';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, VERCEL_DEPLOY_HOOK_URL } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
	console.error(
		'Faltan variables de entorno de la base (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).',
	);
	process.exit(1);
}

// Saca el ID de producto de Mercado Libre (ej. "MLA1234567890") a partir del
// link guardado. Los links cortos de "meli.la" no hacen un redirect HTTP
// normal (son una página con JavaScript que intenta abrir la app), así que
// primero probamos con la URL final después de redirects, y si no aparece
// ahí, buscamos el ID adentro del HTML de la página — casi siempre está en
// alguna etiqueta de metadatos (para que WhatsApp/Twitter puedan armar la
// vista previa), sin necesidad de ejecutar JavaScript.
async function sacarIdMLA(link) {
	const respuesta = await fetch(link, {
		redirect: 'follow',
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
		},
	});

	let match = respuesta.url.match(/MLA-?(\d{6,})/i);
	if (match) {
		await respuesta.body?.cancel?.();
		return { id: `MLA${match[1]}`, urlFinal: respuesta.url, status: respuesta.status };
	}

	const html = await respuesta.text();

	// Diagnóstico: dónde aparece realmente el ID en la página (og:url,
	// canonical, o cualquier otro lado) — para no quedarnos con el primer
	// "MLA..." que aparezca de casualidad (puede ser de un script de
	// tracking, no el del producto).
	const ogUrl = html.match(/property="og:url"\s+content="([^"]+)"/i)?.[1];
	const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1];
	const todosLosMatches = [...html.matchAll(/MLA-?\d{6,}/gi)];
	const idsUnicos = [...new Set(todosLosMatches.map((m) => m[0]))];

	return {
		id: null,
		urlFinal: respuesta.url,
		status: respuesta.status,
		ogUrl,
		canonical,
		idsUnicos,
	};
}

// Consulta el precio actual en la API pública de Mercado Libre (gratis, sin
// necesidad de login ni de leer HTML).
async function precioActual(idMLA) {
	const respuesta = await fetch(`https://api.mercadolibre.com/items/${idMLA}`);
	if (!respuesta.ok) return null;
	const datos = await respuesta.json();
	if (typeof datos.price !== 'number') return null;
	return Math.round(datos.price);
}

async function avisarADeployHook() {
	if (!VERCEL_DEPLOY_HOOK_URL) return;
	try {
		await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
		console.log('Redeploy de Vercel disparado.');
	} catch (error) {
		console.error('No se pudo disparar el redeploy de Vercel:', error.message);
	}
}

async function main() {
	const conexion = await mysql.createConnection({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: { rejectUnauthorized: false },
	});

	const [productos] = await conexion.execute(
		'SELECT id, nombre, precio, link FROM productos WHERE link NOT LIKE ?',
		['%PEGAR-LINK%'],
	);

	let cambiados = 0;
	let sinDetectar = 0;

	for (const producto of productos) {
		try {
			const { id: idMLA, status, ogUrl, canonical, idsUnicos } = await sacarIdMLA(producto.link);
			if (!idMLA) {
				console.log(
					`[sin ID] "${producto.nombre}" — status ${status}, og:url=${ogUrl}, canonical=${canonical}, IDs encontrados en el HTML: ${JSON.stringify(idsUnicos)}`,
				);
				sinDetectar++;
				continue;
			}

			const nuevoPrecio = await precioActual(idMLA);
			if (nuevoPrecio === null) {
				console.log(`[sin precio] "${producto.nombre}" (${idMLA}) — la API no devolvió un precio válido`);
				sinDetectar++;
				continue;
			}

			if (nuevoPrecio !== producto.precio) {
				await conexion.execute('UPDATE productos SET precio = ? WHERE id = ?', [
					nuevoPrecio,
					producto.id,
				]);
				console.log(`[actualizado] "${producto.nombre}": $${producto.precio} → $${nuevoPrecio}`);
				cambiados++;
			}
		} catch (error) {
			console.log(`[error] "${producto.nombre}" — ${error.message}`);
			sinDetectar++;
		}
	}

	await conexion.end();

	console.log(
		`\nListo. ${cambiados} precio(s) actualizado(s), ${sinDetectar} producto(s) no se pudieron chequear, de ${productos.length} en total.`,
	);

	if (cambiados > 0) {
		await avisarADeployHook();
	}
}

main().catch((error) => {
	console.error('Error corriendo el chequeo de precios:', error);
	process.exit(1);
});
