import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import About from '../pages/about';
import Career from '../pages/career';
import Projects from '../pages/projects';
import Skills from '../pages/skills';

const Home = React.lazy(() => import('~/lib/pages/home'));

export interface PageProps {
  title: string;
}

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
  {
    path: '/career',
    element: <Career title="Career" />,
  },
  {
    path: '/projects',
    element: <Projects title="Projects" />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
