import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Card,
  CardBody,
  Image,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useMultiStyleConfig,
  SimpleGrid,
} from '@chakra-ui/react';
import type { MouseEvent } from 'react';
import { useContext, useRef, useState } from 'react';

import { SkillBadge, SkillPopover } from '~/lib/components/Skill';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type {
  ProfileBundle,
  SkillItem,
  ProjectItem,
} from '~/lib/contexts/ProfileContext';

export interface ProjectProps {
  project: ProjectItem;
}

const Project = ({ project }: ProjectProps) => {
  const { getSkills } = useContext<ProfileBundle>(ProfileContext);
  const [clickedSkill, setClickedSkill] = useState<SkillItem>({
    icon: '',
    title: '',
    xp: 0,
  });
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onClose: onSkillClose,
  } = useDisclosure();
  const projectStyles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('ProjectItem');

  const handleSkillClick = (
    event: MouseEvent<HTMLDivElement>,
    skill: SkillItem
  ) => {
    event.stopPropagation();
    setClickedSkill(skill);
    onSkillOpen();
  };

  return (
    <>
      <Card
        maxW="sm"
        overflow="hidden"
        boxShadow="md"
        sx={projectStyles.project}
      >
        <Image src={project.images![0]} />

        <CardBody p="6">
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="semibold">
              {project.title}
            </Text>
            <Text>{project.description}</Text>
            <HStack spacing={2} ref={elementRef}>
              <SimpleGrid display="inline">
                {getSkills((item: SkillItem) =>
                  project.skills!.includes(item.title)
                ).map((item: SkillItem) => (
                  <SkillBadge skill={item} handleClick={handleSkillClick} />
                ))}
              </SimpleGrid>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      <SkillPopover
        skill={clickedSkill}
        element={elementRef}
        isOpen={isSkillOpen}
        onClose={onSkillClose}
      />
    </>
  );
};

export default Project;
