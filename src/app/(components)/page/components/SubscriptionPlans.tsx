'use client';

import { Button, Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
// import { SubscriptionPlan } from "../types";
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { SubscriptionPlansShimmer } from './Shimmer';
import { SECTION_TITLES, BUSINESS_PAGE_COLORS } from '../constants';
import { SubscriptionPlan } from '@/types/org';
import { SetStateAction, Dispatch, useState } from 'react';

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  count: number;
  onPlanClick: (plan: SubscriptionPlan) => void;
  onPlanSubscription: (planName: string) => void;
  isLoading?: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  org_plans_current_page: number;
}

export const SubscriptionPlans = ({
  plans,
  count,
  onPlanClick,
  onPlanSubscription,
  isLoading = false,
  setCurrentPage,
  currentPage,
  org_plans_current_page,
}: SubscriptionPlansProps) => {
  // 1️⃣ Set initial limit (based on screen size if you want)
  const initialLimit =
    typeof window !== 'undefined' && window.innerWidth < 767 ? 10 : 9;
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const handleLoadMore = () => {
    // 2️⃣ Increase by the same step as initial limit
    // setVisibleCount((prev) => prev + initialLimit);
    setVisibleCount(plans.length);
    setCurrentPage(currentPage + 1);
  };

  return (
    <Container maxW='container.xl' py={16}>
      <Heading
        as='h2'
        fontSize={{ base: 'xl', md: '3xl' }}
        color={BUSINESS_PAGE_COLORS.text.primary}
        mb={8}
        fontWeight='bold'
        textAlign='center'
      >
        {SECTION_TITLES.subscriptionPlans}
      </Heading>

      {isLoading ? (
        <SubscriptionPlansShimmer />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
            {plans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id || plan.name}
                plan={plan}
                onPlanClick={onPlanClick}
                onPlanSubscription={onPlanSubscription}
              />
            ))}
          </SimpleGrid>

          {/* 4️⃣ Show Load More only if there are more items */}
          {plans.length < count && (
            <Box textAlign='center' mt={8}>
              <Button
                onClick={handleLoadMore}
                colorScheme='blue'
                variant='solid'
                size='lg'
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
