'use client';

import { Box, VStack, HStack, Skeleton, SimpleGrid } from '@chakra-ui/react';

// Individual shimmer components
export const ProductCardShimmer = () => {
  return (
    <Box w='full' borderRadius='16px' overflow='hidden'>
      {/* Image shimmer */}
      <Skeleton height='280px' borderRadius='16px' mb={3} />

      {/* Title shimmer */}
      <Skeleton height='24px' width='80%' mb={2} />

      {/* Price shimmer */}
      <HStack justify='space-between' align='center'>
        <Skeleton height='20px' width='60px' />
      </HStack>

      {/* Mobile button shimmer */}
      <Skeleton
        display={{ base: 'block', md: 'none' }}
        height='32px'
        width='full'
        mt={2}
        borderRadius='md'
      />
    </Box>
  );
};

export const SubscriptionPlanCardShimmer = () => {
  return (
    <Box
      bg='white'
      border='1.5px solid #EDEEFC'
      borderRadius='20px'
      boxShadow='0 2px 16px 0 rgba(19, 69, 98, 0.06)'
      p={4}
    >
      {/* Image shimmer */}
      <Skeleton height='200px' width='full' borderRadius='16px' mb={3} />

      {/* Plan name shimmer */}
      <Skeleton height='24px' width='70%' mb={2} />

      {/* Description shimmer */}
      <VStack align='start' gap={1} mb={2}>
        <Skeleton height='16px' width='full' />
        <Skeleton height='16px' width='80%' />
      </VStack>

      {/* Price shimmer */}
      <Skeleton height='32px' width='80px' mb={4} />

      {/* Button shimmer */}
      <Skeleton height='40px' width='full' borderRadius='lg' />
    </Box>
  );
};

// Grid shimmer components
export const FeaturedProductsShimmer = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={5}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <ProductCardShimmer key={idx} />
      ))}
    </SimpleGrid>
  );
};

export const SubscriptionPlansShimmer = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <SubscriptionPlanCardShimmer key={idx} />
      ))}
    </SimpleGrid>
  );
};

// Full page shimmer
export const BusinessPageShimmer = () => {
  return (
    <Box bg='#F7F8F8' minH='100vh' m='auto' maxW='container.xl'>
      {/* Hero Section Shimmer */}
      <Box
        minHeight={{ base: 'auto', md: '400px', lg: '500px' }}
        pt={{ base: 24, md: 32, lg: 40 }}
        pb={{ base: 8, md: 12, lg: 16 }}
        maxW='container.xl'
      >
        <VStack align='start' gap={6} maxW='container.xl' w='82%' mx='auto'>
          {/* Logo shimmer */}
          <Skeleton height='48px' width='150px' />

          {/* Title shimmer */}
          <Skeleton height='48px' width='400px' />

          {/* Subtitle shimmer */}
          <VStack align='start' gap={2}>
            <Skeleton height='20px' width='500px' />
            <Skeleton height='20px' width='400px' />
          </VStack>

          {/* Social icons shimmer */}
          <HStack gap={6}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                height='32px'
                width='32px'
                borderRadius='full'
              />
            ))}
          </HStack>
        </VStack>
      </Box>

      {/* Featured Products Section Shimmer */}
      <Box
        maxW='container.xl'
        w='85%'
        mx='auto'
        py={{ base: 8, md: 16 }}
        px={8}
      >
        {/* Section title shimmer */}
        <Skeleton height='40px' width='300px' mx='auto' mb={8} />

        <FeaturedProductsShimmer />
      </Box>
    </Box>
  );
};
