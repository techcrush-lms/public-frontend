'use client';

import { Box, IconButton, Badge, HStack, Text, Button } from '@chakra-ui/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface CartIconProps {
  showCount?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
}

export default function CartIcon({
  showCount = true,
  showText = false,
  size = 'md',
  variant = 'icon',
}: CartIconProps) {
  const { totals } = useCart();
  const router = useRouter();

  const handleClick = () => router.push('/cart');

  const iconSizeMap = { sm: 18, md: 24, lg: 28 } as const;
  const buttonSizeMap = { sm: 'sm', md: 'md', lg: 'lg' } as const;

  const totalQuantity = totals.totalQuantity ?? 0;
  const displayCount = totalQuantity > 99 ? '99+' : totalQuantity.toString();

  const CartBadge = () =>
    showCount && totalQuantity > 0 ? (
      <Badge
        position='absolute'
        top='-8px'
        right='-8px'
        borderRadius='full'
        bg='#2326a3'
        color='white'
        fontSize='xs'
        minW='20px'
        h='20px'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {displayCount}
      </Badge>
    ) : null;

  const CartIconBox = () => (
    <Box position='relative'>
      <ShoppingCart size={iconSizeMap[size]} color='#2326a3' />
      <CartBadge />
    </Box>
  );

  if (variant === 'button') {
    return (
      <Button
        onClick={handleClick}
        size={buttonSizeMap[size]}
        variant='outline'
        borderColor='#E2E8F0'
        bg='white'
        _hover={{ bg: 'gray.50' }}
        px={3}
        py={2}
        borderRadius='md'
        // leftIcon={<CartIconBox />}
      >
        {showText && (
          <Text fontSize='sm' color='#2326a3' fontWeight='medium'>
            Cart
          </Text>
        )}
      </Button>
    );
  }

  return (
    // <IconButton
    //   aria-label='Shopping cart'
    //   // icon={< />}
    //   variant='ghost'
    //   size={buttonSizeMap[size]}
    //   onClick={handleClick}
    //   color='#2326a3'
    //   _hover={{ bg: 'gray.100' }}
    // >
    //   <CartIconBox />
    // </IconButton>
    <IconButton
      aria-label='Shopping cart'
      variant='ghost'
      size={buttonSizeMap[size]}
      onClick={handleClick}
      color='#2326a3'
      _hover={{ bg: 'gray.100' }}
    >
      <CartIconBox />
    </IconButton>
  );
}
