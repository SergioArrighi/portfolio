import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { memo } from 'react';

export interface ImageModalProps {
  imageSrc?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = memo(({ imageSrc, isOpen, onClose }: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('primary.light', 'primary.dark')}>
        <ModalCloseButton
          bg={useColorModeValue('primary.light', 'primary.dark')}
        />
        <Image src={imageSrc} borderRadius={10} />
      </ModalContent>
    </Modal>
  );
});

export default ImageModal;
