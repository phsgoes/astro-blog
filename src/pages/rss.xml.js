import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DOMAIN, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: String(context?.site) || `${SITE_DOMAIN}/astro-blog`,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
