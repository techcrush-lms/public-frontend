export interface NavigationItem {
  path: string;
  label: string;
}

export interface NavigationState {
  currentHash: string;
  isActive: (hash: string) => boolean;
}

export interface NavigationActions {
  handleLinkClick: (item: string) => void;
}

export interface MobileMenuState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export interface HeaderProps {
  handleNav?: (item: string) => void;
}

export interface NavigationLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export interface AuthButtonsProps {
  isOpen?: boolean;
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export interface MobileNavigationProps {
  isOpen: boolean;
  currentHash: string;
  onLinkClick: (item: string) => void;
  onClose: () => void;
}

export interface DesktopNavigationProps {
  currentHash: string;
  onLinkClick: (item: string) => void;
}

export type SectionId = 'home' | 'about' | 'features' | 'getStarted' | 'blogs';

export interface ScrollToSectionFunction {
  (sectionId: string): void;
}
