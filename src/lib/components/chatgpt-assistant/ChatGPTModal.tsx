import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
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
  thread: string;
  text: string;
  sender?: Sender;
};

const ChatGPTModal = ({ isOpen, onClose }: ChatGPTModalProps) => {
  const [question, setQuestion] = useState<string>('Ask me anything...');
  const [thread, setThread] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const accentColor = useColorModeValue('accent.light', 'accent.dark');

  const handleQuestionChange = (item: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(item.target.value);

  const onScrollEvent = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setTop(target.scrollTop);
  };

  const callGPTBridge = async () => {
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        thread: '',
        text: question,
        sender: Sender.You,
      },
    ]);
    const encodedQuestion = encodeURIComponent(question);
    setQuestion('');
    const gptUrl = `${
      import.meta.env.VITE_GPT_BRIDGE_URL
    }/?question=${encodedQuestion}${
      thread ? `&thread=${encodeURIComponent(thread)}` : ''
    }`;
    const result = await fetch(gptUrl, {
      method: 'GET',
    });
    if (result.status === 200) {
      const answer: Message = await result.json();
      setThread(answer.thread);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...answer, sender: Sender.Assistant },
      ]);
    }
    setLoading(false);
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
              <Box
                width="full"
                height="50vh"
                overflowY={loading ? 'hidden' : 'scroll'}
                p={2}
                position="relative"
                onScroll={onScrollEvent}
              >
                {messages.map((message: Message) => (
                  <Grid
                    key={message.id}
                    mt="2"
                    width="100%"
                    templateColumns="min-content auto"
                    gap={4}
                    alignItems="center"
                  >
                    <Box>
                      <Avatar
                        size="sm"
                        src={
                          message.sender === Sender.Assistant
                            ? '/assets/chatgpt.svg'
                            : ''
                        }
                      />
                    </Box>
                    {message.sender && (
                      <Box>
                        <Text fontWeight="bold">
                          {Sender[message.sender.valueOf()]}
                        </Text>
                      </Box>
                    )}
                    <Box />
                    <Box>
                      <Text>{message.text}</Text>
                    </Box>
                  </Grid>
                ))}
                {loading && (
                  <Box
                    top={0 + top}
                    left={0}
                    w="full"
                    h="full"
                    bg="blackAlpha.500"
                    opacity={0.5}
                    bgBlendMode="multiply"
                    position="absolute"
                  >
                    <Center
                      position="relative"
                      zIndex={1}
                      textAlign="center"
                      display="flex"
                      justifyContent="center"
                      minH={80}
                    >
                      <Spinner size="xl" color={accentColor} />
                    </Center>
                  </Box>
                )}
              </Box>
            </HStack>
            <HStack width="full">
              <Textarea
                value={question}
                onChange={handleQuestionChange}
                resize="none"
              />
            </HStack>
            <HStack>
              <Button isActive={!loading} onClick={callGPTBridge}>
                Ask
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChatGPTModal;
