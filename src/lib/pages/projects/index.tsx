import { VStack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import {
  NotificationContext,
  type NotificationBundle,
} from '~/lib/contexts/NotificationContext';
import type { ProfileBundle } from '~/lib/contexts/ProfileContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

import Project from './components/Project';

const Projects = ({ title }: PageProps) => {
  const { sendToast } = useContext<NotificationBundle>(NotificationContext);
  const { projects } = useContext<ProfileBundle>(ProfileContext);

  useEffect(() => {
    sendToast({
      id: 'badge',
      title: 'Tap on the skill badges to check experience',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [sendToast]);

  return (
    <>
      <PageTitle title={title} />
      <Fade>
        {projects && (
          <VStack>
            {projects.map((project) => (
              <Project key={`proj-${project.title}`} project={project} />
            ))}
          </VStack>
        )}
      </Fade>
    </>
  );
};

export default Projects;
