'use client';

import { ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import {
  Box,
  Text,
  Image,
  Badge,
  Button,
  useBreakpointValue,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FaStar, FaCheck } from 'react-icons/fa';

// Custom modal components to avoid Chakra UI TypeScript issues
const Modal = ({ isOpen, onClose, children, size = 'md' }: any) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1400,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: size === '5xl' ? '90%' : '500px',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children, onClose }: any) => (
  <div
    style={{
      padding: '16px 20px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#2326a3' }}>
      {children}
    </h2>
    <button
      onClick={onClose}
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
      }}
    >
      &times;
    </button>
  </div>
);

const ModalBody = ({ children }: any) => (
  <div style={{ padding: '20px' }}>{children}</div>
);

const ModalFooter = ({ children }: any) => (
  <div
    style={{
      padding: '16px 20px',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
    }}
  >
    {children}
  </div>
);

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: 'product' | 'plan';
  selectedItem: {
    name: string;
    price: string;
    description: string;
    image: string;
    rating?: number;
    level?: string;
    color?: string;
    highlight?: boolean;
    duration?: string;
    features?: string[];
    limitations?: string[];
  } | null;
}

export const ProductModal = ({
  isOpen,
  onClose,
  modalType,
  selectedItem,
}: ProductModalProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!selectedItem) return null;

  const handleAction = () => {
    if (modalType === 'product') {
      console.log(`Enroll in ${selectedItem.name}`);
    } else if (selectedItem.name === 'Enterprise') {
      console.log('Contact sales');
      onClose();
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay bg='blackAlpha.600' backdropFilter='blur(8px)' />
        <ModalContent
          maxW={{ base: '95vw', md: '90vw' }}
          maxH={{ base: '95vh', md: '90vh' }}
          overflow='hidden'
        >
          <ModalHeader borderBottomWidth='1px' pb={4}>
            <HStack justify='space-between' align='center'>
              <Text as='h2' fontSize='lg' color='#2326a3'>
                {selectedItem.name}
              </Text>
              {modalType === 'product' && selectedItem.rating && (
                <HStack>
                  <FaStar color='#FFD700' />
                  <Text fontWeight='bold'>{selectedItem.rating}</Text>
                </HStack>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            p={0}
            display='flex'
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Box
              flex={{ base: '1', md: '1' }}
              p={6}
              borderRight={{ md: '1px solid' }}
              borderColor={{ md: 'gray.100' }}
              display='flex'
              justifyContent='center'
              alignItems='center'
              bg='gray.50'
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                maxH={{ base: '300px', md: '500px' }}
                maxW='100%'
                objectFit='contain'
                borderRadius='lg'
              />
            </Box>

            <Box
              flex={{ base: '1', md: '1' }}
              p={6}
              overflowY='auto'
              maxH={{ md: 'calc(90vh - 80px)' }}
            >
              <VStack align='stretch' gap={4}>
                <Box>
                  <HStack justify='space-between' align='flex-start' mb={6}>
                    <Text
                      fontSize='2xl'
                      fontWeight='bold'
                      color={selectedItem.color || '#2326a3'}
                    >
                      {selectedItem.price}
                      {modalType === 'plan' && '/month'}
                    </Text>
                    <VStack align='stretch' gap={3}></VStack>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter borderTopWidth='1px' pt={4}>
            <HStack width='100%' justify='flex-end' gap={4}>
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme='blue'
                bg='#2326a3'
                _hover={{ bg: '#1a1f7a' }}
                onClick={handleAction}
              ></Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
};
