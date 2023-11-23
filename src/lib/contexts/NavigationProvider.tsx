import type { Update } from 'history';
import { createBrowserHistory } from 'history';
import { useEffect, useMemo, useState } from 'react';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import type { NavigationBundle } from './NavigationContext';
import { NavigationContext } from './NavigationContext';

type NavigationProviderProps = {
  children: React.ReactNode;
};

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}: NavigationProviderProps) => {
  const [from, setFrom] = useState<Location | undefined>(undefined);
  const [to, setTo] = useState<Location | undefined>(undefined);
  const location = useLocation();
  const history = createBrowserHistory();

  useEffect(() => {
    setFrom(location);
    history.listen((update: Update) => {
      if (update.action === 'POP') setTo(update.location);
    });
  }, [history, history.action, location]);

  const navigationBundle: NavigationBundle = useMemo(() => {
    return {
      from,
      to,
    };
  }, [from, to]);

  return (
    <NavigationContext.Provider value={navigationBundle}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
