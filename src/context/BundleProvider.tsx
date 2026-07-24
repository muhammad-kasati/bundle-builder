import React, { useState, useMemo } from 'react';
import type { Product, Step, CartItem, QuantitiesState, ActiveVariantsState } from '../types/bundle';
import { BundleContext } from './BundleContext';
import data from '../data/products.json';

const STORAGE_KEY = 'wyze_bundle_system_v1';

export const BundleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const steps: Step[] = data.steps as Step[];
  const products: Product[] = data.products as Product[];

  // Helper to load stored or initial state
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.quantities && parsed.activeVariants) {
          return {
            quantities: parsed.quantities as QuantitiesState,
            activeVariants: parsed.activeVariants as ActiveVariantsState,
            expandedStepId: parsed.expandedStepId ?? 'step-1'
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved bundle state from localStorage', e);
    }
    return {
      quantities: data.initialState.quantities as QuantitiesState,
      activeVariants: data.initialState.activeVariants as ActiveVariantsState,
      expandedStepId: 'step-1'
    };
  };

  const initialData = getInitialState();
  const [quantities, setQuantities] = useState<QuantitiesState>(initialData.quantities);
  const [activeVariants, setActiveVariantsState] = useState<ActiveVariantsState>(initialData.activeVariants);
  const [expandedStepId, setExpandedStepId] = useState<string | null>(initialData.expandedStepId);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Helper to construct key
  const buildKey = (productId: string, variantId?: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return `${productId}_default`;
    if (!product.variants || product.variants.length === 0) {
      return `${productId}_default`;
    }
    const resolvedVariant = variantId || activeVariants[productId] || product.variants[0].id;
    return `${productId}_${resolvedVariant}`;
  };

  const getActiveVariant = (productId: string): string => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.variants || product.variants.length === 0) return 'default';
    return activeVariants[productId] || product.variants[0].id;
  };

  const getQuantity = (productId: string, variantId?: string): number => {
    const key = buildKey(productId, variantId);
    return quantities[key] || 0;
  };

  const getProductTotalQuantity = (productId: string): number => {
    const product = products.find((p) => p.id === productId);
    if (!product) return 0;
    if (!product.variants || product.variants.length === 0) {
      return quantities[`${productId}_default`] || 0;
    }
    return product.variants.reduce((sum, v) => {
      return sum + (quantities[`${productId}_${v.id}`] || 0);
    }, 0);
  };

  const setQuantity = (productId: string, variantId: string, count: number) => {
    const safeCount = Math.max(0, count);
    const key = `${productId}_${variantId}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: safeCount
    }));
  };

  const incrementQuantity = (productId: string, variantId: string) => {
    const current = getQuantity(productId, variantId);
    setQuantity(productId, variantId, current + 1);
  };

  const decrementQuantity = (productId: string, variantId: string) => {
    const current = getQuantity(productId, variantId);
    if (current > 0) {
      setQuantity(productId, variantId, current - 1);
    }
  };

  const setActiveVariant = (productId: string, variantId: string) => {
    setActiveVariantsState((prev) => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const toggleStep = (stepId: string) => {
    setExpandedStepId((prev) => (prev === stepId ? null : stepId));
  };

  const getStepSelectedCount = (stepId: string): number => {
    const stepProducts = products.filter((p) => p.stepId === stepId);
    let selectedCount = 0;
    stepProducts.forEach((p) => {
      if (getProductTotalQuantity(p.id) > 0) {
        selectedCount++;
      }
    });
    return selectedCount;
  };

  const saveSystem = () => {
    try {
      const payload = {
        quantities,
        activeVariants,
        expandedStepId,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setToastMessage('System configuration saved successfully!');
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      setToastMessage('Failed to save configuration.');
    }
  };

  const resetSystem = () => {
    setQuantities(data.initialState.quantities as QuantitiesState);
    setActiveVariantsState(data.initialState.activeVariants as ActiveVariantsState);
    setExpandedStepId('step-1');
    localStorage.removeItem(STORAGE_KEY);
    setToastMessage('Reset system to default bundle.');
  };

  const clearToast = () => setToastMessage(null);

  // Compute Cart Items & Prices
  const cartItems: CartItem[] = useMemo(() => {
    const items: CartItem[] = [];
    products.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          const key = `${product.id}_${variant.id}`;
          const qty = quantities[key] || 0;
          if (qty > 0) {
            const unitOrig = product.unitOriginalPrice ?? product.unitPrice;
            items.push({
              key,
              product,
              variant,
              quantity: qty,
              unitOriginalPrice: unitOrig,
              unitPrice: product.unitPrice,
              lineOriginalPrice: unitOrig * qty,
              linePrice: product.unitPrice * qty
            });
          }
        });
      } else {
        const key = `${product.id}_default`;
        const qty = quantities[key] || 0;
        if (qty > 0) {
          const unitOrig = product.unitOriginalPrice ?? product.unitPrice;
          items.push({
            key,
            product,
            quantity: qty,
            unitOriginalPrice: unitOrig,
            unitPrice: product.unitPrice,
            lineOriginalPrice: unitOrig * qty,
            linePrice: product.unitPrice * qty
          });
        }
      }
    });
    return items;
  }, [quantities, products]);

  // Pricing Summary Totals
  const { subtotalOriginal, subtotalActive, totalSavings, monthlyFinancing } = useMemo(() => {
    let origSum = 0;
    let activeSum = 0;

    cartItems.forEach((item) => {
      origSum += item.lineOriginalPrice ?? item.linePrice;
      activeSum += item.linePrice;
    });

    // Add Fast Shipping original price ($5.99) vs active ($0.00 FREE)
    origSum += 5.99;

    const savings = Math.max(0, origSum - activeSum);
    const financing = (activeSum / 10).toFixed(2);

    return {
      subtotalOriginal: origSum,
      subtotalActive: activeSum,
      totalSavings: savings,
      monthlyFinancing: financing
    };
  }, [cartItems]);

  return (
    <BundleContext.Provider
      value={{
        steps,
        products,
        quantities,
        activeVariants,
        expandedStepId,
        getQuantity,
        getProductTotalQuantity,
        getActiveVariant,
        setQuantity,
        incrementQuantity,
        decrementQuantity,
        setActiveVariant,
        toggleStep,
        setExpandedStepId,
        getStepSelectedCount,
        saveSystem,
        resetSystem,
        cartItems,
        subtotalOriginal,
        subtotalActive,
        totalSavings,
        monthlyFinancing,
        toastMessage,
        clearToast,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};
