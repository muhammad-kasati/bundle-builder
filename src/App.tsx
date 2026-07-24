import React from 'react';
import { BundleProvider } from './context/BundleProvider';
import { useBundle } from './context/BundleContext';
import { AccordionStep } from './components/AccordionStep';
import { ReviewPanel } from './components/ReviewPanel';
import { Toast } from './components/Toast';
import { CheckoutModal } from './components/CheckoutModal';
import { Shield, Sparkles } from 'lucide-react';

const BundleBuilderContent: React.FC = () => {
  const { steps, products } = useBundle();

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-gray-900 pb-16">
      {/* App Header */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#4E2FD2] rounded-xl flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-[#4E2FD2] text-lg">WYZE</span>
                <span className="text-xs font-semibold text-gray-500 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                  BUNDLE BUILDER
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">
                Build your personalized security system & save up to 25%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0AA288] bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Instant Bundle Discounts Applied</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Mobile Welcome Title */}
        <div className="mb-6 lg:hidden">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Let's get started!
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Configure your custom security bundle below.
          </p>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Column: 4-Step Accordion Builder */}
          <div className="w-full lg:w-[62%] shrink-0">
            <div className="hidden lg:block mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Build Your Security Bundle
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Follow the 4 steps below to customize cameras, monitoring, sensors, and accessories.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => {
                const stepProducts = products.filter((p) => p.stepId === step.id);
                return (
                  <AccordionStep key={step.id} step={step} products={stepProducts} />
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Review Panel */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-20">
            <ReviewPanel />
          </div>
        </div>
      </main>

      {/* Feedback Toast & Checkout Modal */}
      <Toast />
      <CheckoutModal />
    </div>
  );
};

export function App() {
  return (
    <BundleProvider>
      <BundleBuilderContent />
    </BundleProvider>
  );
}

export default App;
