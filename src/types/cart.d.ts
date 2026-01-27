import { ProductType } from '@/lib/utils';
import { Product } from './org';
import {
  Course,
  Ticket,
  TicketProduct,
  TicketTier,
  TicketTierWithTicketAndProduct,
} from './product';

export interface CartItem extends Product {
  id?: string;
  cart_id?: string;
  currency?: string;

  product_id: string;
  product_type: ProductType;
  quantity: number;
  price_at_time: string;
  metadata: MeasurementMetadata[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Add ticket/subscription fields as needed
  ticket_tier_id?: string;
  subscription_tier_id?: string;
  ticket_tier?: TicketTierWithTicketAndProduct;
  subscription_plan_tier?: TicketTierWithTicketAndProduct;
  size?: string;
  color?: string;
}

export type Unit = 'inch' | 'cm' | 'm';

export interface MeasurementField {
  value?: number;
  unit?: Unit;
}

export interface UpperBody {
  bust_circumference?: MeasurementField;
  shoulder_width?: MeasurementField;
  armhole_circumference?: MeasurementField;
  sleeve_length?: MeasurementField;
  bicep_circumference?: MeasurementField;
  wrist_circumference?: MeasurementField;
}

export interface LowerBody {
  waist_circumference?: MeasurementField;
  hip_circumference?: MeasurementField;
  thigh_circumference?: MeasurementField;
  knee_circumference?: MeasurementField;
  trouser_length?: MeasurementField;
}

export interface FullBody {
  height?: MeasurementField;
  dress_length?: MeasurementField;
}

export interface MeasurementMetadata {
  customer_name?: string;
  unit?: string;
  bust_circumference?: Decimal;
  shoulder_width?: Decimal;
  armhole_circumference?: Decimal;
  sleeve_length?: Decimal;
  bicep_circumference?: Decimal;
  wrist_circumference?: Decimal;

  waist_circumference?: Decimal;
  hip_circumference?: Decimal;
  thigh_circumference?: Decimal;
  knee_circumference?: Decimal;
  trouser_length?: Decimal;

  height?: Decimal;
  dress_length?: Decimal;
  // upper_body?: UpperBody;
  // lower_body?: LowerBody;
  // full_body?: FullBody;
}

export interface Cart {
  id: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

export interface CartResponse {
  statusCode: number;
  data: Cart;
  count: number;
}
