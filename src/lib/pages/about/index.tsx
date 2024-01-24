import { Avatar, Box, HStack, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import ReactMarkdown from 'react-markdown';

import PageTitle from '~/lib/components/PageTitle';
import {
  ProfileContext,
  type ProfileBundle,
} from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

const About = (props: PageProps) => {
  const { title } = props;
  const { about } = useContext<ProfileBundle>(ProfileContext);
  const [aboutMarkdown, setAboutMarkdown] = useState<string>('');

  useEffect(() => {
    if (aboutMarkdown === '') {
      fetch(`/profile/about.md`, {
        method: 'GET',
      })
        .then(async (res) => setAboutMarkdown(await res.text()))
        .catch((err) => err);
    }
  }, [aboutMarkdown]);

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
              <VStack className="markdown">
                <ReactMarkdown>{aboutMarkdown}</ReactMarkdown>
              </VStack>
            </VStack>
          </Box>
        </Fade>
      )}
    </>
  );
};

export default About;
