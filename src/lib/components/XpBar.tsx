/* eslint-disable no-param-reassign */
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export interface ExpBarProps {
  currentExp: number;
  maxExp: number;
}

const XpBar = ({ currentExp, maxExp }: ExpBarProps) => {
  const incrementXp: number = import.meta.env.VITE_XP_BAR_INCREMENT;
  const xpBarRef = useRef<HTMLDivElement>(null);

  const xpBarBlockStyle = {
    width: `${incrementXp}`,
    border: 2,
  };

  useEffect(() => {
    if (xpBarRef.current) {
      const fillBlocks = xpBarRef.current.querySelectorAll(
        '.xp-bar-fill'
      ) as NodeListOf<HTMLElement>;
      fillBlocks.forEach((item, index) => {
        setTimeout(
          () => {
            item.style.width = `${incrementXp}%`;
            item.style.borderRadius = `${import.meta.env.VITE_XP_BAR_RADIUS}px`;
          },
          index * import.meta.env.VITE_XP_BAR_DELAY
        );
      });
    }
  }, [maxExp, incrementXp, xpBarBlockStyle.width]);

  return (
    <Box className="xp-bar" display="inline-flex" ref={xpBarRef}>
      {Array.from<number, number>(
        { length: currentExp / incrementXp },
        (_, number) => number
      ).map((value) => {
        return (
          <Box
            key={`exp-${value}`}
            className="xp-bar-fill"
            style={{ ...xpBarBlockStyle, width: '0' }}
          />
        );
      })}
      <Text className="xp-text">
        {currentExp}/{maxExp}
      </Text>
    </Box>
  );
};

export default XpBar;
