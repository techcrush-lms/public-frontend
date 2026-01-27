'use client';

import {
  Button,
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { FeaturedProductsShimmer } from './Shimmer';
import { SECTION_TITLES, BUSINESS_PAGE_COLORS } from '../constants';
import { useRef, useState } from 'react';
import { PackageX } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  count: number;
  onProductClick: (product: Product) => void;
  isLoading?: boolean;
  setCurrentProductPage: any;
  currentProductPage: number;
  org_products_current_page: number;
}

export const FeaturedProducts = ({
  products,
  count,
  onProductClick,
  isLoading = false,
  setCurrentProductPage,
  currentProductPage,
  org_products_current_page,
}: FeaturedProductsProps) => {
  const initialLimit =
    typeof window !== 'undefined' && window.innerWidth < 767 ? 10 : 9;
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  // 🔹 Ref for the Load More button position
  const loadMoreButtonRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => {
    // Capture current position of the Load More button
    const buttonPosition =
      loadMoreButtonRef.current?.getBoundingClientRect().top ?? 0;
    const currentScrollY = window.scrollY;

    // Update state to fetch more products
    setVisibleCount(products.length);
    setCurrentProductPage(currentProductPage + 1);

    // After update, scroll back to where the button originally was
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollY + buttonPosition - 100, // adjust offset for header height
        behavior: 'smooth',
      });
    }, 400);
  };

  return (
    <Container maxW='container.xl' py={{ base: 8, md: 16 }} px={{ md: 20 }}>
      <Heading
        as='h2'
        fontSize={{ base: '2xl', md: '3xl' }}
        color={BUSINESS_PAGE_COLORS.text.primary}
        mb={8}
        fontWeight='bold'
        textAlign={{ base: 'left', md: 'center' }}
      >
        {SECTION_TITLES.featuredProducts}
      </Heading>

      {isLoading ? (
        <FeaturedProductsShimmer />
      ) : products.length ? (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={5}>
            {products.map((product, idx) => (
              <ProductCard
                key={product.id || product.title + idx}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </SimpleGrid>

          {products.length < count && (
            <Box ref={loadMoreButtonRef} textAlign='center' mt={8}>
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
      ) : (
        <VStack gap={4} py={12}>
          <PackageX size={80} strokeWidth={1.5} color='gray' />
          <Text fontSize='xl' fontWeight='semibold' color='gray.500'>
            No products found
          </Text>
          <Button
            colorScheme='blue'
            size='md'
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </VStack>
      )}
    </Container>
  );
};
