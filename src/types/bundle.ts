export interface Variant {
  id: string;
  name: string;
  colorHex?: string;
  colorSwatchBg?: string;
  image?: string;
}

export interface Product {
  id: string;
  stepId: string;
  category: 'CAMERAS' | 'SENSORS' | 'ACCESSORIES' | 'PLAN';
  name: string;
  description: string;
  learnMoreUrl?: string;
  badge?: string;
  unitOriginalPrice?: number;
  unitPrice: number;
  isSubscription?: boolean;
  isRequired?: boolean;
  variants?: Variant[];
  image: string;
}

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  iconName: 'camera' | 'shield' | 'sensor' | 'protection';
  nextStepTitle?: string;
}

export interface CartItem {
  key: string;
  product: Product;
  variant?: Variant;
  quantity: number;
  unitOriginalPrice?: number;
  unitPrice: number;
  lineOriginalPrice?: number;
  linePrice: number;
}

export interface QuantitiesState {
  [productVariantKey: string]: number;
}

export interface ActiveVariantsState {
  [productId: string]: string;
}
