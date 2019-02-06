export default [{
  path: '/dashboard',
  component: () => import('@/views/dashboard/DashboardLayout'),
  meta: {requiresAuth: true},
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
          component: () => import('@/views/dashboard/settings/component/account_tab/AccountTab'),
          alias: ['']
        },
        {
          path: 'avatar',
          component: () => import('@/views/dashboard/settings/component/avatar_tab/AvatarTab')
        }
      ]
    },
    {
      path: 'schedules',
      component: () => import('@/views/dashboard/schedules/SchedulesView')
    },
    {
      path: 'schedules/new',
      component: () => import('@/views/dashboard/create_schedule/CreateScheduleView')
    }
  ]
}];