import api from '@/lib/api';
import { ProductType } from '@/lib/utils';
import {
  OrgProductsResponse,
  Product,
  ProductDetailsResponse,
  ShippingDetailsResponse,
  ShippingLocation,
  SubscriptionPlan,
  SubscriptionPlanResponse,
} from '@/types/org';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OrgState {
  org_products: Product[];
  org_products_count: number;
  org_products_current_page: number;
  loading: boolean;

  org_subscriptions: SubscriptionPlan[];
  org_subscriptions_count: number;
  org_plans_current_page: number;
  org_subscription_loading: boolean;

  product: Product | null;

  shipping_loading: boolean;
  shipping_count: number;
  shipping_current_page: number;
  shipping: ShippingLocation[];

  error: string | null;
}

const initialState: OrgState = {
  org_products: [],
  org_products_count: 0,
  org_products_current_page: 1,
  loading: false,

  org_subscriptions: [],
  org_subscriptions_count: 0,
  org_plans_current_page: 1,
  org_subscription_loading: false,

  product: null,

  shipping_loading: false,
  shipping_count: 0,
  shipping_current_page: 1,
  shipping: [],

  error: null,
};

// Async Thunk to view organization products
export const viewOrgProducts = createAsyncThunk(
  'product-general/organization/:business_id',
  async (
    {
      business_id,
      type,
      limit,
      page,
      currency,
    }: {
      business_id: string;
      type?: ProductType;
      limit?: number;
      page?: number;
      currency?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = {};

      if (type !== undefined) params['type'] = type;
      if (limit !== undefined) params['pagination[limit]'] = limit;
      if (page !== undefined) params['pagination[page]'] = page;
      if (currency !== undefined) params['currency'] = currency;

      const { data } = await api.get<OrgProductsResponse>(
        `/product-general/organization/${business_id}`,
        { params }
      );

      return {
        data: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Fetch organization products failed'
      );
    }
  }
);

// Async Thunk to view organization subscription plans
export const viewOrgSubscriptionPlans = createAsyncThunk(
  'subscription-plan/public/:business_id',
  async (
    {
      business_id,
      limit,
      page,
    }: { business_id: string; limit?: number; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = {};

      if (limit !== undefined) params['pagination[limit]'] = limit;
      if (page !== undefined) params['pagination[page]'] = page;

      const { data } = await api.get<SubscriptionPlanResponse>(
        `/subscription-plan/public/${business_id}`,
        { params }
      );

      return {
        data: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Fetch organization subscription plans failed'
      );
    }
  }
);

export const viewProductDetails = createAsyncThunk(
  'product-general/public/:product_id',
  async (
    { product_id, currency }: { product_id: string; currency: string },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = {};
      if (currency !== undefined) params['currency'] = currency;

      const { data } = await api.get<ProductDetailsResponse>(
        `/product-general/public/${product_id}`,
        { params }
      );

      return {
        data: data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fetch product details failed'
      );
    }
  }
);

export const fetchShipping = createAsyncThunk(
  'shipping/public',
  async (
    {
      business_id,
      limit,
      page,
    }: { business_id: string; limit?: number; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const headers: Record<string, any> = {};
      const params: Record<string, any> = {};

      if (limit !== undefined) params['pagination[limit]'] = limit;
      if (page !== undefined) params['pagination[page]'] = page;
      if (business_id !== undefined) params['business_id'] = business_id;

      const { data } = await api.get<ShippingDetailsResponse>(
        `/shipping/public`,
        { params }
      );

      return {
        data: data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fetch shipping details failed'
      );
    }
  }
);

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const mergeUniqueById = <T extends { id: string }>(
      prev: T[],
      next: T[]
    ) => {
      const map = new Map(prev.map((i) => [i.id, i]));
      for (const item of next) map.set(item.id, item);
      return Array.from(map.values());
    };

    builder
      .addCase(viewOrgProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewOrgProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.org_products = mergeUniqueById(
          state.org_products,
          action.payload.data
        );
        state.org_products_count = action.payload.count;
        state.org_products_current_page =
          action.meta.arg.page ?? state.org_products_current_page;
      })
      .addCase(viewOrgProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(viewOrgSubscriptionPlans.pending, (state) => {
        state.org_subscription_loading = true;
        state.error = null;
      })
      .addCase(viewOrgSubscriptionPlans.fulfilled, (state, action) => {
        state.org_subscription_loading = false;
        state.org_subscriptions = mergeUniqueById(
          state.org_subscriptions,
          action.payload.data
        );
        state.org_subscriptions_count = action.payload.count;
        state.org_plans_current_page =
          action.meta.arg.page ?? state.org_plans_current_page;
      })
      .addCase(viewOrgSubscriptionPlans.rejected, (state, action) => {
        state.org_subscription_loading = false;
        state.error = action.payload as string;
      })
      .addCase(viewProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(viewProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShipping.pending, (state) => {
        state.shipping_loading = true;
        state.error = null;
      })
      .addCase(fetchShipping.fulfilled, (state, action) => {
        state.shipping_loading = false;
        state.shipping = action.payload.data;
      })
      .addCase(fetchShipping.rejected, (state, action) => {
        state.shipping_loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orgSlice.reducer;
