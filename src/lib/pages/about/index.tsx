import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import {
  ProfileContext,
  type ProfileBundle,
} from '~/lib/contexts/ProfileContext';

interface AboutProps {
  title: string;
}

const About = (props: AboutProps) => {
  const { title } = props;
  const { about } = useContext<ProfileBundle>(ProfileContext);
  const styles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('About');

  return (
    <>
      <PageTitle title={title} />
      {about && (
        <Fade>
          <Box className="section-content-container">
            <HStack alignItems="flex-start">
              <VStack>
                <Text sx={styles.text}>{about.about}</Text>
              </VStack>
              <VStack>
                <Text sx={styles.image}>
                  <Image src={about.imageSrc} alt="profile" />
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
