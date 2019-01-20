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
          component: () => import('@/views/landing/home/HomeView')
        }
      ],
      alias: ['/home']
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/DashboardLayout'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/dashboard/home/HomeView'),
          alias: ['']
        },
        {
          path: 'settings',
          component: () => import('@/views/dashboard/settings/SettingsView'),
          children: [
            {
              path: 'account',
              component: () => import('@/views/dashboard/settings/component/AccountTab'),
              alias: ['']
            },
            {
              path: 'avatar',
              component: () => import('@/views/dashboard/settings/component/AvatarTab')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('@/views/login/LoginLayout'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/login/LoginView')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/login/register/RegisterView')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/login/forgot_password/ForgotPasswordView'),
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/views/login/logout/LogoutView'),
          alias: ['/signout']
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: () => import('@/views/login/reset_password/ResetPasswordView'),
          props: (route) => ({query: route.query.token}),
          beforeEnter(to, from, next) {
            if (to.query.hasOwnProperty('token')) {
              next();
              return;
            }

            next('/forgot-password');
          }
        }
      ]
    }
  ]
})
