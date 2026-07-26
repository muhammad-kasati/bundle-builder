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
    <div className="min-h-screen bg-white text-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-center">
      <div className="max-w-[1240px] 2xl:max-w-[1440px] w-full">
        {/* Mobile Header Title (as shown in Figma Mobile) */}
        <div className="mb-4 lg:hidden">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Let's get started!
          </h1>
        </div>

        {/* Responsive Grid Layout:
            - Mobile (<1024px): 1 column stacked (Steps then Review)
            - Desktop (1024px - 1439px): 2 columns (Steps on left ~65%, Review Sidebar on right ~35%)
            - Wide Desktop (1440px+): 1 column layout (Steps on top with 5-col grid, Review Panel full-width on bottom)
        */}
        <div className="flex flex-col lg:flex-row 2xl:flex-col items-start gap-6 lg:gap-8 2xl:gap-8">
          {/* Left Column / Top Section: Vertical 4-Step Accordion Builder */}
          <div className="w-full lg:w-[62%] 2xl:w-full shrink-0">
            <div className="space-y-4">
              {steps.map((step) => {
                const stepProducts = products.filter((p) => p.stepId === step.id);
                return (
                  <AccordionStep key={step.id} step={step} products={stepProducts} />
                );
              })}
            </div>
          </div>

          {/* Right Column / Bottom Section: Live Review Panel */}
          <div className="w-full lg:w-[38%] 2xl:w-full shrink-0 lg:sticky lg:top-6 2xl:static">
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
