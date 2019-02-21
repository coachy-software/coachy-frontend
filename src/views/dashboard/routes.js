import {route} from "@/utils/router.utils";

import DashboardLayout from '@/views/dashboard/DashboardLayout';
import HomeView from '@/views/dashboard/home/HomeView';
import SettingsView from '@/views/dashboard/settings/SettingsView';
import AccountTab from '@/views/dashboard/settings/component/account_tab/AccountTab';
import AvatarTab from '@/views/dashboard/settings/component/avatar_tab/AvatarTab';
import SchedulesView from '@/views/dashboard/schedules/SchedulesView';
import CreateScheduleView from '@/views/dashboard/create_schedule/CreateScheduleView';
import ScheduleView from '@/views/dashboard/schedule/ScheduleView';

export default [
  route('/dashboard', DashboardLayout, {
    children: [
      route('home', HomeView, {alias: ['']}),
      route('settings', SettingsView, {
        children: [
          route('account', AccountTab, {alias: ['']}),
          route('avatar', AvatarTab),
        ]
      }),
      route('schedules', SchedulesView),
      route('schedules/new', CreateScheduleView),
      route('schedules/:id', ScheduleView, {props: (route) => ({viewAs: route.query.viewAs})})
    ]
  }, {requiresAuth: true})
]