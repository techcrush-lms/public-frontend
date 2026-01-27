import { combineReducers, configureStore } from '@reduxjs/toolkit';
import onboardReducer from './slices/onboardSlice';
import orgReducer from './slices/orgSlice';
import cartReducer from './slices/cartSlice';
import couponReducer from './slices/couponSlice';
import currencyReducer from './slices/currencySlice';
import invoiceReducer from './slices/invoiceSlice';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Persist configuration for auth slice only
const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['cart'], // Only persist the auth slice
};

// Combine reducers
const rootReducer = combineReducers({
  // auth: persistReducer(persistConfig, authReducer),
  // chat: chatReducer,
  // course: courseReducer,
  // ticket: ticketReducer,
  // org: persistReducer(persistConfig, orgReducer),
  // payment: paymentReducer,
  // coupon: couponReducer, // Not persisted
  // subscriptionPlan: subscriptionPlanReducer, // Not persisted
  // notification: notificationReducer, // Not persisted
  // productImport: productImportReducer,
  // anaytics: anayticsReducer,
  onboard: onboardReducer,
  org: orgReducer,
  cart: persistReducer(persistConfig, cartReducer),
  coupon: couponReducer,
  currency: currencyReducer,
  invoice: invoiceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
