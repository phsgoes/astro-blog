// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://phsgoes.github.io/astro-blog',
	base: '/astro-blog',
	output: 'static',      // Ensure static output
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