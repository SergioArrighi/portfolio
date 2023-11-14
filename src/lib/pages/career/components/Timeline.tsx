import { CheckCircleIcon } from '@chakra-ui/icons';
import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  chakra,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  useMultiStyleConfig,
  useTheme,
  ListIcon,
  ListItem,
  List,
  SimpleGrid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import type { MouseEvent } from 'react';
import { useContext, useRef, useState } from 'react';

import { SkillPopover } from '~/lib/components/Skill';
import { ProfileContext } from '~/lib/contexts/ProfileContext';
import type {
  ProfileBundle,
  ExpItem,
  SkillItem,
} from '~/lib/contexts/ProfileContext';

export interface TimelineProps {
  experiences: ExpItem[];
}

const LineWithDot = (exp: ExpItem) => {
  const { image } = exp;

  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: '40px', md: '40px' }}
      ml={{ base: '0', md: '40px' }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        // eslint-disable-next-line sonarjs/no-duplicate-string
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
        top="0px"
      />
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bgImage={image || 'none'}
          // bg={useColorModeValue('secondary.light', 'secondary.dark')}
          borderRadius="100px"
          opacity={1}
        />
      </Box>
    </Flex>
  );
};

interface TimelineItemProps {
  index: number;
  exp: ExpItem;
}

const isEven = (index: number) => index % 2 === 0;

const TimelineItem = (props: TimelineItemProps) => {
  const { index, exp }: { index: number; exp: ExpItem } = props;
  const {
    getSkills,
  }: { getSkills: (filter: (item: SkillItem) => boolean) => SkillItem[] } =
    useContext<ProfileBundle>(ProfileContext);
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
  const timelineStyles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('TimelineItem');
  const skillStyles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('Skill');
  const theme = useTheme();
  const borderColorValue = `transparent ${useColorModeValue(
    theme.colors.secondary.light,
    theme.colors.secondary.dark
  )} transparent`;
  const accentColor = useColorModeValue('accent.light', 'accent.dark');
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = isEven(index);
  let borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px';
  let leftValue = isEvenId ? '-15px' : 'unset';
  let rightValue = isEvenId ? 'unset' : '-15px';

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = '-15px';
    rightValue = 'unset';
    borderWidthValue = '15px 15px 15px 0';
  }

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
      <HStack
        flex={1}
        p={{ base: 3, sm: 6 }}
        spacing={5}
        alignItems="center"
        pos="relative"
        _before={{
          content: `""`,
          w: '0',
          h: '0',
          borderColor: borderColorValue,
          borderStyle: 'solid',
          borderWidth: borderWidthValue,
          position: 'absolute',
          left: leftValue,
          right: rightValue,
          display: 'block',
        }}
        sx={timelineStyles.exp}
        ref={elementRef}
      >
        <Box>
          {exp.image && (
            <Box>
              <Avatar src={exp.image} />
            </Box>
          )}
          <Text color={useColorModeValue('accent.light', 'accent.dark')}>
            {exp.title}
          </Text>
          <VStack spacing={2} mb={3}>
            <chakra.h1
              fontSize="xl"
              lineHeight={1.2}
              fontWeight="bold"
              w="100%"
            >
              {exp.subtitle}
            </chakra.h1>
            <List>
              {exp.workDescriptions &&
                exp.workDescriptions.map((item: string) => (
                  <ListItem display="inline-flex">
                    <ListIcon boxSize="3" as={CheckCircleIcon} />
                    <Text fontSize="xs">{item}</Text>
                  </ListItem>
                ))}
            </List>
            <Text>
              {`${exp.start} - `}
              {exp.end ? `${exp.end}` : 'Ongoing'}
            </Text>
            <SimpleGrid display="inline">
              {getSkills((item: SkillItem) =>
                exp.skills.includes(item.title)
              ).map((item: SkillItem) => (
                <GridItem
                  key={`timeline-skill-${item.title}`}
                  bg={accentColor}
                  display="inline-flex"
                  m={1}
                  p={1}
                  sx={skillStyles.badge}
                  onMouseDown={(event: MouseEvent<HTMLDivElement>) =>
                    handleSkillClick(event, item)
                  }
                >
                  <Avatar size="2xs" src={item.icon} bg="white" />
                  <Text fontSize="xs">{item.title}</Text>
                </GridItem>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </HStack>
      <SkillPopover
        skill={clickedSkill}
        element={elementRef}
        isOpen={isSkillOpen}
        onClose={onSkillClose}
      />
    </>
  );
};

const EmptyCard = () => {
  return (
    <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent" />
  );
};

const Timeline = ({ experiences }: TimelineProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box>
      {experiences.map((exp: ExpItem, index: number) => (
        <Flex key={`${exp.title}-${exp.subtitle}`} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && isEven(index) && (
            <>
              <EmptyCard />
              <LineWithDot {...exp} />
              <TimelineItem index={index} exp={exp} />
            </>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <LineWithDot {...exp} />
              <TimelineItem index={index} exp={exp} />
            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && !isEven(index) && (
            <>
              <TimelineItem index={index} exp={exp} />
              <LineWithDot {...exp} />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default Timeline;
