import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import {
  addToCart as addToCartAction,
  fetchCart,
  removeCartItem,
  emptyCart,
} from '@/redux/slices/cartSlice';
import { filterByCurrency, ProductType } from '@/lib/utils';
import toast from 'react-hot-toast';
import { MeasurementMetadata } from '@/types/cart';
import useBusinessShipping from './page/useBusinessShipping';
import { ShippingLocation } from '@/types/org';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shipping } = useBusinessShipping();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const { currency } = useSelector((state: RootState) => state.currency);
  const { coupon_info } = useSelector((state: RootState) => state.coupon);

  const [selectedShipping, setSelectedShipping] =
    useState<ShippingLocation | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  /** Filter items based on selected currency */
  const filteredItems = useMemo(
    () => filterByCurrency(cart?.items, currency),
    [cart?.items, currency]
  );

  /** Cart totals (subtotal, quantities, shipping, discount, grand total) */
  const totals = useMemo(() => {
    const subtotal = filteredItems.reduce(
      (total, item) => total + parseFloat(item.price_at_time) * item.quantity,
      0
    );

    const shippingAmount = selectedShipping?.price
      ? +selectedShipping?.price
      : 0;

    const grandTotal = subtotal + shippingAmount - coupon_info.discount;

    return {
      subtotal,
      itemCount: filteredItems.length,
      totalQuantity: filteredItems.reduce((t, item) => t + item.quantity, 0),
      shippingAmount,
      discount: coupon_info.discount,
      grandTotal,
    };
  }, [filteredItems, selectedShipping, discount, coupon_info.discount]);

  /** Add item to cart */
  const addToCart = useCallback(
    async ({
      product_id,
      quantity = 1,
      product_type,
      ticket_tier_id,
      metadata,
    }: {
      product_id: string;
      quantity?: number;
      product_type: ProductType;
      ticket_tier_id?: string;
      metadata?: MeasurementMetadata[];
    }) => {
      try {
        const result = await dispatch(
          addToCartAction({
            product_id,
            quantity,
            product_type,
            ticket_tier_id,
            currency,
            ...(metadata && { metadata: metadata as MeasurementMetadata }),
          })
        ).unwrap();

        toast.success('Item added to cart successfully!');
        dispatch(fetchCart({ currency }));
        return result;
      } catch (err) {
        toast.error((err as string) || 'Failed to add item to cart');
        throw err;
      }
    },
    [dispatch, currency]
  );

  /** Remove an item */
  const removeFromCart = useCallback(
    async (itemId: string) => {
      try {
        await dispatch(removeCartItem(itemId)).unwrap();
        toast.success('Item removed from cart');
        dispatch(fetchCart({ currency }));
      } catch (err) {
        toast.error((err as string) || 'Failed to remove item from cart');
        throw err;
      }
    },
    [dispatch, currency]
  );

  /** Refresh cart manually */
  const refreshCart = useCallback(() => {
    dispatch(fetchCart({ currency }));
  }, [dispatch, currency]);

  /** Clear entire cart */
  const clearCart = useCallback(() => {
    dispatch(emptyCart());
    toast.success('Cart cleared');
  }, [dispatch]);

  /** Set shipping selection */
  const handleSelectedShipping = useCallback(
    (id: string) => {
      const shipping_details = shipping.find((s) => s.id === id) || null;
      if (shipping_details) {
        setSelectedShipping(shipping_details);
      }
    },
    [shipping]
  );

  return {
    cart,
    items: filteredItems,
    count: totals.totalQuantity, // or keep global count if you prefer
    loading,
    error,
    totals, // returns subtotal, shippingAmount, discount, grandTotal
    addToCart,
    removeFromCart,
    refreshCart,
    clearCart,

    shipping,
    selectedShipping,
    handleSelectedShipping,

    setDiscount, // allow UI to set discounts (coupon, promo, etc.)
  };
};

/** Hook: is product in cart? */
export const useIsInCart = (productId: string) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { currency } = useSelector((state: RootState) => state.currency);

  const items = filterByCurrency(cart?.items, currency);

  return {
    isInCart: items.some((i) => i.product_id === productId),
    cartItem: items.find((i) => i.product_id === productId),
  };
};

/** Hook for individual cart item actions */
export const useCartItem = (itemId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { currency } = useSelector((state: RootState) => state.currency);

  const item = filterByCurrency(cart?.items, currency)?.find(
    (i) => i.id === itemId
  );

  const removeItem = useCallback(async () => {
    try {
      await dispatch(removeCartItem(itemId)).unwrap();
      toast.success('Item removed from cart');
      dispatch(fetchCart({ currency }));
    } catch {
      toast.error('Failed to remove item');
    }
  }, [dispatch, itemId, currency]);

  return { item, removeItem };
};
