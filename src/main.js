import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'
import i18n from '@/i18n'
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant/dist/vue-instant.common';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueCookie);
Vue.use(VueInstant);

console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_API_URL);
console.log(process.env.VUE_APP_WS_URL);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
