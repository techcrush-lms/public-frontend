'use client';

import { formatMoney } from '@/lib/utils';
import { SubscriptionPlan, SubscriptionPlanPrice } from '@/types/org';
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isHighlighted?: boolean;
  customImage?: string;
  onPlanClick: (plan: SubscriptionPlan) => void;
  onPlanSubscription: (planName: string) => void;
}

export const SubscriptionPlanCard = ({
  plan,
  isHighlighted = false,
  customImage,
  onPlanClick,
  onPlanSubscription,
}: SubscriptionPlanCardProps) => {
  // Calculate the display price and period
  const { displayPrice, displayPeriod, lowestPrice } = useMemo(() => {
    if (
      !plan.subscription_plan_prices ||
      plan.subscription_plan_prices.length === 0
    ) {
      return {
        displayPrice: 'Contact Us',
        displayPeriod: '',
        lowestPrice: null,
      };
    }

    // Find the lowest monthly equivalent price for display
    const monthlyPrice = plan.subscription_plan_prices.find(
      (price) => price.period === 'monthly'
    );
    const yearlyPrice = plan.subscription_plan_prices.find(
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
      lowestPrice = plan.subscription_plan_prices[0];
      displayPrice = formatMoney(+lowestPrice.price, lowestPrice.currency);
      displayPeriod = lowestPrice.period;
    }

    return { displayPrice, displayPeriod, lowestPrice };
  }, [plan.subscription_plan_prices]);

  const formatPrice = (price: string, currency: string): string => {
    const amount = parseFloat(price);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount / 100); // Assuming price is in cents
  };

  const handleCardClick = () => {
    onPlanClick(plan);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Special handling for plans with no pricing (like Enterprise/Contact Us)
    if (
      !plan.subscription_plan_prices ||
      plan.subscription_plan_prices.length === 0
    ) {
      onPlanSubscription(plan.name);
    } else {
      onPlanClick(plan);
    }
  };

  const getButtonText = (): string => {
    if (
      !plan.subscription_plan_prices ||
      plan.subscription_plan_prices.length === 0
    ) {
      return 'Contact Us';
    }
    return isHighlighted ? 'Get Started' : 'Choose Plan';
  };

  const cardBorderColor = isHighlighted ? '#4045E1' : 'gray.200';
  const cardShadow = isHighlighted
    ? '0 8px 32px 0 rgba(64, 69, 225, 0.10)'
    : '0 2px 16px 0 rgba(19, 69, 98, 0.06)';

  return (
    <Box
      bg='white'
      border={`2px solid`}
      borderColor={cardBorderColor}
      borderRadius='20px'
      boxShadow={cardShadow}
      p={6}
      transition='all 0.3s cubic-bezier(.4,0,.2,1)'
      _hover={{
        boxShadow: '0 12px 48px 0 rgba(64, 69, 225, 0.18)',
        transform: 'translateY(-4px)',
        cursor: 'pointer',
      }}
      position='relative'
      height='100%'
      onClick={handleCardClick}
    >
      {isHighlighted && (
        <Badge
          position='absolute'
          top={4}
          right={4}
          bg='#4045E1'
          color='white'
          px={3}
          py={1}
          borderRadius='md'
          fontSize='xs'
          fontWeight='bold'
          letterSpacing='wide'
        >
          Most Popular
        </Badge>
      )}

      <VStack spaceY={4} align='stretch' height='100%'>
        {/* Plan Image */}
        <Box w='full'>
          <Image
            src={customImage || plan.cover_image}
            alt={`${plan.name} plan`}
            w='full'
            height='180px'
            objectFit='cover'
            borderRadius='12px'
          />
        </Box>

        {/* Plan Details */}
        <VStack align='stretch' flex='1'>
          <Heading
            as='h3'
            size='lg'
            color={isHighlighted ? '#4045E1' : 'gray.800'}
            // fontWeight='bold'
            textAlign='center'
          >
            {plan.name}
          </Heading>

          {/* <Text
            fontSize='md'
            color='gray.600'
            textAlign='center'
            noOfLines={3}
            minHeight='60px'
          >
            {plan.description}
          </Text> */}

          {/* Pricing */}
          <VStack spaceY={1}>
            <HStack justify='center' align='baseline'>
              <Text
                color={isHighlighted ? '#4045E1' : 'gray.800'}
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
        </VStack>

        {/* Action Button */}
        <Button
          bg={isHighlighted ? '#4045E1' : 'black'}
          color='white'
          _hover={{
            bg: isHighlighted ? '#3039C7' : 'gray.800',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          borderRadius='12px'
          size='lg'
          w='full'
          fontWeight='semibold'
          onClick={handleButtonClick}
        >
          {getButtonText()}
        </Button>
      </VStack>
    </Box>
  );
};
