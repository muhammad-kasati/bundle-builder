import React from 'react';
import type { Step, Product } from '../types/bundle';
import { useBundle } from '../context/BundleContext';
import { ProductCard } from './ProductCard';
import { Camera, ShieldCheck, Radio, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionStepProps {
  step: Step;
  products: Product[];
}

export const AccordionStep: React.FC<AccordionStepProps> = ({ step, products }) => {
  const { expandedStepId, toggleStep, setExpandedStepId, getStepSelectedCount, steps } = useBundle();

  const isExpanded = expandedStepId === step.id;
  const selectedCount = getStepSelectedCount(step.id);

  // Get next step for "Next: ..." button
  const currentStepIndex = steps.findIndex((s) => s.id === step.id);
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

  const handleNextStep = () => {
    if (nextStep) {
      setExpandedStepId(nextStep.id);
    } else {
      setExpandedStepId(null);
    }
  };

  const getStepIcon = (iconName: Step['iconName']) => {
    switch (iconName) {
      case 'camera':
        return <Camera className="w-5 h-5 text-gray-700" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-gray-700" />;
      case 'sensor':
        return <Radio className="w-5 h-5 text-gray-700" />;
      case 'protection':
        return <Shield className="w-5 h-5 text-gray-700" />;
      default:
        return <Camera className="w-5 h-5 text-gray-700" />;
    }
  };

  return (
    <div className="bg-[#EDF4FF] rounded-xl overflow-hidden mb-4 border border-blue-100 shadow-xs transition-all duration-300">
      {/* Step Number Bar */}
      <div className="px-4 sm:px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold tracking-widest text-[#484848] uppercase">
        <span>STEP {step.stepNumber} OF 4</span>
      </div>

      {/* Main Accordion Header */}
      <button
        type="button"
        onClick={() => toggleStep(step.id)}
        className="w-full px-4 sm:px-6 py-3 flex items-center justify-between hover:bg-blue-100/50 transition-colors text-left border-t border-gray-900/10 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/80 rounded-lg shadow-xs">{getStepIcon(step.iconName)}</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{step.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-[#4E2FD2] bg-white/90 px-2.5 py-1 rounded-full border border-purple-200 shadow-xs">
            {selectedCount} selected
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#4E2FD2]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-blue-200/60 bg-blue-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Next Button Footer */}
          {step.nextStepTitle && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-white border-2 border-[#4E2FD2] text-[#4E2FD2] hover:bg-[#4E2FD2] hover:text-white font-semibold text-sm rounded-lg transition-all shadow-xs active:scale-95"
              >
                Next: {step.nextStepTitle}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
