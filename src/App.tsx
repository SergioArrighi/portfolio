import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';

import NavigationProvider from './lib/contexts/NavigationProvider';
import NotificationProvider from './lib/contexts/NotificationProvider';
import ProfileProvider from './lib/contexts/ProfileProvider';

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <NavigationProvider>
        <NotificationProvider>
          <ProfileProvider>
            <Layout>
              <Routings />
            </Layout>
          </ProfileProvider>
        </NotificationProvider>
      </NavigationProvider>
    </Router>
  </ChakraProvider>
);

export default App;
