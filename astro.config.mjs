import { defineConfig } from 'astro/config';
import asciidoc from 'astro-asciidoc';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.metropoliplan.org',
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'es', 'en'],
    },
    integrations: [asciidoc()],
});
