import { Text } from '@chakra-ui/react';
import { useContext } from 'react';

import type {
  ProfileBundle,
  ProjectItem,
  SkillItem,
} from '~/lib/contexts/ProfileContext';
import { ProfileContext } from '~/lib/contexts/ProfileContext';

export interface SkillProjectProps {
  skill: SkillItem;
}

const SkillProjects = ({ skill }: SkillProjectProps) => {
  const { getProjects } = useContext<ProfileBundle>(ProfileContext);

  return (
    <>
      {getProjects(skill.title).map((project: ProjectItem) => (
        <Text>{project.title}</Text>
      ))}
    </>
  );
};

export default SkillProjects;
