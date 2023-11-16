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
  Icon,
  Collapse,
} from '@chakra-ui/react';
import type { CarouselItem } from 'chakra-any-carousel';
import { Carousel, Direction } from 'chakra-any-carousel';
import type { MouseEvent } from 'react';
import { useContext, useRef, useState } from 'react';
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';

import ImageModal from '~/lib/components/ImageModal';
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

const CarouselCard = ({ image, onClick }: Partial<CarouselItem>) => (
  <Image onClick={onClick} src={image?.imageUrl} />
);

const Project = ({ project }: ProjectProps) => {
  const { getSkills } = useContext<ProfileBundle>(ProfileContext);
  const [clickedSkill, setClickedSkill] = useState<SkillItem>({
    icon: '',
    title: '',
    xp: 0,
  });
  const [clickedImageSrc, setClickedImageSrc] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [detailsMarkdown, setDetailsMarkdown] = useState<string>('');
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onClose: onSkillClose,
  } = useDisclosure();
  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
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
        onClick: () => {
          setClickedImageSrc(image);
          onImageOpen();
        },
      };
    });
    return items || [];
  };

  const handleToggle = () => {
    if (detailsMarkdown === '') {
      fetch(`profile/projects/${project.title.toLowerCase()}.md`, {
        method: 'GET',
      })
        .then(async (res) => setDetailsMarkdown(await res.text()))
        .catch((err) => err);
    }
    setIsCollapsed(!isCollapsed);
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
            <Text
              cursor="pointer"
              onClick={handleToggle}
              display="inline-flex"
              alignItems="center"
              alignSelf="flex-end"
            >
              Details...
              <Icon
                as={isCollapsed ? RiArrowDownDoubleLine : RiArrowUpDoubleLine}
                boxSize={6}
                ml={2}
              />
            </Text>
            <Collapse in={!isCollapsed} className="markdown">
              <ReactMarkdown>{detailsMarkdown}</ReactMarkdown>
            </Collapse>
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
      <ImageModal
        imageSrc={clickedImageSrc}
        isOpen={isImageOpen}
        onClose={onImageClose}
      />
    </>
  );
};

export default Project;
