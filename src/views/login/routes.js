export default [{
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
      meta: {
        requiresAuth: true
      },
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
}];