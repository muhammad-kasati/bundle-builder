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
  const isOnSale = !!product.unitOriginalPrice && product.unitOriginalPrice > product.unitPrice;

  const handleVariantSelect = (variantId: string) => {
    setActiveVariant(product.id, variantId);
  };

  return (
    <div
      className={`relative flex flex-col lg:flex-row 2xl:flex-col bg-white rounded-xl overflow-hidden transition-all duration-200 h-full ${
        isSelected
          ? 'border-2 border-[#4E2FD2] shadow-[0_0_0_3px_rgba(78,47,210,0.08)]'
          : 'border border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      {/* Save Badge — top-left over image */}
      {product.badge && (
        <div className="absolute top-2 left-2 z-10 bg-[#4E2FD2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">
          {product.badge}
        </div>
      )}

      {/* ── Image Area ────────────────────────────────────────────── */}
      {/* Mobile + 2xl → full width, fixed height 140px              */}
      {/* Desktop lg → 42% width, full card height (self-stretch)    */}
      <div
        className="
          w-full h-[140px] shrink-0
          lg:w-[42%] lg:h-auto lg:self-stretch
          2xl:w-full 2xl:h-[140px]
          bg-gray-50 flex items-center justify-center p-3 overflow-hidden
          border-b border-gray-100 lg:border-b-0 lg:border-r 2xl:border-b 2xl:border-r-0
        "
      >
        <ProductImage name={product.image} variantId={activeVariantId} size="100%" />
      </div>

      {/* ── Content Area ────────────────────────────────────────────*/}
      <div className="flex flex-col flex-1 min-w-0 p-3">

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 leading-snug mt-2 lg:mt-0">
          {product.name}
        </h3>

        {/* Description + Learn More */}
        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          {product.description}
          {product.learnMoreUrl && (
            <>
              {' '}
              <a
                href={product.learnMoreUrl}
                onClick={(e) => e.preventDefault()}
                className="text-[#4E2FD2] font-medium underline hover:text-purple-800 transition-colors"
              >
                Learn More
              </a>
            </>
          )}
        </p>

        {/* Variant chips */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {product.variants.map((variant) => {
              const isActive = activeVariantId === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantSelect(variant.id)}
                  className={`flex items-center gap-1 px-1.5 py-[3px] rounded text-[11px] font-medium transition-all ${
                    isActive
                      ? 'border border-[#0AA288] bg-[#E6FAF5] text-[#0AA288]'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300/60 shrink-0"
                    style={{ backgroundColor: variant.colorHex ?? '#FFFFFF' }}
                  />
                  <span>{variant.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Stepper + Price footer ─────────────────────────────── */}
        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-gray-100">

          {/* Stepper */}
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-md">
            <button
              type="button"
              onClick={() => decrementQuantity(product.id, activeVariantId)}
              disabled={currentVariantQuantity === 0}
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors text-sm font-bold select-none ${
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
          <div className="text-right leading-none">
            {product.unitOriginalPrice && (
              <span className="block text-[11px] text-gray-400 line-through mb-0.5">
                ${product.unitOriginalPrice.toFixed(2)}
                {product.isSubscription && <span className="text-[10px]">/mo</span>}
              </span>
            )}
            <span
              className={`text-sm font-bold ${
                product.unitPrice === 0
                  ? 'text-[#4E2FD2]'
                  : isOnSale
                  ? 'text-red-500'
                  : 'text-gray-800'
              }`}
            >
              {product.unitPrice === 0
                ? 'FREE'
                : `$${product.unitPrice.toFixed(2)}`}
              {product.isSubscription && (
                <span className="text-[11px] font-normal text-gray-500">/mo</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
