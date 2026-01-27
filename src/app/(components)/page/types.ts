import { Product as OrgProduct } from "@/types/org";

// Re-export the existing Product type
export type Product = OrgProduct;

export interface SubscriptionPlan {
  id?: string;
  name: string;
  price: string;
  color: string;
  button: string;
  gradient: string;
  border: string;
  highlight: boolean;
  image: string;
  description: string;
  features: string[];
  limitations: string[];
}

export interface BusinessPageProps {
  orgProducts?: Product[];
}

export interface ModalState {
  isOpen: boolean;
  selectedItem: Product | SubscriptionPlan | null;
  type: "product" | "plan";
}

export interface PreviewState {
  selectedProduct: Product | null;
  selectedPlan: SubscriptionPlan | null;
  isProductPreviewOpen: boolean;
  isPlanPreviewOpen: boolean;
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType;
  label: string;
}
