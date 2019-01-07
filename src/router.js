import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/landing/LandingLayout'),
      children: [
        {
          path: '',
          name: 'landing',
          component: () => import('@/views/landing/HomeView'),
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/DashboardLayout'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/home/HomeView'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login/LoginVue')
    }
  ]
})
