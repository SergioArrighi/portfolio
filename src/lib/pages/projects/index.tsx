import { VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Fade } from 'react-awesome-reveal';

import PageTitle from '~/lib/components/PageTitle';
import type { ProfileBundle } from '~/lib/contexts/ProfileContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type { PageProps } from '~/lib/router/routes';

import Project from './components/Project';

const Projects = ({ title }: PageProps) => {
  const { projects } = useContext<ProfileBundle>(ProfileContext);

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
