import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { ApplyCoupon, CouponResponse } from '@/types/coupon';
import { stat } from 'fs';

interface CouponState {
  coupon_info: {
    discount: number;
    discountedAmount: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupon_info: {
    discount: 0,
    discountedAmount: 0,
  },
  loading: false,
  error: null,
};

// Async thunk to apply coupon
export const applyCoupon = createAsyncThunk(
  'coupon-management/apply-coupon',
  async (payload: ApplyCoupon, { rejectWithValue }) => {
    try {
      const { data } = await api.post<CouponResponse>(
        '/coupon-management/apply-coupon',
        payload
      );

      return {
        data: data.data,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to apply coupon'
      );
    }
  }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearCouponData: (state) => {
      state.coupon_info = {
        discount: 0,
        discountedAmount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon_info = {
          discountedAmount: action.payload.data.discountedAmount,
          discount: action.payload.data.discount,
        };
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to apply coupon';
        state.loading = false;
      });
  },
});

export const { clearCouponData } = couponSlice.actions;
export default couponSlice.reducer;
