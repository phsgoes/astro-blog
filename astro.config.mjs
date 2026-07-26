// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export const SITE_URL = import.meta.env.PROD ? 'https://phsgoes.github.io' : 'http://localhost:4321';
export const SITE_BASE = import.meta.env.PROD ? '/astro-blog' : '/';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	base: SITE_BASE,
	output: 'static',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Poppins',
			cssVariable: '--font-poppins',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/poppins-light.woff'],
						weight: 300,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/poppins-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/poppins-semibold.woff'],
						weight: 600,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/poppins-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});