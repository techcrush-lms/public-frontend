'use client';

import { Box, VStack, HStack, Text, Separator, Button } from '@chakra-ui/react';
import { useCart } from '@/hooks/useCart';
import { formatMoney } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  checkoutButtonText?: string;
  onCheckout?: () => void;
}

export default function CartSummary({
  showCheckoutButton = true,
  checkoutButtonText = 'Proceed to Checkout',
  onCheckout,
}: CartSummaryProps) {
  const { totals, cart, loading } = useCart();
  const router = useRouter();

  const bgColor = 'white';
  const borderColor = '#E2E8F0';

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      router.push('/checkout');
    }
  };

  // Calculate additional fees (you can modify these as needed)
  const shippingFee = 0; // Free shipping
  const taxRate = 0.05; // 5% tax
  const taxAmount = totals.subtotal * taxRate;
  const finalTotal = totals.subtotal + shippingFee + taxAmount;

  const isCartEmpty = !cart?.items?.length;

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius='lg'
      boxShadow='sm'
      border='1px solid'
      borderColor={borderColor}
      position='sticky'
      top='20px'
    >
      <VStack gap={4} align='stretch'>
        <Text fontSize='xl' fontWeight='bold' color='#2326a3'>
          Order Summary
        </Text>

        <VStack gap={3} align='stretch'>
          <HStack justify='space-between'>
            <Text color='#434453'>Items ({totals.totalQuantity})</Text>
            <Text fontWeight='medium'>{formatMoney(totals.subtotal)}</Text>
          </HStack>

          <HStack justify='space-between'>
            <Text color='#434453'>Shipping</Text>
            <Text fontWeight='medium' color='green.500'>
              {shippingFee === 0 ? 'Free' : formatMoney(shippingFee)}
            </Text>
          </HStack>

          <HStack justify='space-between'>
            <Text color='#434453'>Tax (5%)</Text>
            <Text fontWeight='medium'>{formatMoney(taxAmount)}</Text>
          </HStack>

          <Separator />

          <HStack justify='space-between'>
            <Text fontSize='lg' fontWeight='bold' color='#2326a3'>
              Total
            </Text>
            <Text fontSize='lg' fontWeight='bold' color='#2326a3'>
              {formatMoney(finalTotal)}
            </Text>
          </HStack>
        </VStack>

        {showCheckoutButton && (
          <VStack gap={2} mt={4}>
            <Button
              colorScheme='blue'
              size='lg'
              w='full'
              borderRadius='md'
              onClick={handleCheckout}
              disabled={isCartEmpty || loading}
              loading={loading}
            >
              {checkoutButtonText}
            </Button>

            {isCartEmpty && (
              <Text fontSize='sm' color='red.500' textAlign='center'>
                Your cart is empty
              </Text>
            )}
          </VStack>
        )}

        <VStack gap={1} mt={2}>
          <Text fontSize='xs' color='#434453' textAlign='center'>
            Secure checkout with SSL encryption
          </Text>
          <Text fontSize='xs' color='#434453' textAlign='center'>
            Free returns within 30 days
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
