'use client';
import { Spinner, Center } from '@chakra-ui/react';

export interface LoaderOverlayProps {
  loading: boolean;
}

export default function LoaderOverlay({ loading }: LoaderOverlayProps) {
  if (!loading) return null;
  return (
    <Center
      position='fixed'
      top={0}
      left={0}
      w='100vw'
      h='100vh'
      bg='rgba(255,255,255,0.7)'
      zIndex={2000}
    >
      <Spinner size='xl' color='#4045E1' />
    </Center>
  );
}
