import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSubcategorias } from '../lib/catalogo';

export async function GET(context) {
	const subcategorias = await getSubcategorias();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: subcategorias.map((s) => ({
			title: s.title,
			description: s.resumen,
			pubDate: s.fecha,
			link: `/${s.sector}/${s.slug}/`,
		})),
	});
}
