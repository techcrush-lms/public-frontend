import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import {
  BusinessCurrencies,
  BusinessCurrencyData,
  BusinessCurrencyResponse,
} from '@/types/currency';

interface CurrencyState {
  currencies: BusinessCurrencies | null;
  store_currencies: BusinessCurrencyData | null;
  currency: string;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  currencies: null,
  store_currencies: null,
  currency: 'NGN',
  loading: true,
  error: null,
};

// Async thunk to fetch store currencies
export const fetchStoreCurrencies = createAsyncThunk(
  'currency/fetch-business-currencies/:business_id',
  async ({ business_id }: { business_id: string }) => {
    const params: Record<string, any> = {};

    if (business_id !== undefined) params['business_id'] = business_id;

    const { data } = await api.get<BusinessCurrencyResponse>(
      `/currency/fetch-business-currencies/${business_id}`
    );

    return data;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    switchCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.store_currencies = action.payload.data;
      })
      .addCase(fetchStoreCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch store currencies';
      });
  },
});

export const { switchCurrency } = currencySlice.actions;

export default currencySlice.reducer;
