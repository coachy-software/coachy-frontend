export default [
  {
    path: '/',
    component: () => import('@/views/landing/LandingLayout'),
    children: [
      {
        path: '',
        name: 'landing',
        meta: {requiresAuth: true},
        component: () => import('@/views/landing/home/HomeView')
      }
    ],
    alias: ['/home']
  },
  {
    path: '*',
    component: () => import('@/views/landing/error/ErrorView')
  }];