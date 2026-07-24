import React from 'react';
import type { Product } from '../types/bundle';
import { useBundle } from '../context/BundleContext';
import { ProductImage } from './ProductImages';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    getQuantity,
    getProductTotalQuantity,
    getActiveVariant,
    incrementQuantity,
    decrementQuantity,
    setActiveVariant
  } = useBundle();

  const activeVariantId = getActiveVariant(product.id);
  const currentVariantQuantity = getQuantity(product.id, activeVariantId);
  const totalProductQuantity = getProductTotalQuantity(product.id);
  const isSelected = totalProductQuantity > 0;

  const handleVariantSelect = (variantId: string) => {
    setActiveVariant(product.id, variantId);
  };

  return (
    <div
      className={`relative flex flex-col sm:flex-row items-stretch p-3 sm:p-4 gap-3 sm:gap-4 rounded-xl transition-all duration-200 bg-white ${
        isSelected
          ? 'border-2 border-[#4E2FD2] shadow-sm ring-1 ring-[#4E2FD2]/20'
          : 'border border-gray-200 hover:border-gray-300 shadow-xs'
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-2 left-2 z-10 bg-[#4E2FD2] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full sm:w-28 h-28 sm:h-32 shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
        <ProductImage name={product.image} variantId={activeVariantId} size="100%" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 leading-snug tracking-wide">
            {product.name}
          </h3>

          {/* Description & Learn More */}
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {product.description}{' '}
            {product.learnMoreUrl && (
              <a
                href={product.learnMoreUrl}
                onClick={(e) => e.preventDefault()}
                className="text-[#4E2FD2] font-medium underline hover:text-purple-800 transition-colors inline-block ml-0.5"
              >
                Learn More
              </a>
            )}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {product.variants.map((variant) => {
                const isActive = activeVariantId === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => handleVariantSelect(variant.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
                      isActive
                        ? 'border border-[#0AA288] bg-[#1DF0BB]/10 text-[#0AA288] font-semibold shadow-xs'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-gray-300 shrink-0 shadow-xs"
                      style={{ backgroundColor: variant.colorHex || '#FFFFFF' }}
                    />
                    <span>{variant.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pricing & Stepper Footer */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          {/* Stepper */}
          <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-md">
            <button
              type="button"
              onClick={() => decrementQuantity(product.id, activeVariantId)}
              disabled={currentVariantQuantity === 0}
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                currentVariantQuantity === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-200 shadow-xs active:scale-95'
              }`}
              aria-label={`Decrease quantity of ${product.name}`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-gray-900 select-none">
              {currentVariantQuantity}
            </span>
            <button
              type="button"
              onClick={() => incrementQuantity(product.id, activeVariantId)}
              className="w-6 h-6 rounded bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center shadow-xs transition-all active:scale-95"
              aria-label={`Increase quantity of ${product.name}`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Pricing */}
          <div className="text-right">
            {product.unitOriginalPrice && (
              <span className="block text-xs text-gray-400 line-through leading-none">
                ${product.unitOriginalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-sm font-bold text-[#4E2FD2]">
              {product.unitPrice === 0 ? 'FREE' : `$${product.unitPrice.toFixed(2)}`}
              {product.isSubscription && <span className="text-xs font-normal text-gray-500">/mo</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
