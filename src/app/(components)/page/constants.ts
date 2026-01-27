import { SubscriptionPlan, SocialLink } from './types';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

export const BUSINESS_PAGE_COLORS = {
  primary: '#2326a3',
  secondary: '#4045E1',
  tertiary: '#a21caf',
  background: '#F7F8F8',
  text: {
    primary: '#080930',
    secondary: '#434453',
  },
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/',
    icon: FaXTwitter,
    label: 'Twitter',
  },
  {
    href: 'https://instagram.com/',
    icon: FaInstagram,
    label: 'Instagram',
  },
  {
    href: 'https://facebook.com/',
    icon: FaFacebook,
    label: 'Facebook',
  },
  {
    href: 'https://tiktok.com/',
    icon: FaTiktok,
    label: 'TikTok',
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9',
    color: '#2326a3',
    button: 'Choose Starter',
    gradient: 'linear(to-r, #4045E1, #2326a3)',
    border: '1.5px solid #EDEEFC',
    highlight: false,
    image: '/images/features/actionable.png',
    description: 'Perfect for individuals getting started with our platform.',
    features: [
      'Up to 3 courses',
      'Basic analytics',
      'Email support',
      'Mobile app access',
      '1GB storage',
    ],
    limitations: ['Limited customization', 'No priority support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    color: '#4045E1',
    button: 'Choose Pro',
    gradient: 'linear(to-r, #4045E1, #2326a3)',
    border: '2px solid #4045E1',
    highlight: true,
    image: '/images/features/sell-courses.png',
    description: 'Ideal for professionals who want more features and flexibility.',
    features: [
      'Unlimited courses',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      '10GB storage',
      'API access',
    ],
    limitations: ['No white-label solution'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    color: '#a21caf',
    button: 'Contact Sales',
    gradient: 'linear(to-r, #a21caf, #4045E1)',
    border: '1.5px solid #EDEEFC',
    highlight: false,
    image: '/images/features/admin-control.png',
    description: 'Best for organizations needing advanced support and customization.',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'Unlimited storage',
      'Advanced security',
      'Team management',
    ],
    limitations: [],
  },
];

export const HERO_SECTION = {
  title: 'Welcome to Your Business',
  subtitle: 'Discover how our platform can help your business automate onboarding, manage products, and streamline operations.',
  logoSrc: '/images/header-logo.png',
  logoAlt: 'Business Page Logo',
  backgroundImage: `linear-gradient(104deg, rgba(255, 255, 255, 0.55) 0%, rgba(199, 202, 255, 1) 100%), url('/images/home-grid.png')`,
} as const;

export const SECTION_TITLES = {
  featuredProducts: 'Featured Products',
  subscriptionPlans: 'Subscription Plans',
} as const;
