import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { ProductType } from '@/lib/utils';
import {
  Cart,
  CartItem,
  CartResponse,
  MeasurementMetadata,
} from '@/types/cart';
import { v4 } from 'uuid';
import { RemoveItemFromCartProps } from '@/lib/schema/cart.schema';
import { GenericResponse } from '@/types';

interface CartState {
  cart: Cart | null;
  isCartDrawerOpen: boolean;
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isCartDrawerOpen: false,
  count: 0,
  loading: false,
  error: null,
};

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (
    {
      product_id,
      quantity,
      product_type,
      ticket_tier_id,
      currency,
      metadata,
    }: {
      product_id: string;
      quantity: number;
      product_type: ProductType;
      ticket_tier_id?: string;
      currency?: string;
      metadata?: MeasurementMetadata;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<GenericResponse>('/cart/add', {
        product_id,
        quantity,
        product_type,
        ticket_tier_id,
        currency,
        metadata,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);

// Add multiple items to cart
export const addMultipleToCart = createAsyncThunk(
  'cart/add-multiple',
  async (
    {
      product_id,
      quantity,
      product_type,
      ticket_tier_id,
      metadata,
    }: {
      product_id: string;
      quantity: number;
      product_type: ProductType;
      ticket_tier_id?: string;
      metadata: MeasurementMetadata;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<GenericResponse>('/cart/add-multiple', {
        product_id,
        quantity,
        product_type,
        ticket_tier_id,
        metadata,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add multiple items to cart'
      );
    }
  }
);

// Fetch cart items
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ currency }: { currency: string }, { rejectWithValue }) => {
    try {
      const params: Record<string, any> = {};

      if (currency !== undefined) params['currency'] = currency;

      const response = await api.get<CartResponse>('/cart', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

// Remove from cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete<GenericResponse>(`/cart/item/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove cart item'
      );
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state, action: PayloadAction<boolean>) => {
      state.isCartDrawerOpen = action.payload;
    },
    emptyCart: (state) => {
      state.cart = null;
      state.count = 0;
      state.error = null;
    },
    addItemLocal: (state, action: PayloadAction<CartItem>) => {
      // Ensure cart object exists
      if (!state.cart) {
        state.cart = {
          id: v4(),
          created_at: new Date().toDateString(),
          updated_at: new Date().toDateString(),
          items: [],
          metadata: [],
        } as Cart;
      }

      // Find if item already exists
      const existingItem = state.cart.items.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.ticket_tier_id === action.payload.ticket_tier_id &&
          item.subscription_tier_id === action.payload.subscription_tier_id &&
          item.currency === action.payload.currency
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.items.push({
          ...action.payload,
          cart_id: state.cart.id,
          created_at: new Date().toDateString(),
          updated_at: new Date().toDateString(),
        });

        // Update count
        state.count = state.cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },

    removeItemLocal: (
      state,
      action: PayloadAction<RemoveItemFromCartProps>
    ) => {
      if (!state.cart) return;

      // state.cart.items = state.cart.items.filter(
      //   (item) =>
      //     item.id !== action.payload.id &&
      //     item.currency !== action.payload.currency
      // );

      state.cart.items = state.cart.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.currency === action.payload.currency
          )
      );

      // state.count = state.cart.items.reduce(
      //   (total, item) => total + item.quantity,
      //   0
      // );
    },

    updateItemQuantityLocal: (
      state,
      action: PayloadAction<{ id: string; quantity: number; currency: string }>
    ) => {
      if (!state.cart) return;
      const { id, quantity, currency } = action.payload;

      const idx = state.cart.items.findIndex(
        (it) => it.id === id && it.currency === currency
      );
      if (idx === -1) return;

      if (quantity <= 0) {
        state.cart.items.splice(idx, 1);
      } else {
        state.cart.items[idx].quantity = quantity;
        state.cart.items[idx].updated_at = new Date().toDateString();
      }

      state.cart.updated_at = new Date().toDateString();
      // state.count = state.cart.items.reduce(
      //   (total, item) => total + item.quantity,
      //   0
      // );
    },
  },
  extraReducers: (builder) => {
    // ...
  },
});

export const {
  openCart,
  emptyCart,
  addItemLocal,
  updateItemQuantityLocal,
  removeItemLocal,
} = cartSlice.actions;
export default cartSlice.reducer;
