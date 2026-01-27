'use client';
import { buttonWidth } from '@/lib/utils';
import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import React, { JSX, useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';

const DemoVideoModal = ({
  color = '#4045E1',
  bg = 'transparent',
  bgHover = '#4045E1',
  border = '#4045E1',
  borderHover = '#4045E1',
  text = (
    <>
      <FiPlayCircle size={20} /> Watch Demo
    </>
  ),
}: {
  color?: string;
  bg?: string;
  bgHover?: string;
  border?: string;
  borderHover?: string;
  text?: JSX.Element;
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <Button
        color={color}
        bg={bg}
        width={buttonWidth}
        height={{ base: '48px', md: '52px' }}
        borderRadius='12px'
        borderColor={border}
        _hover={{ bg: bgHover, color: '#ffffff', borderColor: borderHover }}
        onClick={() => setIsVideoModalOpen(true)}
      >
        {text}
      </Button>
      {/* Video Demo Modal */}
      <Dialog.Root
        open={isVideoModalOpen}
        onOpenChange={(e) => setIsVideoModalOpen(e.open)}
        size='xl'
        placement='center'
        motionPreset='slide-in-bottom'
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title fontSize='xl' fontWeight='bold' color='white'>
                  Watch Demo
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size='sm' />
                </Dialog.CloseTrigger>
                {/* <Dialog.Description color='gray.600'>
                  Watch how DoExcess can transform your business operations
                </Dialog.Description> */}
              </Dialog.Header>
              <Dialog.Body p={0}>
                <Box
                  position='relative'
                  paddingBottom='56.25%' // 16:9 aspect ratio
                  height={0}
                  overflow='hidden'
                  borderRadius='lg'
                >
                  <iframe
                    src='https://www.youtube.com/embed/zWbii_RHMqE?autoplay=1&rel=0&modestbranding=1'
                    title='Product Demo Video'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay'
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default DemoVideoModal;
