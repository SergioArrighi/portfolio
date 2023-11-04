import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
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

import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
  },
  {
    label: 'About',
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
                p={2}
                href={navItem.href ?? '#'}
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

const MobileNavItem = ({ label, href }: NavItem) => (
  <Stack spacing={4}>
    <Flex
      py={2}
      as={Link}
      href={href ?? '#'}
      justify="space-between"
      align="center"
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Link key={label} py={2} href={href}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Link>
    </Flex>
  </Stack>
);

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('menu.light', 'menu.dark')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
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
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Header;
