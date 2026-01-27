import {
  Container,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

export const ProductLoadingSkeleton = () => {
  const skeletonBg = useColorModeValue('gray.300', 'gray.700');

  return (
    <Container py={32} px={{ md: 20 }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        borderRadius='2xl'
      >
        {/* Left Image Skeleton */}
        <VStack flex='1' gap={4} align='flex-start'>
          <Skeleton
            height='400px'
            width='100%'
            borderRadius='xl'
            bg={skeletonBg}
          />
          <HStack gap={2}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                height='80px'
                width='80px'
                borderRadius='md'
                bg={skeletonBg}
              />
            ))}
          </HStack>
        </VStack>

        {/* Right Meta Skeleton */}
        <VStack flex='1' align='start' gap={6}>
          <Skeleton
            height='36px'
            width='70%'
            borderRadius='md'
            bg={skeletonBg}
          />
          <Skeleton
            height='20px'
            width='30%'
            borderRadius='md'
            bg={skeletonBg}
          />
          <SkeletonText noOfLines={4} gap='3' width='full' bg={skeletonBg} />

          <Flex gap={3}>
            <Skeleton
              height='28px'
              width='80px'
              borderRadius='full'
              bg={skeletonBg}
            />
            <Skeleton
              height='28px'
              width='80px'
              borderRadius='full'
              bg={skeletonBg}
            />
          </Flex>

          <Flex gap={2} align='center'>
            <Skeleton
              height='24px'
              width='100px'
              borderRadius='sm'
              bg={skeletonBg}
            />
            <Skeleton
              height='28px'
              width='120px'
              borderRadius='sm'
              bg={skeletonBg}
            />
          </Flex>

          <Skeleton
            height='48px'
            width='160px'
            borderRadius='md'
            bg={skeletonBg}
          />
        </VStack>
      </Stack>
    </Container>
  );
};
