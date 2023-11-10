import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import About from '../pages/about';
import Skills from '../pages/skills';

const Home = React.lazy(() => import('~/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About title="About" />,
  },
  {
    path: '/skills',
    element: <Skills title="Skills" />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
