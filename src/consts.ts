// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { SITE_URL, SITE_BASE } from "../astro.config.mjs";

export const SITE_PATH = String(`${SITE_URL}${SITE_BASE}`).slice(0, -1);
export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'My first Astro Blog!';
