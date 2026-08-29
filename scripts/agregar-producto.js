// Script para cargar productos rápido, sin escribir SQL a mano.
//
// Uso:
//   npm run agregar-producto
//
// Te va a pedir el link de afiliado (el que sacás con "Compartir" en el
// panel de afiliados de Mercado Libre) y busca automáticamente el nombre,
// precio e imagen del producto usando la API pública de Mercado Libre.
// Vos solo confirmás (o corregís) los datos y elegís el destacado.
//
// Corre en tu compu, no en la nube — necesita llegar a mercadolibre.com y
// a tu base de datos.

import { createInterface } from 'node:readline/promises';
import mysql from 'mysql2/promise';

const rl = createInterface({ input: process.stdin, output: process.stdout });

async function preguntar(texto, valorPorDefecto) {
	const sufijo = valorPorDefecto ? ` [${valorPorDefecto}]` : '';
	const respuesta = (await rl.question(`${texto}${sufijo}: `)).trim();
	return respuesta || valorPorDefecto || '';
}

function getPool() {
	const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
	if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
		console.error(
			'\nFaltan las variables de entorno de la base. Corré el script así:\n' +
				'  npm run agregar-producto\n' +
				'(ese comando ya carga tu archivo .env solo — fijate que exista en la raíz del proyecto)\n',
		);
		process.exit(1);
	}
	return mysql.createPool({
		host: DB_HOST,
		port: Number(DB_PORT ?? 3306),
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: { rejectUnauthorized: false },
	});
}

const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
	'Chrome/131.0.0.0 Safari/537.36';

/** Saca el ID de producto (ej: MLA1234567890) de una URL o de cualquier texto. */
function extraerItemId(texto) {
	if (!texto) return null;
	const match = texto.match(/(MLA-?\d{6,})/i);
	if (!match) return null;
	return match[1].replace('-', '').toUpperCase();
}

/** Lee el content de una meta tag Open Graph del HTML de una página. */
function extraerMeta(html, propiedad) {
	const regex = new RegExp(`<meta[^>]+property=["']${propiedad}["'][^>]+content=["']([^"']+)["']`, 'i');
	return html.match(regex)?.[1] ?? null;
}

/** Busca un precio en los bloques JSON-LD (datos estructurados) de la página. */
function extraerPrecioDeHtml(html) {
	const bloques = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
	for (const [, contenido] of bloques) {
		try {
			const json = JSON.parse(contenido);
			for (const item of Array.isArray(json) ? json : [json]) {
				const precio = item?.offers?.price ?? item?.offers?.[0]?.price;
				if (precio) return Number(precio);
			}
		} catch {
			// Bloque de JSON-LD inválido o distinto al esperado, seguimos probando.
		}
	}
	return null;
}

/** Trae nombre, precio, % de descuento e imagen desde la API pública de Mercado Libre. */
async function buscarDatosProducto(itemId) {
	const resp = await fetch(`https://api.mercadolibre.com/items/${itemId}`, {
		headers: { 'User-Agent': USER_AGENT },
	});
	if (!resp.ok) return null;
	const data = await resp.json();

	const imagen = data.pictures?.[0]?.secure_url ?? data.pictures?.[0]?.url ?? data.thumbnail ?? null;

	let destacadoSugerido = '';
	if (data.original_price && data.original_price > data.price) {
		const pct = Math.round((1 - data.price / data.original_price) * 100);
		destacadoSugerido = `${pct}% OFF`;
	}

	return {
		nombre: data.title,
		precio: Math.round(data.price),
		imagen,
		destacadoSugerido,
	};
}

/**
 * Sigue el link de afiliado y trata de sacar los datos del producto, en orden:
 * 1) si la URL final ya tiene el ID del producto, usa la API oficial (más confiable).
 * 2) si no, busca el ID escondido en la meta tag og:url o en cualquier parte del HTML.
 * 3) si tampoco aparece, saca lo que se pueda directo de la página (og:title,
 *    og:image, y el precio de los datos estructurados JSON-LD si están).
 */
