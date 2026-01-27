import { Metadata } from 'next';
import { reformatUnderscoreText } from '@/lib/utils';
import BusinessProductView from '@/components/product/BusinessProductView';
import { Product } from '@/types/org';
import { capitalize } from 'lodash';
import ProductPreview from '@/app/(components)/page/components/ProductPreview';

type Props = {
  params: Promise<{
    product_id: string;
  }>;
};

// ✅ Page Component
export default function BusinessProductPage() {
  return (
    // <BusinessProductView />
    <ProductPreview />
  );
}
