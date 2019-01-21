import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie'
import {fallbackLocale, languages} from "./i18n";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueCookie);
Vue.use(VueI18n);

let i18n = new VueI18n({
  locale: VueCookie.get('lang') || navigator.language.substring(0, 2),
  fallbackLocale: fallbackLocale,
  messages: Object.assign(languages)
});

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
