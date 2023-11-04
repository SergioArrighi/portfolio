import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorMode === 'dark');

  return (
    <DarkModeToggle
      onChange={() => {
        setIsDarkMode(!isDarkMode);
        toggleColorMode();
      }}
      isDarkMode={isDarkMode}
      size={85}
    />
  );
};

export default ThemeToggle;
