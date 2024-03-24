import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.metropoliplan.org',
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'es'],
        routing: {
            prefixDefaultLocale: true,
        },
    },
});
