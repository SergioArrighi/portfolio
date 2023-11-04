import { Box } from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';

interface Styles {
  iconStyle: React.CSSProperties;
}

const styles: Styles = {
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
    <Box style={styles.iconStyle} className="social">
      {socials
        ? socials.map((social) => (
            <SocialIcon
              key={social.network}
              style={styles.iconStyle}
              url={social.href}
              network={social.network}
              // bgColor={theme.socialIconBgColor}
              target="_blank"
              rel="noopener"
            />
          ))
        : null}
    </Box>
  );
};

export default Social;
