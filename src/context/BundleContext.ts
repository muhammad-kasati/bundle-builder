import { createContext, useContext } from 'react';
import type { Product, Step, CartItem, QuantitiesState, ActiveVariantsState } from '../types/bundle';

export interface BundleContextType {
  steps: Step[];
  products: Product[];
  quantities: QuantitiesState;
  activeVariants: ActiveVariantsState;
  expandedStepId: string | null;
  
  // Actions
  getQuantity: (productId: string, variantId?: string) => number;
  getProductTotalQuantity: (productId: string) => number;
  getActiveVariant: (productId: string) => string;
  setQuantity: (productId: string, variantId: string, count: number) => void;
  incrementQuantity: (productId: string, variantId: string) => void;
  decrementQuantity: (productId: string, variantId: string) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  toggleStep: (stepId: string) => void;
  setExpandedStepId: (stepId: string | null) => void;
  getStepSelectedCount: (stepId: string) => number;
  saveSystem: () => void;
  resetSystem: () => void;
  
  // Computed Properties
  cartItems: CartItem[];
  subtotalOriginal: number;
  subtotalActive: number;
  totalSavings: number;
  monthlyFinancing: string;
  toastMessage: string | null;
  clearToast: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

export const BundleContext = createContext<BundleContextType | undefined>(undefined);

export const useBundle = (): BundleContextType => {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error('useBundle must be used within a BundleProvider');
  }
  return context;
};
