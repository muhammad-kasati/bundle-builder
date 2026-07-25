import React from 'react';
import { BundleProvider } from './context/BundleProvider';
import { useBundle } from './context/BundleContext';
import { AccordionStep } from './components/AccordionStep';
import { ReviewPanel } from './components/ReviewPanel';
import { Toast } from './components/Toast';
import { CheckoutModal } from './components/CheckoutModal';

const BundleBuilderContent: React.FC = () => {
  const { steps, products } = useBundle();

  return (
    <div className="min-h-screen bg-white text-gray-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-12 flex justify-center">
      <div className="max-w-[1240px] w-full">
        {/* Mobile Header Title (as shown in Figma Mobile) */}
        <div className="mb-4 lg:hidden">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Let's get started!
          </h1>
        </div>

        {/* 2-Column Layout matching Figma Desktop (Frame 1735) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          {/* Left Column: Vertical 4-Step Accordion Builder (Frame 8234) */}
          <div className="w-full lg:w-[768px] shrink-0">
            <div className="space-y-4">
              {steps.map((step) => {
                const stepProducts = products.filter((p) => p.stepId === step.id);
                return (
                  <AccordionStep key={step.id} step={step} products={stepProducts} />
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Review Panel (Frame 1736) */}
          <div className="w-full lg:w-[399px] shrink-0 lg:sticky lg:top-8">
            <ReviewPanel />
          </div>
        </div>
      </div>

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
