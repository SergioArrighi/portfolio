import { Box, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Fade } from 'react-awesome-reveal';
import Typewriter from 'typewriter-effect';

import type { ProfileBundle } from '~/lib/contexts/ProfileContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';

import Social from './components/Social';

interface Styles {
  nameStyle: React.CSSProperties;
  inlineChild: React.CSSProperties;
  mainContainer: React.CSSProperties;
}

const styles: Styles = {
  nameStyle: {
    fontSize: '5vh',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Home = () => {
  const { home } = useContext<ProfileBundle>(ProfileContext);

  return (
    <Box style={styles.mainContainer}>
      {home && (
        <Fade>
          <Text as="h1" style={styles.nameStyle}>
            {home.name}
          </Text>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: home.roles,
            }}
          />
          <Social />
        </Fade>
      )}
    </Box>
  );
};

export default Home;
