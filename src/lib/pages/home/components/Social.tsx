import type { SystemStyleObject } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { memo, type CSSProperties } from 'react';
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
    network: 'linkedin',
    href: 'https://linkedin.com/in/sergio-arrighi-34a96b27',
  },
  {
    network: 'github',
    href: 'https://github.com/SergioArrighi',
  },
  {
    network: 'medium',
    href: 'https://medium.com/@sergio.arrighi',
  },
  {
    network: 'email',
    href: 'sergio.arrighi@gmail.com',
  },
];

const Social = memo(() => {
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
});

export default Social;
