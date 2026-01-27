import { Currency, ProductType } from '@/lib/utils';
import { BusinessInfo } from './onboard';
import { CourseModule, Creator, ModulesResponse, Multimedia } from './product';

// Main interfaces
interface TicketTier {
  id: string;
  ticket_id: string;
  name: string;
  description: string | null;
  quantity: number;
  remaining_quantity: number | null;
  max_per_purchase: number | null;
  default_view: boolean;
  status: TicketStatus;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  deleted_at: string | null; // ISO 8601 date string
  currency: Currency; // Reusing the Currency enum from previous example
  amount: string; // Could be number if converted
  original_amount: string; // Could be number if converted
}

interface EventDetails {
  id: string;
  event_time: string;
  event_start_date: string; // ISO 8601 date string
  event_end_date: string; // ISO 8601 date string
  event_location: string;
  event_type: EventType;
  ticket_tiers: TicketTier[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string; // Could be number if you convert it
  original_price: string; // Could be number if you convert it
  currency: string; // Consider using a union type like 'NGN' | 'USD' | 'EUR' if you know possible values
  keywords: string[] | null; // Assuming keywords would be an array if present
  metadata: Record<string, unknown> | null; // Generic metadata object
  status: ProductStatus; // Common status types
  type: ProductType; // Example types, adjust as needed
  published_at: string | null; // ISO 8601 date string
  archived_at: string | null; // ISO 8601 date string
  creator_id: string;
  created_at: string; // Date string (note the format differs from ISO in your example)
  business_info?: BusinessInfo | null;
  creator: {
    id: string;
    name: string;
    role: {
      name: string;
      role_id: string; // Consider using specific role IDs if they're standardized
    };
  };
  category: {
    id: string;
    name: string;
    creator_id: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    deleted_at: string | null; // ISO 8601 date string
  };
  multimedia: {
    id: string;
    url: string;
    creator_id: string;
    business_id: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    deleted_at: string | null; // ISO 8601 date string
    provider: MediaProvider; // Example providers
    type: MediaType; // Media types
  };
  ticket: null | EventDetails;
  subscription_plan: null | SubscriptionPlan;
  physical_product: PhysicalProduct;
  modules: CourseModule[];
  cohort: Cohort;
  classroom: number;
  other_currencies: OtherCurrency[];
}

export interface OtherCurrency {
  price: number;
  currency: string;
}

export interface Cohort {
  id: string;
  name: string;
  cohort_number: string;
  description: string | null;
  cohort_month: string;
  cohort_year: string;
  group_link: string;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
  multimedia: Multimedia | null;
  creator: Creator;
}

// Physical Product
export interface PhysicalProduct {
  id: string;
  product_id: string;
  sizes: string[];
  colors: string[];
  location: string;
  stock: number;
  type: 'product' | string; // or narrow to 'product' if fixed
  gender: 'male' | 'female' | 'unisex' | string;
  estimated_production_time: number | null;
  min_required: number | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  media: PhysicalProductMedia[];
}
export interface PhysicalProductMedia {
  id: string;
  multimedia: Multimedia;
  multimedia_id: string;
  physical_product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrgProductsResponse {
  statusCode: number;
  data: Product[];
  count: number;
}

// Subscription plans interfaces
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  business_id: string;
  created_at: string; // Date string in format "YYYY-MM-DD HH:MM:SS.SSS"
  updated_at: string; // Date string in format "YYYY-MM-DD HH:MM:SS.SSS"
  deleted_at: string | null;
  creator_id: string;
  subscription_plan_prices: SubscriptionPlanPrice[];
}

export interface SubscriptionPlanPrice {
  id: string;
  subscription_plan_id: string;
  price: string; // Could be number if converted
  currency: Currency; // Consider using enum like 'NGN' | 'USD' | 'EUR'
  creator_id: string;
  period: 'monthly' | 'yearly' | string; // Add other possible periods if needed
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  deleted_at: string | null; // ISO 8601 date string
}

export interface ShippingLocation {
  id: string;
  title: string;
  country: string;
  state: string;
  address: string;
  city: string;
  price: string;
  currency: string;
  other_currencies: OtherCurrencyProps[];
  arrival_time: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  business_id: string;
  user: User;
  business: Business;
  payments: Array<{ id: string }>;
}

export interface SubscriptionPlanResponse {
  statusCode: number;
  data: SubscriptionPlan[];
  count: number;
}

export interface ProductDetailsResponse {
  statusCode: number;
  message: string;
  data: Product;
}

export interface ShippingDetailsResponse {
  statusCode: number;
  data: ShippingLocation[];
}
