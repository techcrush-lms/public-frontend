import { Profile } from './account';
import { UserProfile } from './org';

export interface CouponResponse {
  statusCode: number;
  data: CouponData;
  message: string;
}

export interface ApplyCoupon {
  email: string;
  code: string;
  amount: string;
}

export interface CouponData {
  discountedAmount: number;
  discount: number;
}
