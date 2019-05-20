import pl from './pl'
import VueI18n from "vue-i18n";
import Vue from "vue";

// export const fallbackLocale = 'en';

export const languages = {
  // en: en,
  pl: pl
};

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'pl',
  fallbackLocale: 'pl',
  messages: Object.assign(languages)
});
