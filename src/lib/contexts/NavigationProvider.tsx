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

const history = createBrowserHistory();

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}: NavigationProviderProps) => {
  const [from, setFrom] = useState<Location | undefined>(undefined);
  const [to, setTo] = useState<Location | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    history.listen((update: Update) => {
      if (update.action === 'POP') setTo(update.location);
    });
    return () => setTo(undefined);
  }, []);

  useEffect(() => {
    setFrom(location);

    return () => setFrom(undefined);
  }, [location]);

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
