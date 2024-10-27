import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      maxWidth={800}
      transition="0.5s ease-out"
      className="App"
    >
      <Meta />
      <Flex wrap="wrap" margin="8" minHeight="90vh">
        <Box width="full" as="main" marginY={22}>
          <Header />
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
