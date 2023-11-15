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
  chakra,
} from '@chakra-ui/react';
import type { CarouselItem } from 'chakra-any-carousel';
import { Carousel, Direction } from 'chakra-any-carousel';
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

const CarouselCard = ({ image }: Partial<CarouselItem>) => (
  <Image src={image?.imageUrl} />
);

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

  const getCarouselItems = (): CarouselItem[] => {
    const items = project.images?.map((image: string, index: number) => {
      return {
        title: `${project.title}-img-${index}`,
        description: '',
        image: {
          imageUrl: image,
        },
      };
    });
    return items || [];
  };

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
      <Card overflow="hidden" sx={projectStyles.card}>
        <Carousel
          id="homeCarousel-1"
          direction={Direction.RIGHT}
          interval={2000}
          repetitions={1}
          items={getCarouselItems()}
        >
          <CarouselCard />
        </Carousel>
        <CardBody p="6">
          <VStack align="start" spacing={2}>
            <chakra.h1 fontSize="xl" lineHeight={1.2} fontWeight="bold">
              {project.title}
            </chakra.h1>
            <Text fontSize="sm">
              {project.yearStart} - {project.yearEnd}
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
