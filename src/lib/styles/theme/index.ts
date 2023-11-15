import { createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';
import { type StyleFunctionProps, mode } from '@chakra-ui/theme-tools';

import { config } from './config';

const transparentBg = 'rgba(0, 0, 0, 0.25)';

const aboutHelpers = createMultiStyleConfigHelpers(['text', 'image']);
const About = aboutHelpers.defineMultiStyleConfig({
  baseStyle: {
    text: {
      margin: 10,
      flexDirection: 'column',
      whiteSpace: 'pre-wrap',
      textAlign: 'left',
      fontSize: '1.2em',
      fontWeight: 500,
    },
    image: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  },
});

const skillsHelpers = createMultiStyleConfigHelpers(['skill', 'icon', 'badge']);
const Skill = skillsHelpers.defineMultiStyleConfig({
  baseStyle: {
    skill: {
      maxWidth: '5vh',
      mt: 2,
      lineHeight: '2vh',
      fontWeight: 'bold',
      boxShadow: 'dark-lg',
      borderRadius: '10px',
      minW: '120px',
      bg: transparentBg,
    },
    icon: {
      height: '60px',
      margin: 1,
      alignSelf: 'center',
    },
    badge: {
      boxShadow: 'dark-lg',
      borderRadius: 10,
      cursor: 'zoom-in',
    },
  },
});

const xpHelpers = createMultiStyleConfigHelpers(['bar', 'fill', 'text']);
const XpBar = xpHelpers.defineMultiStyleConfig({
  baseStyle: {
    bar: {
      width: '12vh',
      height: '2.5vh',
      backgroundColor: '#33333342',
      border: '1px solid #000',
      position: 'relative',
    },
    fill: {
      height: '100%',
      backgroundColor: 'rgba(0, 255, 0, 0.681)',
      transition: 'width 0.3s ease-in-out',
      borderRadius: '10px',
    },
    text: {
      position: 'absolute',
      top: 0,
      left: '50%',
      lineHeight: '2vh',
      color: '#fff',
      fontWeight: 'bold',
    },
  },
});

const timelineHelpers = createMultiStyleConfigHelpers(['exp']);
const TimelineItem = timelineHelpers.defineMultiStyleConfig({
  baseStyle: {
    exp: {
      background: transparentBg,
      rounded: 'lg',
    },
  },
});

const projectsHelpers = createMultiStyleConfigHelpers(['card']);
const ProjectItem = projectsHelpers.defineMultiStyleConfig({
  baseStyle: {
    card: {
      background: transparentBg,
      boxShadow: 'dark-lg',
      rounded: 'lg',
      width: '100%',
      marginTop: 2,
    },
  },
});

const carouselHelpers = createMultiStyleConfigHelpers(['arrows']);
const Carousel = carouselHelpers.defineMultiStyleConfig({
  baseStyle: {
    arrows: {
      borderRadius: '10px',
    },
  },
});

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
    About,
    Skill,
    XpBar,
    TimelineItem,
    ProjectItem,
    Carousel,
  },
  colors: {
    primary: {
      dark: '#337dac',
      light: '#c6dae7',
    },
    secondary: {
      dark: '#832959',
      light: '#a10b3e',
    },
    accent: {
      dark: '#d2aa5c',
      light: '#eadc9d',
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
