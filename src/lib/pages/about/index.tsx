import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import data from '~/lib/constants/data';

interface Styles {
  introTextContainer: React.CSSProperties;
  introImageContainer: React.CSSProperties;
}

const styles: Styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

interface AboutData {
  about: string;
  imageSource: string;
}

interface AboutProps {
  title: string;
}

const About = (props: AboutProps) => {
  const { title } = props;
  const [aboutData, setAboutData] = useState<AboutData | undefined>(undefined);

  useEffect(() => {
    fetch(data.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setAboutData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <PageTitle title={title} />
      {aboutData && (
        <Fade>
          <Box className="section-content-container">
            <HStack alignItems="flex-start">
              <VStack>
                <Text style={styles.introTextContainer}>{aboutData.about}</Text>
              </VStack>
              <VStack>
                <Text style={styles.introImageContainer}>
                  <Image src={aboutData.imageSource} alt="profile" />
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Fade>
      )}
    </>
  );
};

export default About;
