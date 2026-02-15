import { defineConfig } from 'astro/config';
import asciidocIntegration from './src/integrations/asciidoc';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.metropoliplan.org',
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'es', 'en'],
    },
    integrations: [asciidocIntegration()],
});
