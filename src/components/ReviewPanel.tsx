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

  const categories: Array<{ id: string; label: string }> = [
    { id: 'CAMERAS',     label: 'CAMERAS' },
    { id: 'SENSORS',     label: 'SENSORS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
    { id: 'PLAN',        label: 'PLAN' }
  ];

  const getItemsByCategory = (cat: string): CartItem[] =>
    cartItems.filter((i) => i.product.category === cat);

  /* ─── Line-item row (shared) ─── */
  const LineItem: React.FC<{ item: CartItem }> = ({ item }) => {
    const variantId    = item.variant?.id ?? 'default';
    const variantLabel = item.variant ? ` (${item.variant.name})` : '';

    return (
      <div className="flex items-center gap-2 py-1.5 border-b border-gray-200/60 last:border-b-0">
        {/* Thumbnail */}
        <div className="w-8 h-8 shrink-0 bg-white rounded-md border border-gray-200 flex items-center justify-center overflow-hidden shadow-xs">
          <ProductImage
            name={item.product.image}
            variantId={item.variant?.id}
            size="100%"
          />
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-gray-900 leading-tight truncate">
            {item.product.name}
            <span className="font-normal text-gray-400 text-[11px]">{variantLabel}</span>
          </p>
          {item.product.isRequired && (
            <p className="text-[10px] text-[#4E2FD2] font-medium leading-none mt-0.5">
              (Required)
            </p>
          )}
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0.5 border border-gray-200 rounded bg-white px-1 py-0.5 shrink-0">
          <button
            type="button"
            onClick={() => decrementQuantity(item.product.id, variantId)}
            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={`Decrease ${item.product.name}`}
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <span className="w-4 text-center text-[12px] font-bold text-gray-900 select-none">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => incrementQuantity(item.product.id, variantId)}
            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={`Increase ${item.product.name}`}
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Price */}
        <div className="text-right shrink-0 min-w-[52px]">
          {item.lineOriginalPrice && (
            <p className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
              ${item.lineOriginalPrice.toFixed(2)}
              {item.product.isSubscription && <span>/mo</span>}
            </p>
          )}
          <p className="text-[12px] font-bold text-[#4E2FD2] leading-none">
            {item.linePrice === 0
              ? 'FREE'
              : `$${item.linePrice.toFixed(2)}`}
            {item.product.isSubscription && (
              <span className="text-[10px] font-normal text-gray-400">/mo</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  /* ─── Checkout column (shared between desktop-sidebar & 2xl-right) ─── */
  const CheckoutBlock: React.FC<{ wideMode?: boolean }> = ({ wideMode = false }) => (
    <div className={wideMode ? 'flex flex-col' : 'flex flex-col'}>
      {/* Guarantee callout (only in 2xl wide mode) */}
      {wideMode && (
        <div className="flex items-start gap-4 mb-6">
          <SatisfactionBadge className="w-16 h-16 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-gray-900">30-day hassle-free returns</h4>
            <p className="text-xs text-gray-500 leading-snug mt-0.5">
              If you're not totally in love with the product, we will refund you 100%.
            </p>
          </div>
        </div>
      )}

      {/* Price block */}
      <div className={`flex ${wideMode ? 'flex-col items-start gap-1' : 'items-center gap-3'} mb-3`}>
        {/* Badge (non-wide uses it inline) */}
        {!wideMode && <SatisfactionBadge className="w-14 h-14 shrink-0" />}

        <div className={wideMode ? 'flex flex-col gap-1 w-full' : 'flex-1'}>
          {/* "as low as" pill */}
          <div className="inline-flex">
            <span className="bg-[#4E2FD2] text-white text-[10px] font-bold px-2 py-0.5 rounded">
              as low as ${monthlyFinancing}/mo
            </span>
          </div>
          {/* Prices */}
          <div className={`flex items-baseline gap-2 ${wideMode ? '' : 'justify-end'}`}>
            <span className="text-sm text-gray-400 line-through font-medium">
              ${subtotalOriginal.toFixed(2)}
            </span>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              ${subtotalActive.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Savings */}
      {totalSavings > 0 && (
        <p className="text-[11px] font-bold text-[#0AA288] text-center mb-3">
          Congrats! You're saving ${totalSavings.toFixed(2)} on your security bundle!
        </p>
      )}

      {/* Checkout button */}
      <button
        type="button"
        onClick={() => setIsCheckoutOpen(true)}
        className="w-full py-3.5 bg-[#4E2FD2] hover:bg-[#3d24ab] text-white font-bold text-base rounded-xl transition-all shadow-md active:scale-[0.98]"
      >
        Checkout
      </button>

      {/* Save + Reset */}
      <div className="flex flex-col items-center gap-1.5 mt-3">
        <button
          type="button"
          onClick={saveSystem}
          className="text-xs font-semibold italic underline text-gray-600 hover:text-purple-700 transition-colors"
        >
          Save my system for later
        </button>
        <button
          type="button"
          onClick={resetSystem}
          className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset default bundle
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EDF4FF] rounded-2xl border border-blue-200/60 shadow-sm overflow-hidden">

      {/*
        Layout:
        - Mobile + lg: single column (items top, checkout below)
        - 2xl: two columns (items left, checkout right)
      */}
      <div className="flex flex-col 2xl:flex-row 2xl:items-start 2xl:gap-0">

        {/* ── LEFT / TOP: Header + Line Items ─────────────────── */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 2xl:p-8">
          {/* Header */}
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
            REVIEW
          </p>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Your security system
          </h2>
          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed mb-4">
            Review your personalized protection system designed to keep what matters most safe.
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-300/50 mb-4" />

          {/* Categorized items */}
          <div className="space-y-3">
            {categories.map((cat) => {
              const items = getItemsByCategory(cat.id);
              if (!items.length) return null;
              return (
                <div key={cat.id}>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                    {cat.label}
                  </p>
                  <div>
                    {items.map((item) => (
                      <LineItem key={item.key} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Fast Shipping */}
            <div className="flex items-center gap-2 py-1.5 border-b border-gray-200/60">
              <div className="w-8 h-8 shrink-0 bg-white rounded-md border border-gray-200 flex items-center justify-center text-[#0AA288]">
                <Truck className="w-4 h-4" />
              </div>
              <span className="flex-1 text-[12px] font-semibold text-gray-900">
                Fast Shipping
              </span>
              <div className="text-right min-w-[52px]">
                <p className="text-[10px] text-gray-400 line-through leading-none mb-0.5">$5.99</p>
                <p className="text-[12px] font-bold text-[#4E2FD2] leading-none">FREE</p>
              </div>
            </div>
          </div>

          {/* Checkout block for non-2xl (below items) */}
          <div className="mt-5 2xl:hidden">
            <CheckoutBlock wideMode={false} />
          </div>
        </div>

        {/* ── RIGHT (2xl only): Checkout column ──────────────── */}
        <div className="hidden 2xl:flex flex-col p-8 w-[400px] shrink-0 border-l border-blue-200/40">
          <CheckoutBlock wideMode={true} />
        </div>
      </div>
    </div>
  );
};
