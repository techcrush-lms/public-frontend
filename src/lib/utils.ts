import { Product } from '@/app/(components)/page/types';
import { CartItem } from '@/types/cart';
import { OtherCurrency, SubscriptionPlanPrice, TicketTier } from '@/types/org';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { City, Country, State } from 'country-state-city';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number, currency = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export enum ProductStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export enum ProductType {
  COURSE = 'COURSE',
  TICKET = 'TICKET',
  SUBSCRIPTION = 'SUBSCRIPTION',
  DIGITAL_PRODUCT = 'DIGITAL_PRODUCT',
  PHYSICAL_PRODUCT = 'PHYSICAL_PRODUCT',
}

export enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
}

export enum MediaProvider {
  CLOUDINARY = 'CLOUDINARY',
  AWS = 'AWS',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO',
  EMBED = 'EMBED',
}

export enum RoleId {
  BUSINESS_SUPER_ADMIN = 'business-super-administrator',
  BUSINESS_ADMIN = 'business-administrator',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
  CONTENT_CREATOR = 'content-creator',
}

// Enums for restricted values
export enum EventType {
  PHYSICAL = 'PHYSICAL',
  VIRTUAL = 'VIRTUAL',
  HYBRID = 'HYBRID',
}

export enum TicketStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  SOLD_OUT = 'SOLD_OUT',
  COMING_SOON = 'COMING_SOON',
}

// Optional: If you want to use enums for fixed values
export enum SubscriptionPeriod {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  // Add other periods as needed
}

export const reformatUnderscoreText = (text: string) => {
  return text.split('_').join(' ');
};

export const SUCCESS_RESPONSE = 200;

// Convert product type to ProductType enum
export const getProductType = (type: ProductType): ProductType => {
  if (type === ProductType.COURSE) return ProductType.COURSE;
  if (type === ProductType.TICKET) return ProductType.TICKET;
  if (type === ProductType.SUBSCRIPTION) return ProductType.SUBSCRIPTION;
  if (type === ProductType.DIGITAL_PRODUCT) return ProductType.DIGITAL_PRODUCT;
  if (type === ProductType.PHYSICAL_PRODUCT)
    return ProductType.PHYSICAL_PRODUCT;
  return ProductType.COURSE; // Default fallback
};

export const sortTiersByPrice = (tiers: TicketTier[]): TicketTier[] =>
  [...tiers].sort((a, b) => +a.amount - +b.amount);

export const getFirstAvailableTier = (product: Product): TicketTier | null => {
  if (
    product?.type === ProductType.TICKET &&
    product?.ticket?.ticket_tiers?.length
  ) {
    return sortTiersByPrice(product.ticket.ticket_tiers)[0];
  }
  return null;
};

export const sortSubPlansByPrice = (
  plan_prices: SubscriptionPlanPrice[],
): SubscriptionPlanPrice[] =>
  [...plan_prices].sort((a, b) => +a.price - +b.price);

export const getFirstAvailablePlan = (
  product: Product,
): SubscriptionPlanPrice | null => {
  if (
    product?.type === ProductType.SUBSCRIPTION &&
    product?.subscription_plan?.subscription_plan_prices?.length
  ) {
    return sortSubPlansByPrice(
      product.subscription_plan.subscription_plan_prices,
    )[0];
  }
  return null;
};

export const addPossessive = (word: string) => {
  if (!word || typeof word !== 'string') return '';

  const trimmed = word.trim();
  return trimmed.endsWith('s') ? `${trimmed}'` : `${trimmed}'s`;
};

export const filterByCurrency = (
  items: CartItem[] | undefined,
  currency: string,
) => {
  return items?.filter((item) => item.currency === currency) || [];
};

export enum PaymentMethod {
  PAYSTACK = 'PAYSTACK',
  FLUTTERWAVE = 'FLUTTERWAVE',
}

export const formatTo12Hour = (event_time: string) => {
  let [hours, minutes] = event_time.split(':').map(Number);

  const amOrPm = hours < 12 ? 'AM' : 'PM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12 || 12; // 0 → 12 for midnight/noon cases

  return `${hours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
};

export const PRIMARY_COLOR = '#4045e1';

// 1. All countries
export const countriesData = Country.getAllCountries().map((c) => ({
  label: c.name,
  value: c.isoCode,
}));

// 2. States of a selected country
export const stateOptions = (country: string | 'NG') =>
  country
    ? State.getStatesOfCountry(country).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

// 3. Cities of a selected state + country
export const cityOptions = (
  countryCode: string | 'NG',
  stateCode: string | 'LA',
) =>
  countryCode && stateCode
    ? City.getCitiesOfState(countryCode, stateCode).map((c) => ({
        label: c.name,
        value: c.name, // Cities do not have ISO codes — name is used as value
      }))
    : [];

export const isVideo = (url: string | null) => {
  if (!url) return false;
  return url.match(/\.(mp4|mov|webm)$/i);
};

import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();

export const extractDominantColor = async (url: string) => {
  try {
    const result = await fac.getColorAsync(url, {
      mode: 'speed', // fast + good accuracy
    });

    return result.rgb; // "rgb(r, g, b)"
  } catch (err) {
    console.log('Color extraction failed', err);
    return 'black';
  }
};

export const buttonWidth = { base: 'full', md: '227px' };

export const headingSize = {
  base: '2xl',
  sm: '3xl',
  md: '4xl',
  lg: '5xl',
};

export const features = [
  {
    title: 'Stress-Free Member Onboarding',
    body: 'New members sign up in seconds (email, phone, social) with instant role assignments and guided checklists.',
    src: '/images/features/stress-free1.png',
    url: '/features/stress-free-member-onboarding',
  },
  {
    title: 'Automated Engagement',
    body: 'Send bulk email messages automatically using smart templates. Track opens, clicks, replies—live.',
    src: '/images/features/automated1.png',
    url: '/features/automated-engagement',
  },
  {
    title: 'Sell Products & Services',
    body: 'Drag-and-drop courses, QR ticketing, and branded checkout. Accept cards, PayPal, coupons.',
    src: '/images/features/sell-courses1.png',
    url: '/features/sell-products-and-services',
  },
  {
    title: 'Actionable Analytics',
    body: 'Live dashboards, drill-down filters, and auto-generated reports. Find hidden growth gems.',
    src: '/images/features/actionable1.png',
    url: '/features/actionable-analytics',
  },
  {
    title: 'Boost sales with Coupons',
    body: 'Create and manage discount codes to boost sales and reward your most loyal members.',
    src: '/images/features/add-coupon.png',
    url: '/features/boost-sales-with-coupons',
  },
  {
    title: 'Real-Time Interaction & Collaboration',
    body: 'Enable seamless teamwork with live activity feeds and shared management tools.',
    src: '/images/features/team.png',
    url: '/features/real-time-interaction-and-collaboration',
  },
];

export const hostslug = (hostname: string) => {
  const hostParts = hostname.split('.');
  if (hostParts.length < 3) {
    return null; // No subdomain present
  }
  return hostParts[0]; // Return the subdomain part
};

export const getPriceForCurrency = (
  currency: string,
  price: number,
  other_currencies?: OtherCurrency[],
) => {
  const currencies = Array.isArray(other_currencies) ? other_currencies : [];

  return (
    [{ currency, price: Number(price) }, ...currencies].find(
      (item) => item.currency === currency,
    )?.price ?? 0
  );
};
