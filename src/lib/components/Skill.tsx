import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Box,
  Image,
  GridItem,
  Text,
  useMultiStyleConfig,
  Popover,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { memo, type MouseEvent, type RefObject } from 'react';

import type { SkillItem } from '../contexts/ProfileContext';

import XpBar from './XpBar';

export interface SkillProps {
  skill: SkillItem;
  animate: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Skill = memo(({ skill, animate, onClick }: SkillProps) => {
  const styles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('Skill');

  return (
    <GridItem sx={styles.skill} background="transparent">
      <Box m={1} p={1} onClick={onClick}>
        <Text mb={1}>{skill.title}</Text>
        <XpBar currentExp={skill.xp} maxExp={100} animate={animate} />
        <Image src={skill.icon} sx={styles.icon} />
      </Box>
    </GridItem>
  );
});

export interface SkillBadgeProps {
  skill: SkillItem;
  handleClick: (event: MouseEvent<HTMLDivElement>, skill: SkillItem) => void;
}

export const SkillBadge = memo(({ skill, handleClick }: SkillBadgeProps) => {
  const skillStyles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('Skill');
  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  return (
    <GridItem
      key={`timeline-skill-${skill.title}`}
      bg={accentColor}
      display="inline-flex"
      m={1}
      p={1}
      sx={skillStyles.badge}
      onMouseDown={(event: MouseEvent<HTMLDivElement>) =>
        handleClick(event, skill)
      }
    >
      <Avatar size="2xs" src={skill.icon} bg="white" />
      <Text fontSize="xs">{skill.title}</Text>
    </GridItem>
  );
});

export interface SkillPopoverProps {
  skill: SkillItem;
  element: RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
}

export const SkillPopover = memo(
  ({ skill, element, isOpen, onClose }: SkillPopoverProps) => {
    const position: { top: number; left: number } = { top: 0, left: 0 };
    if (element.current) {
      const rect = element.current.getBoundingClientRect();
      position.top = rect.top + window.scrollY;
      position.left = rect.width;
    }
    return (
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverContent
          width="fit-content"
          border="none"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          bg={useColorModeValue('primary.light', 'primary.dark')}
          borderRadius={10}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left - 30,
          }}
        >
          <PopoverBody>
            {/* Popup content goes here */}
            <Skill skill={skill} animate={false} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
);
