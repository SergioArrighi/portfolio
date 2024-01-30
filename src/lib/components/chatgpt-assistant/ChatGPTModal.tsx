import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export interface ChatGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum Sender {
  You,
  Assistant,
}

type Message = {
  id: string;
  text: string;
  sender?: Sender;
};

const ChatGPTModal = ({ isOpen, onClose }: ChatGPTModalProps) => {
  const [question, setQuestion] = useState<string>('Ask me anything...');
  const [messages, setMessages] = useState<Message[]>([]);
  const gptBridgeUrl = 'https://assistant.se-are.workers.dev';

  const handleQuestionChange = (item: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(item.target.value);

  const clearQuestion = () => setQuestion('');

  const callGPTBridge = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        text: question,
        sender: Sender.You,
      },
    ]);
    const result = await fetch(`${gptBridgeUrl}/?question=What%20are%20you`, {
      method: 'GET',
    });
    if (result.status === 200) {
      const answer: Message = await result.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...answer, sender: Sender.Assistant },
      ]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('primary.light', 'primary.dark')}>
        <ModalHeader>Assistant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <HStack width="full">
              <Box>
                <VStack>
                  {messages.map((message: Message) => (
                    <HStack key={message.id}>
                      <Text>{message.text}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </HStack>
            <HStack width="full">
              <Textarea
                value={question}
                defaultValue={question}
                onClick={clearQuestion}
                onChange={handleQuestionChange}
              />
            </HStack>
            <HStack>
              <Button onClick={callGPTBridge}>Ask</Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChatGPTModal;
