import {route} from "@/util/router.utils";

import LoginLayout from '@/view/login/LoginLayout';
import LoginView from '@/view/login/login/LoginView';
import RegisterView from '@/view/login/register/RegisterView';
import ForgotPasswordView from '@/view/login/forgot_password/ForgotPasswordView';
import LogoutView from '@/view/login/logout/LogoutView';
import ResetPasswordView from '@/view/login/reset_password/ResetPasswordView';

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
