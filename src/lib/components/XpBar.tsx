/* eslint-disable no-param-reassign */
import type { SystemStyleObject } from '@chakra-ui/react';
import { Box, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';

export interface ExpBarProps {
  currentExp: number;
  maxExp: number;
  animate: boolean;
}

const XpBar = ({ currentExp, maxExp, animate }: ExpBarProps) => {
  const incrementXp: number = import.meta.env.VITE_XP_BAR_INCREMENT;
  const xpBarRef = useRef<HTMLDivElement>(null);
  const styles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('XpBar');

  useLayoutEffect(() => {
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
  }, [maxExp, incrementXp, styles.fill.width]);

  return (
    <Box display="inline-flex" ref={xpBarRef} sx={styles.bar}>
      {Array.from<number, number>(
        { length: currentExp / incrementXp },
        (_, number) => number
      ).map((value) => {
        return (
          <Box
            key={`xp-${value}`}
            className="xp-bar-fill"
            sx={{ ...styles.fill, width: animate ? '0' : `${incrementXp}%` }}
          />
        );
      })}
      <Text sx={{ ...styles.text, transform: 'auto', translateX: '-50%' }}>
        {currentExp}/{maxExp}
      </Text>
    </Box>
  );
};

export default XpBar;
