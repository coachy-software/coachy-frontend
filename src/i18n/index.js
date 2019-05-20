import en from './en'
import pl from './pl'
import VueI18n from "vue-i18n";
import VueCookie from "vue-cookie";
import Vue from "vue";

export const fallbackLocale = 'en';

export const languages = {
  en: en,
  pl: pl
};

Vue.use(VueI18n);

export default new VueI18n({
  // locale: VueCookie.get('lang') || navigator.language.substring(0, 2),
  locale: pl,
  fallbackLocale: fallbackLocale,
  messages: Object.assign(languages)
});
