import {route} from "@/util/router.utils";

import DashboardLayout from '@/view/dashboard/DashboardLayout';
import HomeView from '@/view/dashboard/home/HomeView';
import SettingsView from '@/view/dashboard/settings/SettingsView';
import AccountTab from '@/view/dashboard/settings/component/account_tab/AccountTab';
import AvatarTab from '@/view/dashboard/settings/component/avatar_tab/AvatarTab';
import SchedulesView from '@/view/dashboard/schedules/SchedulesView';
import CreateScheduleView from '@/view/dashboard/create_schedule/CreateScheduleView';
import ScheduleView from '@/view/dashboard/schedule/ScheduleView';
import ScheduleSettingsView from '@/view/dashboard/schedule_settings/ScheduleSettingsView';
import ScheduleStatsView from '@/view/dashboard/schedule_stats/ScheduleStatsView';
import BoardView from '@/view/dashboard/board/BoardView';
import LoginTab from '@/view/dashboard/settings/component/login_tab/LoginTab';
import PasswordTab from '@/view/dashboard/settings/component/password_tab/PasswordTab';
import AccountDeleteTab from '@/view/dashboard/settings/component/delete_account_tab/DeleteAccountTab';
import ProfileTab from '@/view/dashboard/settings/component/profile_tab/ProfileTab';
import ChatsView from '@/view/dashboard/chats/ChatsView';
import ChatView from '@/view/dashboard/chat/ChatView';
import BmiCalculatorView from '@/view/dashboard/bmi_calculator/BmiCalculatorView';
import BmrCalculatorView from '@/view/dashboard/bmr_calculator/BmrCalculatorView';
import BurnedCalCalculatorView from '@/view/dashboard/burned_cal_calculator/BurnedCalCalculatorView';
import DailyDemandCalculatorView from '@/view/dashboard/daily_demand_calculator/DailyDemandCalculatorView';
import HeadwaysView from '@/view/dashboard/headways/HeadwaysView';
import HeadwayCreateView from '@/view/dashboard/headway_create/HeadwayCreateView';
import HeadwayView from '@/view/dashboard/headway/HeadwayView';
import NotificationsView from '@/view/dashboard/notifications/NotificationsView';
import ProfileView from '@/view/dashboard/profile/ProfileView';
import EditRecommendationModal from '@/view/dashboard/profile/modals/EditRecommendationModal';

const beforeEnterChat = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (to.params.id === user.identifier) {
    next('/dashboard/chats');
    return;
  }

  next();
};

const beforeEnterHeadways = (to, from, next) => {
  if (to.query.type !== 'BUILD' && to.query.type !== 'STRENGTH') {
    next(from.path);
    return;
  }

  next();
};

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
          route('delete_account', AccountDeleteTab),
            route('profile', ProfileTab)
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
          route(':id', ChatView, {beforeEnter: beforeEnterChat})
        ]
      }, {title: 'Wiadomości'}),
      route('bmi-calculator', BmiCalculatorView),
      route('bmr-calculator', BmrCalculatorView),
      route('burned-cal-calculator', BurnedCalCalculatorView),
      route('daily-demand-calculator', DailyDemandCalculatorView),
      route('headway-journals', HeadwaysView, {props: (route) => ({type: route.query.type}), beforeEnter: beforeEnterHeadways}),
      route('headway-journals/new', HeadwayCreateView),
      route('headway-journals/:id', HeadwayView),
      route('notifications', NotificationsView, {props: (route) => ({page: route.query.page})}),
      route('profiles/:id', ProfileView, {
        children: [
          route('edit-recommendation/:recommendationId', EditRecommendationModal)
        ]
      })
    ]
  }, {requiresAuth: true})
]
