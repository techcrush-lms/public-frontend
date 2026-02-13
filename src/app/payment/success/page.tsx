'use client';

import { Box, Flex, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg='gray.50'
      p={4}
    >
      <Box
        bg='white'
        p={8}
        rounded='xl'
        shadow='lg'
        maxW='md'
        w='full'
        textAlign='center'
      >
        <VStack gap={6}>
          <Box color='green.500'>
            <CheckCircle size={64} />
          </Box>

          <Heading size='lg' color='gray.800'>
            Payment successful!
          </Heading>

          <Text fontSize='lg' color='gray.600'>
            You have successfully claimed your scholarship.
          </Text>

          <Box bg='blue.50' p={4} rounded='md' w='full'>
            <Text fontSize='sm' color='blue.700' fontWeight='medium'>
              Note: Please check your email for your onboarding details.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}
