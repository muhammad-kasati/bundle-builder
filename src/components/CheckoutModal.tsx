import React from 'react';
import { useBundle } from '../context/BundleContext';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, subtotalActive, subtotalOriginal, totalSavings } = useBundle();

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-50 text-[#4E2FD2] rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
            <p className="text-xs text-gray-500">Prototype checkout preview</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.key} className="flex justify-between items-center text-sm py-1 border-b border-gray-200/60 last:border-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#4E2FD2] text-xs bg-purple-100 px-2 py-0.5 rounded">
                  x{item.quantity}
                </span>
                <span className="font-medium text-gray-800">
                  {item.product.name} {item.variant ? `(${item.variant.name})` : ''}
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                {item.linePrice === 0 ? 'FREE' : `$${item.linePrice.toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Pre-discount total:</span>
            <span className="line-through">${subtotalOriginal.toFixed(2)}</span>
          </div>
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm font-semibold text-[#0AA288]">
              <span>Bundle Discount Savings:</span>
              <span>-${totalSavings.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-100">
            <span>Total:</span>
            <span className="text-[#4E2FD2]">${subtotalActive.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-5 flex items-center gap-2.5 text-emerald-800 text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your system configuration is verified and ready for production fulfillment!</span>
        </div>

        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="w-full py-3 bg-[#4E2FD2] hover:bg-[#3d24ab] text-white font-bold rounded-xl transition-all shadow-md"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};
