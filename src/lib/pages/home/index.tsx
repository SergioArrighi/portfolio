import { Box, Text } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import Typewriter from 'typewriter-effect';

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
  return (
    <Box style={styles.mainContainer}>
      <Fade>
        <Text as="h1" style={styles.nameStyle}>
          Sergio Arrighi
        </Text>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: ['Some', 'Random', 'Bullshit'],
          }}
        />
        <Social />
      </Fade>
    </Box>
  );
};

export default Home;
