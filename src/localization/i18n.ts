import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, vi} from './translations';

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
