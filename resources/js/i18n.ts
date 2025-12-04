import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idDiklat from '~/assets/locale/id/diklat.json';
import idFindDoctor from '~/assets/locale/id/findDoctor.json';
import idFooter from '~/assets/locale/id/footer.json';
import idGeneric from '~/assets/locale/id/generic.json';
import idHealthSevice from '~/assets/locale/id/healthService.json';
import idHomepage from '~/assets/locale/id/homepage.json';
import idInfoMedia from '~/assets/locale/id/infoMedia.json';
import idNav from '~/assets/locale/id/nav.json';
import idOthers from '~/assets/locale/id/others.json';
import idAbout from '~/assets/locale/id/rsuiProfile.json';
import idSearch from '~/assets/locale/id/search.json';

const resources = {
  id: {
    generic: idGeneric,
    nav: idNav,
    homepage: idHomepage,
    footer: idFooter,
    rsuiProfile: idAbout,
    search: idSearch,
    infoMedia: idInfoMedia,
    diklat: idDiklat,
    healthService: idHealthSevice,
    others: idOthers,
    findDoctor: idFindDoctor,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'id',
    lng: 'id',
    debug: true,
    ns: [
      'generic',
      'nav',
      'homepage',
      'footer',
      'rsuiProfile',
      'search',
      'infoMedia',
      'diklat',
      'healthService',
      'others',
      'findDoctor',
    ],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
