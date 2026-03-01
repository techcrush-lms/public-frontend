'use client';

import { Box, Flex, Heading, Text, VStack, Icon, Spinner, Button, Link } from '@chakra-ui/react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchPaymentStatus } from '@/redux/slices/paymentSlice';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const paymentId = searchParams.get('payment_id');

  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending' | 'not_found'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!paymentId) {
      setStatus('not_found');
      return;
    }

    const verify = async () => {
      try {
        const res = await dispatch(fetchPaymentStatus(paymentId)).unwrap();
        if (res.data.payment_status === 'SUCCESS') {
          setStatus('success');
        } else if (res.data.payment_status === 'PENDING') {
          setStatus('pending');
        } else {
          setStatus('failed');
          setErrorMessage(`Payment status: ${res.data.payment_status}`);
        }
      } catch (err: any) {
        setStatus('failed');
        setErrorMessage(err || 'Failed to verify payment');
      }
    };

    verify();
  }, [paymentId, dispatch]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <VStack gap={6}>
            <Spinner size='xl' color='#FE4A55' />
            <Heading size='md' color='gray.800'>
              Verifying your payment...
            </Heading>
            <Text color='gray.600'>Please wait while we confirm your transaction.</Text>
          </VStack>
        );
      case 'success':
        return (
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
        );
      case 'pending':
        return (
          <VStack gap={6}>
            <Box color='orange.500'>
              <Clock size={64} />
            </Box>
            <Heading size='lg' color='gray.800'>
              Payment Pending
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Your payment is still being processed. You will receive an email once it's confirmed.
            </Text>
            <Button colorScheme='blue' onClick={() => window.location.reload()}>
              Refresh Status
            </Button>
          </VStack>
        );
      case 'failed':
      case 'not_found':
        return (
          <VStack gap={6}>
            <Box color='red.500'>
              <XCircle size={64} />
            </Box>

            <Heading size='lg' color='gray.800'>
              Verification Failed
            </Heading>

            <Text fontSize='lg' color='gray.600'>
              {errorMessage || "We couldn't verify your payment. If you've been debited, please contact support."}
            </Text>

            <Button
              bg='#FE4A55'
              color='white'
              _hover={{ opacity: 0.9 }}
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </VStack>
        );
    }
  };

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
        {renderContent()}
      </Box>
    </Flex>
  );
}
