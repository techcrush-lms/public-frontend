'use client';

import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

interface CartProviderProps {
  children: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const { refreshCart } = useCart();

  useEffect(() => {
    // Initialize cart on app load
    const initializeCart = async () => {
      try {
        await refreshCart();
      } catch (error) {
        console.warn('Failed to initialize cart:', error);
        // Don't throw error to prevent app crash
      }
    };

    initializeCart();
  }, [refreshCart]);

  return <>{children}</>;
}
