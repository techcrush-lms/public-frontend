// Business Information API Response Types

export interface BusinessProfile {
  profile_picture: string;
  gender: 'male' | 'female' | 'other' | null;
  bio: string | null;
  state: string | null;
  country: string;
}

export interface User {
  id: string;
  name: string;
  profile: BusinessProfile;
}

export interface BusinessInfo {
  id: string;
  user_id: string;
  business_name: string;
  business_slug: string;
  business_description?: string;
  social_media_handles?: Array<{ handle: string; link: string }>;
  business_size: 'small' | 'medium' | 'large' | 'enterprise';
  timeline: string; // Timezone string like "Africa/Lagos"
  logo_url: string | null;
  industry: string;
  working_hours: string | null;
  location: string;
  state: string;
  country: string;
  country_code: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user: User;
}

export interface BusinessInfoResponse {
  statusCode: number;
  message: string;
  data: BusinessInfo;
}

// Form data types for business onboarding
export interface BusinessOnboardFormData {
  business_name: string;
  business_size: BusinessInfo['business_size'];
  industry: string;
  location: string;
  state: string;
  country: string;
  country_code: string;
  logo_url?: string;
  working_hours?: string;
}

// User profile form data
export interface UserProfileFormData {
  name: string;
  profile_picture?: string;
  gender?: BusinessProfile['gender'];
  bio?: string;
  state?: string;
  country: string;
}

export interface BusinessProfileFull {
  id: string;
  user_id: string;
  business_name: string;
  business_size: 'small' | 'medium' | 'large' | string;
  timeline: string;
  logo_url: string;
  industry: string;
  working_hours: string | null;
  location: string;
  state: string | null;
  country: string;
  country_code: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  kyc: KYC[];
  onboarding_status: {
    current_step: number;
    is_completed: boolean;
  };
  business_wallet: {
    balance: string;
    previous_balance: string;
    currency: string;
  };
  withdrawal_account: WithdrawalAccount;
}

export interface KYC {
  id: string;
  business_id: string;
  user_id: string | null;
  doc_front: string;
  doc_back: string;
  utility_doc: string;
  location: string;
  state: string | null;
  city: string;
  country: string;
  country_code: string;
  id_type: string;
  is_approved: boolean;
  disapproval_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WithdrawalAccount {
  id: string;
  business_id: string;
  account_number: string;
  account_type: string; // e.g., "Savings Bank"
  bank_name: string;
  routing_number: string | null;
  recipient_code: string;
  country: string; // e.g., "Nigeria"
  country_code: string; // e.g., "NG"
  currency: string; // e.g., "NGN"
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
  deleted_at: string | null;
}

export interface BusinessProfileFullReponse {
  statusCode: number;
  message: string;
  data: BusinessProfileFull;
}
