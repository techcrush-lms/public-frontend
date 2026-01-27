'use client';

import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  IconButton,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { useState } from 'react';
import { CartItem as CartItemData } from '@/types/cart';
import { useCart, useCartItem } from '@/hooks/useCart';
import { formatMoney, ProductType } from '@/lib/utils';
import {
  removeItemLocal,
  updateItemQuantityLocal,
} from '@/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { clearCouponData } from '@/redux/slices/couponSlice';
import { RootState } from '@/redux/store';

interface CartItemProps {
  item: CartItemData;
  showQuantityControls?: boolean;
  compact?: boolean;
}

export default function CartItemDetails({
  item,
  showQuantityControls = true,
  compact = false,
}: CartItemProps) {
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);
  const { cart } = useSelector((state: RootState) => state.cart);

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);

    try {
      await dispatch(
        removeItemLocal({ id: item.id!, currency: item.currency! })
      );
      dispatch(clearCouponData());
    } finally {
      setIsRemoving(false);
    }
  };

  const isQuantifiableProduct =
    item.product_type === ProductType.TICKET ||
    item.product_type == ProductType.PHYSICAL_PRODUCT;

  const minRequiredQty =
    item.type === ProductType.PHYSICAL_PRODUCT
      ? item.physical_product?.min_required || 1
      : 1;

  const handleIncrement = async () => {
    const nextQty = item.quantity + 1;

    if (!isQuantifiableProduct || isUpdating) return;
    setIsUpdating(true);
    try {
      dispatch(
        updateItemQuantityLocal({
          id: item.id!,
          quantity: nextQty,
          currency: item.currency!,
        })
      );

      dispatch(clearCouponData());
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = async () => {
    if (isUpdating) return;
    const nextQty = Math.max(minRequiredQty, (item.quantity || 0) - 1);
    setIsUpdating(true);

    try {
      if (nextQty <= 0) {
        dispatch(removeItemLocal({ id: item.id!, currency: item.currency! }));
      } else {
        dispatch(
          updateItemQuantityLocal({
            id: item.id!,
            quantity: nextQty,
            currency: item.currency!,
          })
        );
      }
      dispatch(clearCouponData());
    } finally {
      setIsUpdating(false);
    }
  };

  const getProductName = () => {
    return item?.title;
  };

  const getProductImage = () => {
    return item?.multimedia?.url;
  };

  const getProductDescription = () => {
    return item?.description;
  };

  const itemTotal = parseFloat(item.price_at_time) * item.quantity;

  const isDecrementDisabled = item.quantity <= minRequiredQty;

  if (compact) {
    return (
      <Box pos='relative'>
        <IconButton
          aria-label='Remove item'
          size='xs'
          variant='ghost'
          pos='absolute'
          top='2'
          right='2'
          color='red'
          _hover={{ bg: 'transparent' }}
          onClick={handleRemove}
          disabled={isRemoving || isUpdating}
        >
          <X size={14} />
        </IconButton>

        <HStack
          p={3}
          bg='white'
          borderRadius='md'
          boxShadow='sm'
          gap={3}
          // align='center'
          w='full'
        >
          <Image
            src={getProductImage()}
            alt={getProductName()}
            boxSize='60px'
            borderRadius='md'
            objectFit='cover'
            h={'80px'}
            w={'80px'}
          />
          <VStack align='start' gap={1} flex={1} minW={0}>
            <Text
              fontSize='sm'
              fontWeight='medium'
              color='#2326a3'
              lineClamp={1}
            >
              {getProductName()}
            </Text>
            <HStack flexDirection={'column'} gap={2} align='start'>
              <Text fontSize='sm' color='#434453'>
                {formatMoney(parseFloat(item.price_at_time), currency)}
              </Text>
              {item.product_type === ProductType.PHYSICAL_PRODUCT && (
                <>
                  {item.size} | {item.color}
                </>
              )}

              {showQuantityControls && (
                <HStack
                  gap={2}
                  align='center'
                  bg='gray.100'
                  // borderColor='gray.200'
                  border='1px solid gray'
                >
                  <IconButton
                    aria-label='Decrease quantity'
                    size='xs'
                    variant='plain'
                    color='#000'
                    onClick={handleDecrement}
                    disabled={isUpdating || isDecrementDisabled}
                  >
                    <Minus size={12} />
                  </IconButton>
                  <Text
                    fontSize='sm'
                    fontWeight='medium'
                    minW='32px'
                    textAlign='center'
                  >
                    {item.quantity}
                  </Text>
                  <IconButton
                    aria-label='Increase quantity'
                    size='xs'
                    variant='plain'
                    color={isQuantifiableProduct ? '#000' : 'gray'}
                    onClick={handleIncrement}
                    disabled={!isQuantifiableProduct || isUpdating}
                  >
                    <Plus size={12} />
                  </IconButton>
                </HStack>
              )}
            </HStack>
          </VStack>
          <Text fontSize='sm' fontWeight='bold' color='#2326a3'>
            {/* {formatMoney(itemTotal)} */}
          </Text>
        </HStack>
      </Box>
    );
  }

  return (
    <Box
      bg='white'
      p={4}
      borderRadius='lg'
      boxShadow='sm'
      border='1px solid #E2E8F0'
      pos='relative'
    >
      <IconButton
        aria-label='Remove item'
        size='xs'
        variant='ghost'
        pos='absolute'
        top='2'
        right='2'
        color='gray.900'
        _hover={{ color: 'white' }}
        onClick={handleRemove}
        disabled={isRemoving || isUpdating}
      >
        <X size={14} />
      </IconButton>

      <HStack gap={4} align='start'>
        <Image
          src={getProductImage()}
          alt={getProductName()}
          boxSize='120px'
          borderRadius='md'
          objectFit='cover'
        />

        <VStack align='start' gap={2} flex={1} minW={0}>
          <Text fontSize='lg' fontWeight='bold' color='#2326a3' lineClamp={2}>
            {getProductName()}
          </Text>

          <Text fontSize='sm' color='#434453' lineClamp={2}>
            {getProductDescription()}
          </Text>

          <HStack gap={4} w='full'>
            <VStack align='start' gap={1}>
              <Text fontSize='sm' color='#434453'>
                Price
              </Text>
              <Text fontSize='lg' fontWeight='bold' color='#2326a3'>
                {formatMoney(parseFloat(item.price_at_time), currency)}
              </Text>
            </VStack>

            {showQuantityControls && (
              <VStack align='start' gap={1}>
                <Text fontSize='sm' color='#434453'>
                  Quantity
                </Text>
                <HStack gap={2} align='center'>
                  <IconButton
                    aria-label='Decrease quantity'
                    size='sm'
                    variant='outline'
                    onClick={handleDecrement}
                    disabled={isUpdating}
                  >
                    <Minus size={14} />
                  </IconButton>
                  <Text
                    fontSize='md'
                    fontWeight='medium'
                    minW='40px'
                    textAlign='center'
                  >
                    {item.quantity}
                  </Text>
                  <IconButton
                    aria-label='Increase quantity'
                    size='sm'
                    variant='outline'
                    onClick={handleIncrement}
                    disabled={!isQuantifiableProduct || isUpdating}
                  >
                    <Plus size={14} />
                  </IconButton>
                </HStack>
              </VStack>
            )}

            <VStack align='start' gap={1}>
              <Text fontSize='sm' color='#434453'>
                Total
              </Text>
              <Text fontSize='lg' fontWeight='bold' color='#2326a3'>
                {formatMoney(itemTotal, currency)}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <Flex direction='column' align='end' h='full'>
          <IconButton
            aria-label='Remove item'
            variant='ghost'
            colorScheme='red'
            size='sm'
            onClick={handleRemove}
            disabled={isRemoving || isUpdating}
            _hover={{ bg: 'red.50' }}
          >
            <Trash2 size={18} />
          </IconButton>
        </Flex>
      </HStack>
    </Box>
  );
}
