import {route} from "@/utils/router.utils";

import LoginLayout from '@/views/login/LoginLayout';
import LoginView from '@/views/login/login/LoginView';
import RegisterView from '@/views/login/register/RegisterView';
import ForgotPasswordView from '@/views/login/forgot_password/ForgotPasswordView';
import LogoutView from '@/views/login/logout/LogoutView';
import ResetPasswordView from '@/views/login/reset_password/ResetPasswordView';

export default [
  route('/auth', LoginLayout, {
    children: [
      route('/login', LoginView),
      route('/register', RegisterView),
      route('/forgot-password', ForgotPasswordView),
      route('/logout', LogoutView, {alias: ['/signout']}, {requiresAuth: true}),
      route('/reset-password', ResetPasswordView, {
        props: (route) => ({query: route.query.token}),
        beforeEnter: beforeEnterResetPasswordRoute
      })
    ]
  })
];

function beforeEnterResetPasswordRoute(to, from, next) {
  if (to.query.hasOwnProperty('token')) {
    next();
    return;
  }

  next('/forgot-password');
}