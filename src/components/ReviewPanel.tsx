import React from 'react';
import { useBundle } from '../context/BundleContext';
import { ProductImage, SatisfactionBadge } from './ProductImages';
import { Minus, Plus, Truck, RefreshCw } from 'lucide-react';
import type { CartItem } from '../types/bundle';

export const ReviewPanel: React.FC = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    subtotalOriginal,
    subtotalActive,
    totalSavings,
    monthlyFinancing,
    saveSystem,
    resetSystem,
    setIsCheckoutOpen
  } = useBundle();

  // Group cart items by category
  const categories: Array<{ id: string; label: string }> = [
    { id: 'CAMERAS', label: 'CAMERAS' },
    { id: 'SENSORS', label: 'SENSORS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
    { id: 'PLAN', label: 'HOME MONITORING PLAN' }
  ];

  const getItemsByCategory = (category: string): CartItem[] => {
    return cartItems.filter((item) => item.product.category === category);
  };

  return (
    <div className="bg-[#EDF4FF] rounded-2xl p-5 sm:p-6 border border-blue-200/80 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Top Header */}
        <div className="text-[11px] font-bold tracking-widest text-[#484848] uppercase mb-1">
          REVIEW
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Your security system
        </h2>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed border-b border-gray-300/60 pb-4 mb-4">
          Review your personalized protection system designed to keep what matters most safe.
        </p>

        {/* Categorized Line Items */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = getItemsByCategory(cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} className="border-b border-gray-300/50 pb-3">
                <div className="text-[11px] font-bold tracking-wider text-[#A8B2BD] uppercase mb-2">
                  {cat.label}
                </div>
                <div className="space-y-3">
                  {items.map((item) => {
                    const variantId = item.variant?.id || 'default';
                    const variantLabel = item.variant ? ` (${item.variant.name})` : '';

                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-2 py-1 text-sm transition-all"
                      >
                        {/* Left: Thumbnail & Name */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 shrink-0 bg-white rounded-lg p-1 border border-gray-200 shadow-xs flex items-center justify-center overflow-hidden">
                            <ProductImage
                              name={item.product.image}
                              variantId={item.variant?.id}
                              size="100%"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-gray-900 truncate block text-xs sm:text-sm">
                              {item.product.name}
                              <span className="font-normal text-gray-500 text-xs">{variantLabel}</span>
                              {item.product.isRequired && (
                                <span className="block text-[10px] font-medium text-purple-600">
                                  (Required)
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Stepper */}
                        <div className="flex items-center gap-1.5 bg-white px-1.5 py-1 rounded border border-gray-200 shrink-0 shadow-xs">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.product.id, variantId)}
                            className="w-4 h-4 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                            aria-label={`Decrease ${item.product.name}`}
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-4 text-center font-bold text-xs text-gray-900 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.product.id, variantId)}
                            className="w-4 h-4 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                            aria-label={`Increase ${item.product.name}`}
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Right: Price */}
                        <div className="text-right shrink-0 min-w-[55px]">
                          {item.unitOriginalPrice && item.lineOriginalPrice && (
                            <span className="block text-[11px] text-gray-500 line-through leading-none">
                              ${item.lineOriginalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-bold text-[#4E2FD2]">
                            {item.linePrice === 0 ? 'FREE' : `$${item.linePrice.toFixed(2)}`}
                            {item.product.isSubscription && (
                              <span className="text-[10px] font-normal text-gray-500">/mo</span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Fast Shipping Row */}
          <div className="flex items-center justify-between py-2 border-b border-gray-300/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 bg-white rounded-lg p-1 border border-gray-200 shadow-xs flex items-center justify-center text-[#0AA288]">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-900 text-xs sm:text-sm">Fast Shipping</span>
            </div>
            <div className="text-right">
              <span className="block text-[11px] text-gray-500 line-through leading-none">$5.99</span>
              <span className="text-xs sm:text-sm font-bold text-[#4E2FD2]">FREE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary & Checkout Footer */}
      <div className="mt-6 pt-4 border-t border-gray-300/60">
        {/* Guarantee & Financing Bar */}
        <div className="flex items-center justify-between gap-2 mb-4 bg-white/70 p-3 rounded-xl border border-blue-100 shadow-xs">
          <SatisfactionBadge className="w-14 h-14 shrink-0" />
          <div className="text-right flex flex-col items-end">
            <div className="bg-[#4E2FD2] text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs mb-1">
              as low as ${monthlyFinancing}/mo
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500 line-through">
                ${subtotalOriginal.toFixed(2)}
              </span>
              <span className="text-2xl font-black text-[#4E2FD2] tracking-tight">
                ${subtotalActive.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings Callout */}
        {totalSavings > 0 && (
          <p className="text-center text-xs font-bold text-[#0AA288] mb-3">
            Congrats! You're saving ${totalSavings.toFixed(2)} on your security bundle!
          </p>
        )}

        {/* Checkout Button */}
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full py-3.5 px-4 bg-[#4E2FD2] hover:bg-[#3d24ab] text-white font-bold text-base rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
        >
          Checkout
        </button>

        {/* Save My System For Later Link & Reset option */}
        <div className="flex flex-col items-center gap-2 mt-3 text-center">
          <button
            type="button"
            onClick={saveSystem}
            className="text-xs font-semibold italic underline text-gray-700 hover:text-purple-700 transition-colors"
          >
            Save my system for later
          </button>
          <button
            type="button"
            onClick={resetSystem}
            className="text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset default bundle
          </button>
        </div>
      </div>
    </div>
  );
};
