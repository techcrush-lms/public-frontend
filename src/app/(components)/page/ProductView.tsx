import {
  formatMoney,
  formatTo12Hour,
  getFirstAvailablePlan,
  getProductType,
  ProductType,
  reformatUnderscoreText,
  sortSubPlansByPrice,
} from '@/lib/utils';
import { Product, SubscriptionPlanPrice, TicketTier } from '@/types/org';
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Image,
  Portal,
  Text,
  Box,
  VStack,
  NativeSelect,
  HStack,
  Input,
  IconButton,
  Badge,
  Icon as ChakraIcon,
} from '@chakra-ui/react';
import moment from 'moment';
import { useMemo, useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Icon,
  Minus,
  Plus,
} from 'lucide-react';
import { useCart, useIsInCart } from '@/hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { addItemLocal, openCart } from '@/redux/slices/cartSlice';
import { clearCouponData } from '@/redux/slices/couponSlice';
import { capitalize } from 'lodash';
import toast from 'react-hot-toast';
import { getProductIcon } from './components/ProductIcon';
import { RootState } from '@/redux/store';
import { RxThickArrowRight } from 'react-icons/rx';
import AddToCartButton from './components/AddToCartButton';
import Link from 'next/link';
import {
  ProductFiles,
  ProductMeta,
} from '@/components/product/BusinessProductView';

// Helper function to sort tiers by price (ascending to descending)
const sortTiersByPrice = (tiers: TicketTier[]): TicketTier[] => {
  return [...tiers].sort((a, b) => +a.amount - +b.amount);
};

/**
 * Helper function to get the first available tier for ticket products.
 * This ensures that the pricing section always has a default tier selected,
 * which fixes the issue where displayPrice and displayOriginalPrice would
 * be calculated incorrectly when no tier was selected.
 */
const getFirstAvailableTier = (product: Product): TicketTier | null => {
  if (
    product.type === ProductType.TICKET &&
    product.ticket?.ticket_tiers &&
    product.ticket.ticket_tiers.length > 0
  ) {
    const sortedTiers = sortTiersByPrice(product.ticket.ticket_tiers);
    return sortedTiers[0];
  }
  return null;
};

interface ProductPreviewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductPreview = ({
  product,
  isOpen,
  onClose,
}: ProductPreviewProps) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { business_info } = useSelector((state: RootState) => state.onboard);
  const { isInCart } = useIsInCart(product.id);

  // Initialize selectedTier with the first available tier by default
  // This fixes the pricing display issue where no tier was initially selected
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(() =>
    getFirstAvailableTier(product)
  );

  const [selectedPlanPrice, setSelectedPlanPrice] =
    useState<SubscriptionPlanPrice | null>(() =>
      getFirstAvailablePlan(product)
    );

  // Ensure we have a selected tier when the product changes
  // This handles cases where the product is updated after initial render
  useEffect(() => {
    if (!selectedTier && product.type === ProductType.TICKET) {
      const firstTier = getFirstAvailableTier(product);
      if (firstTier) {
        setSelectedTier(firstTier);
      }
    }
    if (!selectedPlanPrice && product.type === ProductType.SUBSCRIPTION) {
      const firstTier = getFirstAvailablePlan(product);
      if (firstTier) {
        setSelectedPlanPrice(firstTier);
      }
    }
  }, [product, selectedTier, selectedPlanPrice]);

  const handleTierChange = (tierId: string) => {
    if (product?.type === ProductType.TICKET && product?.ticket) {
      const sortedTiers = sortTiersByPrice(product?.ticket?.ticket_tiers);
      const tier = sortedTiers.find((t) => t.id === tierId);
      if (tier) {
        setSelectedTier(tier);
      }
    }
    if (
      product?.type === ProductType.SUBSCRIPTION &&
      product?.subscription_plan
    ) {
      const sortedTiers = sortSubPlansByPrice(
        product?.subscription_plan?.subscription_plan_prices
      );
      const tier = sortedTiers.find((t) => t.id === tierId);

      if (tier) {
        setSelectedPlanPrice(tier);
      }
    }
  };

  // Calculate dynamic prices based on quantity
  const displayPrice = useMemo(() => {
    const basePrice =
      product.type === ProductType.TICKET && selectedTier
        ? +selectedTier.amount
        : product.type === ProductType.SUBSCRIPTION && selectedPlanPrice
        ? +selectedPlanPrice?.price!
        : +product.price;
    return (basePrice * qty).toFixed(2);
  }, [product, selectedTier, selectedPlanPrice, qty]);

  const displayOriginalPrice = useMemo(() => {
    const basePrice =
      product.type === ProductType.TICKET && selectedTier
        ? selectedTier.original_amount
          ? +selectedTier.original_amount
          : null
        : product.original_price
        ? +product.original_price
        : null;
    return basePrice ? (basePrice * qty).toFixed(2) : null;
  }, [product, selectedTier, qty]);

  const handleIncreaseQty = () => {
    setQty((prev) => Math.min(prev + 1, 10)); // Max 10
  };

  const handleDecreaseQty = () => {
    setQty((prev) => Math.max(prev - 1, 1)); // Min 1
  };

  const thumbnails = [...(product.multimedia ? [product.multimedia] : [])];

  return (
    <Dialog.Root
      placement='center'
      open={isOpen}
      onEscapeKeyDown={onClose}
      onInteractOutside={onClose}
      size={'xl'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg='white'
            borderRadius='md'
            overflow='hidden'
            maxH='90vh'
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              maxH='90vh'
              overflowY='auto'
              p={3}
              mb={5}
            >
              <ProductFiles
                product={product}
                thumbnails={thumbnails}
                activeFile={activeImage}
                setActiveFile={setActiveImage}
              />

              <Box flex='1' px={6} py={10}>
                <ProductMeta
                  product={product}
                  selectedTier={selectedTier}
                  setSelectedTier={setSelectedTier}
                  selectedPlanPrice={selectedPlanPrice}
                  setSelectedPlanPrice={setSelectedPlanPrice}
                  handleTierChange={handleTierChange}
                  displayPrice={displayPrice}
                  displayOriginalPrice={displayOriginalPrice}
                />
              </Box>
            </Flex>

            {/* Close Button */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size={{ base: 'xs', lg: 'sm' }}
                color='black'
                position='absolute'
                top='8px'
                right='8px'
                _hover={{ color: { base: 'black', lg: 'black' } }}
                onClick={onClose}
                backgroundColor={{ base: 'white', lg: 'transparent' }}
                border={{ base: '1px solid lightgray', lg: 'none' }}
                padding={{ base: 1, lg: 0 }}
                rounded={{ base: 'full', lg: 'none' }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