async function buscarDatosDesdeLink(link) {
	const resp = await fetch(link, { redirect: 'follow', headers: { 'User-Agent': USER_AGENT } });
	const urlFinal = resp.url;
	console.log(`  Link resuelto a: ${urlFinal}`);
	const html = await resp.text();

	const itemId =
		extraerItemId(urlFinal) ?? extraerItemId(extraerMeta(html, 'og:url')) ?? extraerItemId(html);

	if (itemId) {
		console.log(`  ID de producto encontrado: ${itemId}`);
		const datos = await buscarDatosProducto(itemId);
		if (datos) return datos;
		console.log('  La API no devolvió datos para ese ID, pruebo leyendo la página directamente...');
	}

	const nombre = extraerMeta(html, 'og:title');
	const imagen = extraerMeta(html, 'og:image');
	const precio = extraerPrecioDeHtml(html);
	if (!nombre && !precio) return null;

	return {
		nombre: nombre ?? '',
		precio: precio ? Math.round(precio) : 0,
		imagen,
		destacadoSugerido: '',
	};
}

async function elegirSubcategoria(pool) {
	const [filas] = await pool.query('SELECT slug, title FROM subcategorias ORDER BY slug');
	if (filas.length === 0) {
		console.error('No hay ninguna subcategoría creada todavía en la base.');
		process.exit(1);
	}
	console.log('\nSubcategorías disponibles:');
	for (const f of filas) console.log(`  - ${f.slug}  (${f.title})`);

	const slugs = new Set(filas.map((f) => f.slug));
	let slug = '';
	while (!slugs.has(slug)) {
		slug = await preguntar('\nSlug de la subcategoría');
		if (!slugs.has(slug)) console.log('  Ese slug no existe, fijate arriba y escribilo de nuevo.');
	}
	return slug;
}

async function cargarUnProducto(pool) {
	const slug = await elegirSubcategoria(pool);
	const link = await preguntar('\nLink de afiliado (meli.la/...)');

	let nombre = '';
	let precio = 0;
	let imagen = '';
	let destacadoSugerido = '';

	console.log('\nBuscando datos del producto...');
	try {
		const datos = await buscarDatosDesdeLink(link);
		if (!datos) throw new Error('No se pudo sacar ningún dato de esa página.');

		nombre = datos.nombre;
		precio = datos.precio;
		imagen = datos.imagen ?? '';
		destacadoSugerido = datos.destacadoSugerido;

		console.log('\nEncontrado:');
		console.log(`  Nombre: ${nombre}`);
		console.log(`  Precio: $${precio.toLocaleString('es-AR')}`);
		console.log(`  Imagen: ${imagen || '(sin imagen)'}`);
	} catch (err) {
		console.log(`\nNo se pudo autocompletar (${err.message}). Cargalo a mano:`);
	}

	nombre = await preguntar('Nombre del producto', nombre);
	const precioTexto = await preguntar('Precio (solo números)', String(precio || ''));
	precio = Number(precioTexto.replace(/[^0-9]/g, '')) || 0;
	imagen = await preguntar('URL de la imagen (Enter para dejar sin foto)', imagen);
	const destacado = await preguntar('Destacado (ej: 25% OFF)', destacadoSugerido);

	const [[{ siguienteOrden }]] = await pool.query(
		'SELECT COALESCE(MAX(orden), 0) + 1 AS siguienteOrden FROM productos WHERE subcategoria_slug = ?',
		[slug],
	);

	console.log('\n--- Confirmá los datos ---');
	console.log(`Subcategoría: ${slug}`);
	console.log(`Nombre:       ${nombre}`);
	console.log(`Precio:       $${precio.toLocaleString('es-AR')}`);
	console.log(`Destacado:    ${destacado || '(sin destacado)'}`);
	console.log(`Imagen:       ${imagen || '(sin imagen)'}`);
	console.log(`Link:         ${link}`);
	const confirmar = await preguntar('¿Guardar? (s/n)', 's');

	if (confirmar.toLowerCase() !== 's') {
		console.log('Descartado, no se guardó nada.');
		return;
	}

	await pool.query(
		`INSERT INTO productos (subcategoria_slug, nombre, precio, link, destacado, imagen, orden)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[slug, nombre, precio, link, destacado || null, imagen || null, siguienteOrden],
	);
	console.log('\n✅ Producto cargado.');
}

async function main() {
	const pool = getPool();
	try {
		let seguir = true;
		while (seguir) {
			await cargarUnProducto(pool);
			const otra = await preguntar('\n¿Cargar otro producto? (s/n)', 'n');
			seguir = otra.toLowerCase() === 's';
		}
	} finally {
		rl.close();
		await pool.end();
	}
}

main().catch((err) => {
	console.error('\nAlgo falló:', err.message);
	process.exit(1);
});
