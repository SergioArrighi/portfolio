import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Avatar,
  Box,
  HStack,
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
import type { PageProps } from '~/lib/router/routes';

const About = (props: PageProps) => {
  const { title } = props;
  const { about } = useContext<ProfileBundle>(ProfileContext);
  const styles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('About');

  return (
    <>
      <PageTitle title={title} />
      {about && (
        <Fade>
          <Box>
            <VStack>
              <HStack>
                <Avatar size="2xl" src={about.imageSrc} boxShadow={2} />
              </HStack>
              <HStack>
                <Text sx={styles.text}>{about.about}</Text>
              </HStack>
            </VStack>
          </Box>
        </Fade>
      )}
    </>
  );
};

export default About;
