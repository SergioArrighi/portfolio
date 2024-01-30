import type { SystemStyleObject } from '@chakra-ui/react';
import {
  IconButton,
  Tooltip,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import ChatGPTIcon from './ChatGPTIcon';

export interface ChatGPTButtonProps {
  onOpen: () => void;
}

const ChatGPTButton = ({ onOpen }: ChatGPTButtonProps) => {
  const styles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('Assistant');
  return (
    <Tooltip label="Ask about me">
      <IconButton
        sx={styles.button}
        isRound
        size="lg"
        variant="solid"
        backgroundColor={useColorModeValue('accent.light', 'accent.dark')}
        aria-label="Done"
        icon={<ChatGPTIcon boxSize="80%" />}
        onClick={onOpen}
      />
    </Tooltip>
  );
};

export default ChatGPTButton;
