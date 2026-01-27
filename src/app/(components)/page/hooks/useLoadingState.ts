import { useState, useEffect, useCallback } from 'react';

interface UseLoadingStateOptions {
  initialDelay?: number;
  minLoadingTime?: number;
}

export const useLoadingState = (
  isDataLoaded: boolean,
  options: UseLoadingStateOptions = {}
) => {
  const { initialDelay = 0, minLoadingTime = 500 } = options;

  const [showShimmer, setShowShimmer] = useState(true);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const handleDataLoaded = useCallback(() => {
    if (loadingStartTime === null) return;

    const elapsedTime = Date.now() - loadingStartTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

    if (remainingTime > 0) {
      setTimeout(() => {
        setShowShimmer(false);
      }, remainingTime);
    } else {
      setShowShimmer(false);
    }
  }, [loadingStartTime, minLoadingTime]);

  useEffect(() => {
    // Set loading start time
    if (loadingStartTime === null) {
      setLoadingStartTime(Date.now());
    }

    // Handle initial delay
    if (initialDelay > 0) {
      const delayTimer = setTimeout(() => {
        if (isDataLoaded) {
          handleDataLoaded();
        }
      }, initialDelay);

      return () => clearTimeout(delayTimer);
    }

    // Handle data loaded
    if (isDataLoaded) {
      handleDataLoaded();
    }
  }, [isDataLoaded, initialDelay, loadingStartTime, handleDataLoaded]);

  return {
    showShimmer,
    isLoading: showShimmer,
  };
};

// Hook specifically for business page products
export const useBusinessProductsLoading = (products: unknown[]) => {
  const isDataLoaded = products && products.length > 0;

  return useLoadingState(isDataLoaded, {
    // initialDelay: 100,
    // minLoadingTime: 800,
  });
};

// Hook for individual components
export const useComponentLoading = (condition: boolean, delay = 300) => {
  return useLoadingState(condition, {
    initialDelay: delay,
    minLoadingTime: 600,
  });
};
