'use client';

import { Button, ButtonProps, Link } from '@chakra-ui/react';
import { useState, type MouseEventHandler } from 'react';
import { useCart, useIsInCart } from '@/hooks/useCart';
import { ProductType } from '@/lib/utils';
import { addItemLocal, openCart } from '@/redux/slices/cartSlice';
import { Product } from '@/types/org';
import { useDispatch, useSelector } from 'react-redux';
import { clearCouponData } from '@/redux/slices/couponSlice';
import toast from 'react-hot-toast';
import { RootState } from '@/redux/store';
import { MeasurementMetadata } from '@/types/cart';

interface AddToCartButtonProps
  extends Omit<ButtonProps, 'onClick' | 'loading'> {
  product: Product;
  productId: string;
  productType: ProductType;
  ticketTierId?: string | undefined;
  subscriptionTierId?: string | undefined;
  quantity?: number;
  onSuccess?: () => void;
  onAddError?: (error: string) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selectedSize?: string | null;
  selectedColor?: string | null;
  measurementData?: MeasurementMetadata[];
}

export default function AddToCartButton({
  product,
  productId,
  productType,
  ticketTierId,
  subscriptionTierId,
  quantity = 1,
  onSuccess,
  onAddError,
  onClick,
  children = 'Add to Cart',
  selectedSize = null,
  selectedColor = null,
  measurementData = [],
  ...buttonProps
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, loading: cartLoading } = useCart();
  const { isInCart } = useIsInCart(productId);
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const ticketPrices =
        product.ticket?.ticket_tiers?.map(
          (t) => parseFloat(t.amount ?? '0') || 0
        ) || [];
      const subscriptionPrices =
        product.subscription_plan?.subscription_plan_prices?.map(
          (t) => parseFloat(t.price ?? '0') || 0
        ) || [];

      const amount =
        (product.ticket?.ticket_tiers?.length ?? 0) > 0
          ? product.ticket?.ticket_tiers?.find(
              (ticket_price) => ticket_price.id === ticketTierId
            )?.amount
          : (product.subscription_plan?.subscription_plan_prices?.length ?? 0) >
            0
          ? product.subscription_plan?.subscription_plan_prices.find(
              (plan_price) => plan_price.id === subscriptionTierId
            )?.price
          : 0;

      const price = [
        ProductType.COURSE,
        ProductType.DIGITAL_PRODUCT,
        ProductType.PHYSICAL_PRODUCT,
      ].includes(product.type)
        ? product.price
        : amount;

      dispatch(
        addItemLocal({
          ...product,
          currency,
          product_id: productId,
          price_at_time: String(price),
          quantity,
          created_at: new Date().toLocaleDateString(),
          updated_at: new Date().toLocaleDateString(),
          product_type: productType,
          ...(ticketTierId && { ticket_tier_id: ticketTierId }),
          ...(subscriptionTierId && {
            subscription_tier_id: subscriptionTierId,
          }),
          ...(selectedSize && { size: selectedSize }),
          ...(selectedColor && { color: selectedColor }),
          ...(measurementData && { metadata: measurementData }),
        })
      );

      toast.success(
        <span className='leading-tight'>
          <strong>{product.title}</strong> has been added to cart.{' '}
          <Link
            onClick={() => {
              dispatch(openCart(true));
              toast.dismiss();
            }}
            className='ml-1'
            color='blue.600'
            fontWeight='medium'
            textDecoration='underline'
            _hover={{ textDecoration: 'underline', color: 'blue.800' }}
          >
            View Cart
          </Link>
        </span>
      );

      dispatch(clearCouponData());
      onSuccess?.();
    } catch (error) {
      onAddError?.(String(error));
    } finally {
      setIsAdding(false);
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    onClick?.(e);
    await handleAddToCart();
  };

  const isLoading = isAdding || cartLoading;

  // ✅ Disable if size/color required but not chosen (for non-bespoke products)
  // For bespoke products, size/color are optional, but customer name is required
  const isBespoke = product.physical_product?.type === 'bespoke';
  const hasSizes = (product.physical_product?.sizes?.length ?? 0) > 0;
  const hasColors = (product.physical_product?.colors?.length ?? 0) > 0;

  // For non-bespoke products, require size/color if they are available
  const requiresSelection =
    product.type === ProductType.PHYSICAL_PRODUCT &&
    // !isBespoke &&
    ((hasSizes && !selectedSize) || (hasColors && !selectedColor));

  // For bespoke products, only require customer name in measurement data
  // const requiresBespokeData =
  //   isBespoke && (!measurementData || !measurementData[0].customer_name);
  const requiresBespokeData =
    isBespoke &&
    (!measurementData?.length ||
      measurementData.some(
        (m) => !m?.customer_name || m.customer_name.trim() === ''
      ));

  const isDisabled =
    isLoading || isInCart || requiresSelection || requiresBespokeData;

  return (
    <Button
      onClick={handleClick}
      loading={isLoading}
      loadingText='Adding...'
      disabled={isDisabled}
      colorScheme={isInCart ? 'green' : 'blue'}
      opacity={isDisabled ? 0.7 : 1}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      {...buttonProps}
    >
      {isInCart
        ? 'Added to Cart'
        : requiresSelection
        ? 'Select Size & Color'
        : requiresBespokeData
        ? 'Add to Cart'
        : children}
    </Button>
  );
}
