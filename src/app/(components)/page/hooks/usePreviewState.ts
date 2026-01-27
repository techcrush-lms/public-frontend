import { Product, SubscriptionPlan } from "@/types/org";
import { useState, useCallback } from "react";

export const usePreviewState = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [isPlanPreviewOpen, setIsPlanPreviewOpen] = useState(false);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductPreviewOpen(true);
  }, []);

  const handlePlanClick = useCallback((plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsPlanPreviewOpen(true);
  }, []);

  const handleCloseProductPreview = useCallback(() => {
    setIsProductPreviewOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleClosePlanPreview = useCallback(() => {
    setIsPlanPreviewOpen(false);
    setSelectedPlan(null);
  }, []);

  const handleCloseAllPreviews = useCallback(() => {
    setIsProductPreviewOpen(false);
    setIsPlanPreviewOpen(false);
    setSelectedProduct(null);
    setSelectedPlan(null);
  }, []);

  const handleSubscribe = useCallback(
    (tier: string) => {
      if (selectedPlan) {
        console.log(`Subscribing to ${selectedPlan.name} - ${tier} tier`);
        // Add your subscription logic here
        handleClosePlanPreview();
      }
    },
    [selectedPlan, handleClosePlanPreview],
  );

  const handlePlanSubscription = useCallback((planName: string) => {
    if (planName === "Enterprise") {
      console.log("Contact sales clicked");
    } else {
      console.log(`Subscribe to ${planName}`);
    }
  }, []);

  return {
    // State
    selectedProduct,
    selectedPlan,
    isProductPreviewOpen,
    isPlanPreviewOpen,

    // Actions
    handleProductClick,
    handlePlanClick,
    handleCloseProductPreview,
    handleClosePlanPreview,
    handleCloseAllPreviews,
    handleSubscribe,
    handlePlanSubscription,
  };
};
