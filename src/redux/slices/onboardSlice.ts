import api from '@/lib/api';
import {
  AddCustomerProps,
  SendContactMessageProps,
  SubscribeToNewsletterProps,
} from '@/lib/schema/onboard.schema';
import { GenericResponse } from '@/types';
import {
  BusinessInfo,
  BusinessInfoResponse,
  BusinessProfileFull,
  BusinessProfileFullReponse,
} from '@/types/onboard';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  business_info: BusinessInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  business_info: null,
  loading: false,
  error: null,
};

// Async Thunk to view business info
export const viewBusinessInfo = createAsyncThunk(
  'onboard/view-business-info/:id',
  async ({ business_id }: { business_id: string }, { rejectWithValue }) => {
    try {
      const params: Record<string, any> = {};

      if (business_id !== undefined) params['id'] = business_id;

      const { data } = await api.get<BusinessInfoResponse>(
        `/onboard/view-business-info/${business_id}`
      );

      return {
        data: data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'View business info failed'
      );
    }
  }
);

// Async Thunk to add customer
export const addCustomer = createAsyncThunk(
  'onboard/add-customer',
  async (credentials: AddCustomerProps, { rejectWithValue }) => {
    try {
      const { data } = await api.post<GenericResponse>(
        '/onboard/add-customer',
        credentials
      );

      return { message: data.message };
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.response?.data || 'Add customer failed');
    }
  }
);

// Async Thunk to register customer
export const registerCustomer = createAsyncThunk(
  'auth/register-customer',
  async (credentials: AddCustomerProps, { rejectWithValue }) => {
    try {
      const { data } = await api.post<GenericResponse>(
        '/auth/register-customer',
        credentials
      );

      return { statusCode: data.statusCode, message: data.message };
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.response?.data || 'Add customer failed');
    }
  }
);

// Async Thunk to send contact message
export const sendContactMessage = createAsyncThunk(
  'contact/send-contact-message',
  async (credentials: SendContactMessageProps, { rejectWithValue }) => {
    try {
      const { data } = await api.post<GenericResponse>(
        '/contact/send-contact-message',
        credentials
      );

      return { statusCode: data.statusCode, message: data.message };
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(
        error.response?.data || 'Send contact message failed'
      );
    }
  }
);

// Async Thunk to subscribe to newsletter
export const subscribeToNewsletter = createAsyncThunk(
  'contact/subscribe-newsletter',
  async (credentials: SubscribeToNewsletterProps, { rejectWithValue }) => {
    try {
      const { data } = await api.post<GenericResponse>(
        '/contact/subscribe-newsletter',
        credentials
      );

      return { statusCode: data.statusCode, message: data.message };
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(
        error.response?.data || 'Subscribe to newsletter failed'
      );
    }
  }
);

const onboardSlice = createSlice({
  name: 'onboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewBusinessInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewBusinessInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.business_info = action.payload.data;
      })
      .addCase(viewBusinessInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default onboardSlice.reducer;
