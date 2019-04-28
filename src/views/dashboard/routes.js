import {route} from "@/utils/router.utils";

import DashboardLayout from '@/views/dashboard/DashboardLayout';
import HomeView from '@/views/dashboard/home/HomeView';
import SettingsView from '@/views/dashboard/settings/SettingsView';
import AccountTab from '@/views/dashboard/settings/component/account_tab/AccountTab';
import AvatarTab from '@/views/dashboard/settings/component/avatar_tab/AvatarTab';
import SchedulesView from '@/views/dashboard/schedules/SchedulesView';
import CreateScheduleView from '@/views/dashboard/create_schedule/CreateScheduleView';
import ScheduleView from '@/views/dashboard/schedule/ScheduleView';
import ScheduleSettingsView from '@/views/dashboard/schedule_settings/ScheduleSettingsView';
import ScheduleStatsView from '@/views/dashboard/schedule_stats/ScheduleStatsView';
import BoardView from '@/views/dashboard/board/BoardView';
import LoginTab from '@/views/dashboard/settings/component/login_tab/LoginTab';
import PasswordTab from '@/views/dashboard/settings/component/password_tab/PasswordTab';
import AccountDeleteTab from '@/views/dashboard/settings/component/delete_account_tab/DeleteAccountTab';
import ChatsView from '@/views/dashboard/chats/ChatsView';
import ChatView from '@/views/dashboard/chat/ChatView';

export default [
  route('/dashboard', DashboardLayout, {
    children: [
      route('home', HomeView, {alias: ['']}),
      route('settings', SettingsView, {
        children: [
          route('account', AccountTab, {alias: ['']}),
          route('avatar', AvatarTab),
          route('login', LoginTab),
          route('password', PasswordTab),
          route('delete_account', AccountDeleteTab)
        ]
      }),
      route('schedules', SchedulesView),
      route('schedules/new', CreateScheduleView),
      route('schedules/:id', ScheduleView, {props: (route) => ({viewAs: route.query.viewAs})}),
      route('schedules/:id/settings', ScheduleSettingsView),
      route('schedules/:id/stats', ScheduleStatsView),
      route('board', BoardView),
      route('chats', ChatsView, {
        children: [
          route(':id', ChatView)
        ]
      }),
    ]
  }, {requiresAuth: true})
]
