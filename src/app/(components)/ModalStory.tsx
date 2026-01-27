import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';

interface ModalStoryProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCancelButton?: boolean;
}

const ModalStory: React.FC<ModalStoryProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCancelButton = true,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='scale'>
    <ModalOverlay
      bg='rgba(20, 22, 50, 0.45)'
      backdropFilter='blur(12px)'
      zIndex={1500}
    />
    <ModalContent
      borderRadius='2xl'
      boxShadow='0 12px 48px 0 rgba(30,41,59,0.22)'
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 8 }}
      maxW='sm'
      mx='auto'
      border='1.5px solid #EDEEFC'
      bg='white'
      zIndex={1600}
    >
      <ModalHeader
        color='#2326a3'
        textAlign='center'
        fontWeight='extrabold'
        fontSize={{ base: 'xl', md: '2xl' }}
        letterSpacing='-0.5px'
        pb={2}
      >
        {title}
      </ModalHeader>
      <ModalCloseButton
        top={4}
        right={4}
        size='lg'
        color='#4045E1'
        _hover={{ bg: 'gray.100', color: '#2326a3' }}
        borderRadius='full'
      />
      <ModalBody>{children}</ModalBody>
      {showCancelButton && (
        <ModalFooter justifyContent='center'>
          <Button
            onClick={onClose}
            colorScheme='gray'
            variant='outline'
            borderRadius='md'
          >
            Cancel
          </Button>
        </ModalFooter>
      )}
    </ModalContent>
  </Modal>
);

export default ModalStory;
