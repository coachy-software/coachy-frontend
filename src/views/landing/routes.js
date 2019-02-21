import {route} from "@/utils/router.utils";

import LandingLayout from '@/views/landing/LandingLayout';
import HomeView from '@/views/landing/home/HomeView';
import ErrorView from '@/views/landing/error/ErrorView';

export default [
  route('/', LandingLayout, {
    children: [
      route('', HomeView)
    ],
    alias: ['/home']
  }),
  route('*', ErrorView)
];