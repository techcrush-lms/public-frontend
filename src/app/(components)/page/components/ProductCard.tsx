'use client';

import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Image,
  VStack,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { Product } from '../types';
import { BUSINESS_PAGE_COLORS } from '../constants';
import {
  formatMoney,
  getProductType,
  ProductType,
  reformatUnderscoreText,
} from '@/lib/utils';
import AddToCartButton from './AddToCartButton';
import { useMemo } from 'react';
import { SubscriptionPlanPrice } from '@/types/org';
import { BookOpen, Download, Calendar, Ticket } from 'lucide-react';
import { capitalize } from 'lodash';
import { getProductIcon } from './ProductIcon';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  showAddToCart?: boolean;
}

export const ProductCard = ({
  product,
  onProductClick,
  showAddToCart = true,
}: ProductCardProps) => {
  // Calculate the display price and period
  const { displayPrice, displayPeriod, lowestPrice } = useMemo(() => {
    const plan = product?.subscription_plan!;
    if (
      !plan?.subscription_plan_prices ||
      plan?.subscription_plan_prices?.length === 0
    ) {
      return {
        displayPrice: 'Contact Us',
        displayPeriod: '',
        lowestPrice: null,
      };
    }

    // Find the lowest monthly equivalent price for display
    const monthlyPrice = plan?.subscription_plan_prices.find(
      (price) => price.period === 'monthly'
    );
    const yearlyPrice = plan?.subscription_plan_prices.find(
      (price) => price.period === 'yearly'
    );

    let lowestPrice: SubscriptionPlanPrice;
    let displayPrice: string;
    let displayPeriod: string;

    if (monthlyPrice && yearlyPrice) {
      const monthlyAmount = parseFloat(monthlyPrice.price);
      const yearlyMonthlyEquivalent = parseFloat(yearlyPrice.price) / 12;

      if (yearlyMonthlyEquivalent < monthlyAmount) {
        lowestPrice = yearlyPrice;
        displayPrice = formatMoney(+yearlyPrice.price, yearlyPrice.currency);
        displayPeriod = 'year';
      } else {
        lowestPrice = monthlyPrice;
        displayPrice = formatMoney(+monthlyPrice.price, monthlyPrice.currency);
        displayPeriod = 'month';
      }
    } else if (monthlyPrice) {
      lowestPrice = monthlyPrice;
      displayPrice = formatMoney(+monthlyPrice.price, monthlyPrice.currency);
      displayPeriod = 'month';
    } else if (yearlyPrice) {
      lowestPrice = yearlyPrice;
      displayPrice = formatMoney(+yearlyPrice.price, yearlyPrice.currency);
      displayPeriod = 'year';
    } else {
      lowestPrice = plan?.subscription_plan_prices[0];
      displayPrice = formatMoney(+lowestPrice.price, lowestPrice.currency);
      displayPeriod = lowestPrice.period;
    }

    return { displayPrice, displayPeriod, lowestPrice };
  }, [product]);

  const handleClick = () => {
    onProductClick(product);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProductClick(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getPrice = () => {
    if (
      product.type === ProductType.TICKET &&
      product.ticket?.ticket_tiers?.length
    ) {
      const tiers = product.ticket.ticket_tiers;
      const minAmount = Math.min(
        ...tiers.map((t) => parseFloat(t.amount ?? '0') || 0)
      );
      const currency = tiers[0]?.currency ?? product.currency;
      return `${formatMoney(minAmount, currency)}+`;
    }
    return formatMoney(+product.price, product.currency);
  };

  return (
    <Box
      as='div'
      w='full'
      borderRadius='16px'
      transition='all 0.2s cubic-bezier(.4,0,.2,1)'
      _hover={{
        transform: 'translateY(-6px) scale(1.03)',
        cursor: 'pointer',
      }}
    >
      <Box w='full'>
        <Image
          src={product.multimedia?.url}
          alt={product.title}
          w='full'
          height='280px'
          objectFit='cover'
          borderRadius='16px'
          mb={3}
          onClick={handleClick}
        />
      </Box>

      <VStack align='start' w='full'>
        <Link href={`/${product.slug}`}>
          <Badge gap={1} alignItems={'center'} bg='gray.200' color='gray.800'>
            <Icon
              as={getProductIcon(getProductType(product.type))}
              boxSize={3}
            />
            {capitalize(reformatUnderscoreText(product.type))}
          </Badge>
          <Heading
            as='h5'
            fontSize='lg'
            color={BUSINESS_PAGE_COLORS.primary}
            fontWeight='bold'
            // noOfLines={2}
          >
            {product.title}
          </Heading>
          {product.type === ProductType.SUBSCRIPTION ? (
            <VStack spaceY={1}>
              <HStack justify='center' align='baseline'>
                <Text
                  // color={isHighlighted ? '#4045E1' : 'gray.800'}
                  fontSize='lg'
                  fontWeight='bold'
                >
                  {displayPrice}
                </Text>
                {displayPeriod && (
                  <Text fontSize='lg' color='gray.500'>
                    /{displayPeriod}
                  </Text>
                )}
              </HStack>
            </VStack>
          ) : (
            <Text color='#000' fontSize='md' fontWeight='bold'>
              {(() => {
                return getPrice();
              })()}
            </Text>
          )}
        </Link>

        {showAddToCart && (
          <AddToCartButton
            product={product}
            productId={product.id}
            productType={getProductType(product.type)}
            ticketTierId={product.ticket?.ticket_tiers[0].id}
            subscriptionTierId={
              product.subscription_plan?.subscription_plan_prices[0].id
            }
            size='sm'
            w='full'
            mt={1}
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </AddToCartButton>
        )}
      </VStack>
    </Box>
  );
};
