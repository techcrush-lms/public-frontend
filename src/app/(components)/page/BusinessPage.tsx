'use client';

import { Box, Stack } from '@chakra-ui/react';
import useBusinessProducts from '@/hooks/page/useBusinessProducts';
import { usePreviewState } from './hooks/usePreviewState';
import { BUSINESS_PAGE_COLORS } from './constants';
import { HeroSection, FeaturedProducts } from './components';
import { ProductPreview } from './ProductView';
import { LoadingState } from '@/components/ui/LoadingState';
import { PackageX, Text } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NoProduct = () => {
  const router = useRouter();

  return (
    <Box
      bg={BUSINESS_PAGE_COLORS.background}
      minH='100vh'
      maxW='container.xl'
      // px={{ base: 0, md: 6 }}
    >
      {/* Hero Section */}
      <HeroSection />

      <Stack gap={4} align='center'>
        <PackageX size={80} strokeWidth={1.5} color='gray' />

        <Text fontSize='xl' fontWeight='bold' color='gray.700'>
          No product found
        </Text>
        <Text color='gray.500'>
          The product you’re looking for does not exist or is unavailable.
        </Text>
      </Stack>
    </Box>
  );
};

export default function BusinessPage() {
  const {
    org_products,
    org_products_count,
    org_products_current_page,
    currentProductPage,
    setCurrentProductPage,
    loading,
    error,
  } = useBusinessProducts();

  const {
    selectedProduct,
    isProductPreviewOpen,
    handleProductClick,
    handleCloseProductPreview,
  } = usePreviewState();

  if (error) return <NoProduct />;
  // Show full page shimmer while products are loading
  if (loading && !org_products) {
    return <LoadingState />;
  }

  return (
    <Box
      bg={BUSINESS_PAGE_COLORS.background}
      minH='100vh'
      maxW='container.xl'
      // px={{ base: 0, md: 6 }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <FeaturedProducts
        products={org_products}
        count={org_products_count}
        onProductClick={handleProductClick}
        isLoading={loading}
        setCurrentProductPage={setCurrentProductPage}
        currentProductPage={currentProductPage}
        org_products_current_page={org_products_current_page}
      />

      {/* Product Preview Modal */}
      {selectedProduct && (
        <ProductPreview
          product={selectedProduct}
          isOpen={isProductPreviewOpen}
          onClose={handleCloseProductPreview}
        />
      )}
    </Box>
  );
}
