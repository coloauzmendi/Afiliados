// Chequea el precio actual en Mercado Libre de cada producto cargado en la
// base y actualiza la fila si cambió. Pensado para correr solo, todos los
// días, desde GitHub Actions (ver .github/workflows/chequear-precios.yml) —
// no desde el sitio ni desde este repo en Vercel.
//
// El link de afiliado (columna "link") no sirve para identificar el
// producto: es un acortador (meli.la) que solo se resuelve con JavaScript,
// y siempre lleva a la página genérica de "compartir" del perfil, no al
// producto puntual. En cambio, la URL de la imagen (columna "imagen",
// alojada en http2.mlstatic.com) siempre trae el ID de Mercado Libre en el
// nombre de archivo — de ahí lo sacamos.
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

function idDesdeImagen(imagen) {
	const match = imagen?.match(/MLA\d+/i);
	return match ? match[0].toUpperCase() : null;
}

// Consulta el precio actual en la API pública de Mercado Libre (gratis, sin
// necesidad de login ni de leer HTML).
async function precioActual(idMLA) {
	const respuesta = await fetch(`https://api.mercadolibre.com/items/${idMLA}`, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
			Accept: 'application/json',
		},
	});
	if (!respuesta.ok) {
		const cuerpo = await respuesta.text();
		console.log(`  → la API respondió ${respuesta.status} para ${idMLA}: ${cuerpo.slice(0, 200)}`);
		return null;
	}
	const datos = await respuesta.json();
	if (typeof datos.price !== 'number') {
		console.log(`  → la API respondió sin precio numérico para ${idMLA}: ${JSON.stringify(datos).slice(0, 200)}`);
		return null;
	}
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
		'SELECT id, nombre, precio, imagen FROM productos WHERE imagen IS NOT NULL',
	);

	let cambiados = 0;
	let sinDetectar = 0;

	for (const producto of productos) {
		try {
			const idMLA = idDesdeImagen(producto.imagen);
			if (!idMLA) {
				console.log(`[sin ID] "${producto.nombre}" — no encontré un ID de Mercado Libre en la imagen (${producto.imagen})`);
				sinDetectar++;
				continue;
			}

			const nuevoPrecio = await precioActual(idMLA);
			if (nuevoPrecio === null) {
				console.log(`[sin precio] "${producto.nombre}" (${idMLA})`);
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
