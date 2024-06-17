import i18next from 'i18next';
import de from './translations/de.json';
import es from './translations/es.json';
import en from './translations/en.json';

export const initI18n = (lng: string) => {
    i18next.init({
        lng: lng,
        resources: {
            de: {
                translation: de,
            },
            es: {
                translation: es,
            },
            en: {
                translation: en,
            },
        },
    });
    return i18next.t;
};
