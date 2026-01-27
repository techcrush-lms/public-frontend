'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Stack,
  Alert,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import CartItemDetails from './components/CartItemDetails';
import CartSummary from './components/CartSummary';
import { CartItem } from '@/types/cart';

export default function CartPage() {
  const { cart, loading, error, refreshCart, clearCart, totals } = useCart();
  const router = useRouter();

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  if (loading) {
    return (
      <Box bg='#F7F8F8' minH='100vh'>
        <Container maxW='container.xl' py={16}>
          <Center>
            <Spinner size='xl' color='#2326a3' />
          </Center>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg='#F7F8F8' minH='100vh'>
        <Container maxW='container.xl' py={16}>
          <Alert.Root status='error' borderRadius='md'>
            <Alert.Indicator />
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        </Container>
      </Box>
    );
  }

  const isCartEmpty = !cart?.items?.length;

  return (
    <Box bg='#F7F8F8' minH='100vh'>
      <Container maxW='container.xl' py={16}>
        <Heading
          as='h1'
          fontSize={{ base: '2xl', md: '3xl' }}
          color='#080930'
          fontWeight='bold'
          mb={8}
        >
          Your Cart
          {!isCartEmpty && (
            <Text
              as='span'
              fontSize='lg'
              color='#434453'
              fontWeight='normal'
              ml={2}
            >
              ({totals.totalQuantity}{' '}
              {totals.totalQuantity === 1 ? 'item' : 'items'})
            </Text>
          )}
        </Heading>

        {isCartEmpty ? (
          <VStack gap={8} py={16} textAlign='center'>
            <Text fontSize='xl' color='#434453'>
              Your cart is empty
            </Text>
            <Text color='#434453'>
              Browse our products and add items to your cart
            </Text>
            <Button
              colorScheme='blue'
              size='lg'
              borderRadius='md'
              onClick={() => router.push('/')}
            >
              Continue Shopping
            </Button>
          </VStack>
        ) : (
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            gap={8}
            align='start'
          >
            {/* Cart Items */}
            <VStack gap={4} flex={1} align='stretch'>
              <VStack gap={1} align='start' w='full'>
                <Button
                  variant='ghost'
                  size='sm'
                  colorScheme='red'
                  onClick={clearCart}
                  alignSelf='flex-end'
                >
                  Clear Cart
                </Button>
              </VStack>

              {cart?.items?.map((item: CartItem) => (
                <CartItemDetails key={item.id} item={item} />
              ))}
            </VStack>

            {/* Cart Summary */}
            <Box w={{ base: 'full', lg: '400px' }}>
              <CartSummary />
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
