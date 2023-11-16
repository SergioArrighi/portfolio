import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

export interface ImageModalProps {
  imageSrc?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ imageSrc, isOpen, onClose }: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Image src={imageSrc} borderRadius={10} />
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
