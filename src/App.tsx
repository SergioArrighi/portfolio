import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';

import ProfileProvider from './lib/contexts/ProfileProvider';

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <ProfileProvider>
        <Layout>
          <Routings />
        </Layout>
      </ProfileProvider>
    </Router>
  </ChakraProvider>
);

export default App;
