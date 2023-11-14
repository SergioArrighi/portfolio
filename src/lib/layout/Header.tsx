import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href?: string;
  nav?: UseDisclosureReturn;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Skills',
    href: '/skills',
  },
  {
    label: 'Career',
    href: '/career',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
];

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, nav }: NavItem) => (
  <Stack spacing={4}>
    <Flex
      py={2}
      as={RouterLink}
      to={href ?? '#'}
      justify="space-between"
      align="center"
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Link as={RouterLink} key={label} py={2} to={href}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          onClick={nav?.onToggle}
        >
          {label}
        </Text>
      </Link>
    </Flex>
  </Stack>
);

interface MobileNavProps {
  nav: UseDisclosureReturn;
}

const MobileNav = ({ nav }: MobileNavProps) => {
  return (
    <Stack
      bg={useColorModeValue('menu.light', 'menu.dark')}
      p={4}
      borderBottomRadius={10}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} nav={nav} />
      ))}
    </Stack>
  );
};

const Header = () => {
  const nav = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('primary.light', 'primary.dark')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('secondary.light', 'secondary.dark')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={nav.onToggle}
            icon={
              nav.isOpen ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Image
            h="10vh"
            src={
              colorMode === 'light'
                ? './assets/sergio-arrighi-logo-light.svg'
                : './assets/sergio-arrighi-logo-dark.svg'
            }
          />

          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={10}
            alignItems="center"
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <ThemeToggle />
        </Stack>
      </Flex>

      <Collapse in={nav.isOpen} animateOpacity>
        <MobileNav nav={nav} />
      </Collapse>
    </Box>
  );
};

export default Header;
