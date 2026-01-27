export const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const;

export const EXTERNAL_URLS = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/onboard/signup',
} as const;

export const HEADER_STYLES = {
  colors: {
    primary: 'rgba(64, 69, 225, 1)',
    text: '#080930',
    background: 'rgba(247, 248, 248, 1)',
    hover: '#ced0ff',
    buttonBg: '#e7e9f8',
  },
  borderRadius: '12px',
  blur: 'blur(100px)',
  shadow: '0px 4px 20px 0px rgba(19, 69, 98, 0.1)',
  border: '1px solid rgba(64, 69, 225, 0.1)',
} as const;

export const BREAKPOINTS = {
  mobile: 'base',
  desktop: 'md',
} as const;
