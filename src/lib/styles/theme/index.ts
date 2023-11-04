import { extendTheme } from '@chakra-ui/react';
import { type StyleFunctionProps, mode } from '@chakra-ui/theme-tools';

import { config } from './config';

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      'html, body': {
        background: mode('#c6dae7', '#337dac')(props),
      },
    }),
  },
  fonts: {
    heading: 'Plus Jakarta Sans, sans-serif',
    body: 'Plus Jakarta Sans, sans-serif',
  },
  components: {
    // Button: {
    // }
  },
  colors: {
    primary: {
      dark: '#337dac',
      light: '#c6dae7',
    },
    secondary: {
      dark: '#a10b3e',
      light: '#a10b3e',
    },
    text: {
      dark: '#a10b3e',
      light: '#a10b3e',
    },
    menu: {
      dark: '#545484',
      light: '#cc64a0',
    },
    icon: '#6c3c74',
  },
  config,
});
