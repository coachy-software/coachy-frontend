import {route} from "@/util/router.utils";

import LandingLayout from '@/view/landing/LandingLayout';
import HomeView from '@/view/landing/home/HomeView';
import ErrorView from '@/view/landing/error/ErrorView';

export default [
  route('/', LandingLayout, {
    children: [
      route('', HomeView)
    ],
    alias: ['/home']
  }),
  route('*', ErrorView)
];
