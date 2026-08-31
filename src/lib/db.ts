// Acceso a la base de datos MySQL (Aiven). Se usa solo en tiempo de build
// (dentro de getStaticPaths y del frontmatter de las páginas), nunca en el
// navegador — las credenciales nunca llegan al cliente.
import mysql from 'mysql2/promise';

export interface Subcategoria {
	slug: string;
	title: string;
	sector: string;
	resumen: string;
	contenido: string | null;
	fecha: Date;
}

export interface Precio {
	valor: number;
	moneda: string;
}

export interface SubcategoriaConDesde extends Subcategoria {
	desde: Precio | null;
	imagenPortada: string | null;
}

export interface Producto {
	id: number;
	subcategoriaSlug: string;
	nombre: string;
	precio: number;
	moneda: string;
	plataforma: string;
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
		'SELECT slug, title, sector, resumen, contenido, fecha FROM subcategorias ORDER BY fecha DESC',
	);
	return rows as Subcategoria[];
}

export async function getTodosLosProductos(): Promise<Producto[]> {
	const [rows] = await getPool().query(
		`SELECT id, subcategoria_slug AS subcategoriaSlug, nombre, precio, moneda, plataforma, link, destacado, imagen
		 FROM productos ORDER BY orden ASC, id ASC`,
	);
	return rows as Producto[];
}

export async function getProductosPorSlug(slug: string): Promise<Producto[]> {
	const [rows] = await getPool().query(
		`SELECT id, subcategoria_slug AS subcategoriaSlug, nombre, precio, moneda, plataforma, link, destacado, imagen
		 FROM productos WHERE subcategoria_slug = ? ORDER BY orden ASC, id ASC`,
		[slug],
	);
	return rows as Producto[];
}

/** Todas las subcategorías con el precio "desde" ya calculado (para las cards). */
export async function getSubcategoriasConDesde(): Promise<SubcategoriaConDesde[]> {
	const [subcategorias, productos] = await Promise.all([getSubcategorias(), getTodosLosProductos()]);

	const minPorSlug = new Map<string, Precio>();
	const imagenPorSlug = new Map<string, string>();
	for (const p of productos) {
		if (p.precio > 0) {
			const actual = minPorSlug.get(p.subcategoriaSlug);
			if (actual === undefined || p.precio < actual.valor) {
				minPorSlug.set(p.subcategoriaSlug, { valor: p.precio, moneda: p.moneda });
			}
		}
		// La imagen de portada es la del primer producto (por orden) que ya tenga una cargada.
		if (p.imagen && !imagenPorSlug.has(p.subcategoriaSlug)) {
			imagenPorSlug.set(p.subcategoriaSlug, p.imagen);
		}
	}

	return subcategorias.map((s) => ({
		...s,
		desde: minPorSlug.get(s.slug) ?? null,
		imagenPortada: imagenPorSlug.get(s.slug) ?? null,
	}));
}
