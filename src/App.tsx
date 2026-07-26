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
    /*
      Page background: white
      Layout:
        Mobile (<1024px):  single column — steps then review panel below
        Desktop (1024-1439px): two columns — steps left ~62%, review right ~38% sticky
        Wide (≥1440px):   single column — steps full-width top, review full-width bottom
    */
    <div className="min-h-screen bg-white text-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-center">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] w-full">

        {/* Mobile-only hero title */}
        <div className="mb-5 lg:hidden text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Let's get started!
          </h1>
        </div>

        {/* Main content grid */}
        <div className="flex flex-col lg:flex-row 2xl:flex-col items-start gap-5 lg:gap-6 2xl:gap-6">

          {/* Accordion steps column */}
          <div className="w-full lg:w-[62%] 2xl:w-full shrink-0">
            <div className="space-y-3">
              {steps.map((step) => {
                const stepProducts = products.filter((p) => p.stepId === step.id);
                return (
                  <AccordionStep key={step.id} step={step} products={stepProducts} />
                );
              })}
            </div>
          </div>

          {/* Review panel column */}
          <div className="w-full lg:w-[38%] 2xl:w-full shrink-0 lg:sticky lg:top-6 2xl:static">
            <ReviewPanel />
          </div>
        </div>
      </div>

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
