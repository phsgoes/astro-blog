import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { SITE_BASE } from '../../astro.config.mjs';
import { createInstagramCaption } from "../lib/instagram-caption";

const parser = new MarkdownIt();

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: `${context.site}${SITE_BASE}`,
		items: posts.map((post) => {
      const imageUrl = `${String(context.site).replace(/\/$/, '')}${post.data.heroImage.src}`
      const instagramUrl = `${context.site}${SITE_BASE}/blog/${post.id}`;
			const categoriesArray = post.data?.categories || []
			const categoriesXml = categoriesArray
				.map((cat) => `<category>${cat}</category>`)
				.join('\n');

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `${SITE_BASE}/blog/${post.id}/`,
				customData: `
          ${categoriesXml}
					<language>pt-br</language>
					<media:content url="${imageUrl}" medium="image" type="image/jpeg" />
          <instagramCaption><![CDATA[
          ${createInstagramCaption(
              post.body,
              instagramUrl,
              post.data.title
          )}
          ]]></instagramCaption>
				`,
				content: sanitizeHtml(parser.render(post.body)),
				...post.data,
      };
    }),
    // Habilita o namespace de mídia no XML para o Make reconhecer a tag acima
    xmlns: {
      media: 'http://yahoo.com',
    },
	});
}
