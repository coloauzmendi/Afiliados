// Helpers compartidos por las páginas que muestran reviews y productos.

export const SECTOR_LABELS: Record<string, string> = {
	tecnologia: 'Tecnología',
	finanzas: 'Finanzas',
	'saas-ia': 'SaaS & IA',
	fisicos: 'Físicos',
};

export function sectorLabel(sector: string): string {
	return SECTOR_LABELS[sector] ?? sector;
}

export function formatPrecio(n: number): string {
	return `$${n.toLocaleString('es-AR')}`;
}

export function formatFecha(d: Date): string {
	return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "cargadores-y-accesorios" -> "Cargadores y accesorios" */
export function nombreCorto(slug: string): string {
	const texto = slug.replace(/-/g, ' ');
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}
