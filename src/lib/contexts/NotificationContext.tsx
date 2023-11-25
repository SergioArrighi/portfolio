import type { UseToastOptions } from '@chakra-ui/react';
import { createContext } from 'react';

export interface NotificationBundle {
  sendToast: (toast: UseToastOptions) => void;
}
export const defaultNotificationBundle = {
  sendToast: () => {},
};

export const NotificationContext = createContext<NotificationBundle>(
  defaultNotificationBundle
);
