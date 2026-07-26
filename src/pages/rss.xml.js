import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
      const imageUrl = `${String(context.site).replace(/\/$/, '')}${post.data.heroImage.src}`;
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
        // Injetamos a imagem em uma tag personalizada que o Make consegue ler perfeitamente
        customData: `
          <language>pt-br</language>
          <media:content url="${imageUrl}" medium="image" type="image/jpeg" />
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
