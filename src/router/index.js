import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || 'Coachy';
  })
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(value => value.meta.requiresAuth);
  let isLoggedIn = store.getters['user/isLoggedIn'];

  if (requiresAuth && !isLoggedIn) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    });
  } else {
    next();
  }
});

export default router;
