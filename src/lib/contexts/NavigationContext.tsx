import { createContext } from 'react';
import type { Location } from 'react-router-dom';

export interface NavigationBundle {
  from: Location | undefined;
  to: Location | undefined;
}

export const defaultNavigationBundle = {
  from: undefined,
  to: undefined,
};

export const NavigationContext = createContext<NavigationBundle>(
  defaultNavigationBundle
);
