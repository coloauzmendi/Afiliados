// Acceso a la base de datos MySQL (Aiven). Se usa solo en tiempo de build
// (dentro de getStaticPaths y del frontmatter de las páginas), nunca en el
// navegador — las credenciales nunca llegan al cliente.
import mysql from 'mysql2/promise';

export interface Subcategoria {
	slug: string;
	title: string;
	sector: string;
	tipo: string;
	resumen: string;
	contenido: string | null;
	fecha: Date;
}

export interface SubcategoriaConDesde extends Subcategoria {
	desde: number | null;
}

export interface Producto {
	id: number;
	subcategoriaSlug: string;
	nombre: string;
	precio: number;
	link: string;
	destacado: string | null;
	imagen: string | null;
}

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
	if (pool) return pool;

	const host = import.meta.env.DB_HOST;
	const port = Number(import.meta.env.DB_PORT ?? 3306);
	const user = import.meta.env.DB_USER;
	const password = import.meta.env.DB_PASSWORD;
	const database = import.meta.env.DB_NAME;

	if (!host || !user || !password || !database) {
		throw new Error(
			'Faltan variables de entorno de la base de datos. Creá un archivo .env en la raíz ' +
				'del proyecto con DB_HOST, DB_PORT, DB_USER, DB_PASSWORD y DB_NAME (ver .env.example).',
		);
	}

	pool = mysql.createPool({
		host,
		port,
		user,
		password,
		database,
		ssl: { rejectUnauthorized: false },
		connectionLimit: 5,
	});
	return pool;
}

export async function getSubcategorias(): Promise<Subcategoria[]> {
	const [rows] = await getPool().query(
		'SELECT slug, title, sector, tipo, resumen, contenido, fecha FROM subcategorias ORDER BY fecha DESC',
	);
	return rows as Subcategoria[];
}

export async function getTodosLosProductos(): Promise<Producto[]> {
	const [rows] = await getPool().query(
		`SELECT id, subcategoria_slug AS subcategoriaSlug, nombre, precio, link, destacado, imagen
		 FROM productos ORDER BY orden ASC, id ASC`,
	);
	return rows as Producto[];
}

export async function getProductosPorSlug(slug: string): Promise<Producto[]> {
	const [rows] = await getPool().query(
		`SELECT id, subcategoria_slug AS subcategoriaSlug, nombre, precio, link, destacado, imagen
		 FROM productos WHERE subcategoria_slug = ? ORDER BY orden ASC, id ASC`,
		[slug],
	);
	return rows as Producto[];
}

/** Todas las subcategorías con el precio "desde" ya calculado (para las cards). */
export async function getSubcategoriasConDesde(): Promise<SubcategoriaConDesde[]> {
	const [subcategorias, productos] = await Promise.all([getSubcategorias(), getTodosLosProductos()]);

	const minPorSlug = new Map<string, number>();
	for (const p of productos) {
		if (p.precio <= 0) continue; // ignora placeholders sin precio cargado
		const actual = minPorSlug.get(p.subcategoriaSlug);
		if (actual === undefined || p.precio < actual) minPorSlug.set(p.subcategoriaSlug, p.precio);
	}

	return subcategorias.map((s) => ({ ...s, desde: minPorSlug.get(s.slug) ?? null }));
}
