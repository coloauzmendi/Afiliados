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

export function parsePrecio(precioAprox: string): number {
	return Number(precioAprox.replace(/[^0-9]/g, ''));
}

export function formatPrecio(n: number): string {
	return `$${n.toLocaleString('es-AR')}`;
}

export function formatFecha(d: Date): string {
	return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}
