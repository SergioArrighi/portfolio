import type { ToastId, UseToastOptions } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';

import type { NotificationBundle } from './NotificationContext';
import { NotificationContext } from './NotificationContext';

type NotificationProviderProps = {
  children: React.ReactNode;
};

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}: NotificationProviderProps) => {
  const [sentToasts] = useState<ToastId[]>([]);
  const toast = useToast();

  const sendToast = useCallback(
    (item: UseToastOptions) => {
      if (item.id && !sentToasts.includes(item.id)) {
        toast(item);
        sentToasts.push(item.id);
      }
    },
    [sentToasts, toast]
  );

  const notificationBundle: NotificationBundle = useMemo(() => {
    return {
      sendToast,
    };
  }, [sendToast]);

  return (
    <NotificationContext.Provider value={notificationBundle}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
