import type { SystemStyleObject } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { CSSProperties } from 'react';
import { SocialIcon } from 'react-social-icons';

interface Styles {
  socialStyle: SystemStyleObject;
  iconStyle: CSSProperties;
}

const styles: Styles = {
  socialStyle: {
    position: 'relative',
    mt: '60px',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

interface SocialType {
  network: string;
  href: string;
}

const socials: SocialType[] = [
  {
    network: 'github',
    href: 'https://github.com/codeRockStar1992',
  },
  {
    network: 'email',
    href: 'mailto:19920109johnolson@gmail.com',
  },
];

const Social = () => {
  return (
    <Box sx={styles.socialStyle}>
      {socials
        ? socials.map((social) => (
            <SocialIcon
              key={social.network}
              style={styles.iconStyle}
              url={social.href}
              network={social.network}
              target="_blank"
              rel="noopener"
            />
          ))
        : null}
    </Box>
  );
};

export default Social;
