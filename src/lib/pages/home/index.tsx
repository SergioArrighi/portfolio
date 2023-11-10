import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Typewriter from 'typewriter-effect';

import data from '~/lib/constants/data';

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

interface HomeData {
  name: string;
  roles: string[];
}

const Home = () => {
  const [homeData, setHomeData] = useState<HomeData | undefined>(undefined);

  useEffect(() => {
    fetch(data.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setHomeData(res))
      .catch((err) => err);
  }, []);

  return (
    <Box style={styles.mainContainer}>
      {homeData && (
        <Fade>
          <Text as="h1" style={styles.nameStyle}>
            {homeData.name}
          </Text>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: homeData.roles,
            }}
          />
          <Social />
        </Fade>
      )}
    </Box>
  );
};

export default Home;
