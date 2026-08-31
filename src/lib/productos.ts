// Helpers compartidos por las páginas que muestran reviews y productos.

export const SECTOR_LABELS: Record<string, string> = {
	cursos: 'Cursos y Formación',
	plantillas: 'Plantillas y Diseño',
	software: 'Software y Herramientas',
	ebooks: 'Ebooks y Guías',
};

export function sectorLabel(sector: string): string {
	return SECTOR_LABELS[sector] ?? sector;
}

/** 'ARS' -> "$45.000" (formato local), 'USD' -> "US$45". */
export function formatPrecio(n: number, moneda: string = 'ARS'): string {
	const prefijo = moneda === 'USD' ? 'US$' : '$';
	return `${prefijo}${n.toLocaleString('es-AR')}`;
}

export function formatFecha(d: Date): string {
	return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "marketing-digital" -> "Marketing digital" */
export function nombreCorto(slug: string): string {
	const texto = slug.replace(/-/g, ' ');
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}
