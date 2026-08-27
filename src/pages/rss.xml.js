import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const reviews = await getCollection('reviews');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: reviews
			.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf())
			.map((review) => ({
				title: review.data.title,
				description: review.data.resumen,
				pubDate: review.data.fecha,
				link: `/${review.data.sector}/${review.id}/`,
			})),
	});
}
