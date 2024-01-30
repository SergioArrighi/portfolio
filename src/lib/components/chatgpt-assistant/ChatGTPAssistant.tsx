import { useDisclosure } from '@chakra-ui/react';

import ChatGPTButton from './ChatGPTButton';
import ChatGPTModal from './ChatGPTModal';

const ChatGPTAssistant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ChatGPTButton onOpen={onOpen} />
      <ChatGPTModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ChatGPTAssistant;
