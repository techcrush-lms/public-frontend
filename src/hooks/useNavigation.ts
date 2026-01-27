'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface UseNavigationReturn {
  currentHash: string;
  isActive: (hash: string) => boolean;
  handleLinkClick: (item: string) => void;
}

export function useNavigation(): UseNavigationReturn {
  const router = useRouter();
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || pathname);
    };

    // Set initial hash
    setCurrentHash(window.location.hash || pathname);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [pathname]);

  const isActive = (hash: string): boolean => {
    return currentHash === hash;
  };

  const handleLinkClick = (item: string): void => {
    setCurrentHash(item);
    router.push(item === '/home' ? '/' : item);
  };

  return {
    currentHash,
    isActive,
    handleLinkClick,
  };
}
