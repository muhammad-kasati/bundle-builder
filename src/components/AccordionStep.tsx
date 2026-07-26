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

  const currentStepIndex = steps.findIndex((s) => s.id === step.id);
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

  const handleNextStep = () => {
    if (nextStep) setExpandedStepId(nextStep.id);
    else setExpandedStepId(null);
  };

  const getStepIcon = (iconName: Step['iconName']) => {
    const cls = 'w-5 h-5 text-gray-600';
    switch (iconName) {
      case 'camera':     return <Camera className={cls} />;
      case 'shield':     return <ShieldCheck className={cls} />;
      case 'sensor':     return <Radio className={cls} />;
      case 'protection': return <Shield className={cls} />;
      default:           return <Camera className={cls} />;
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isExpanded
          ? 'bg-[#EDF4FF] border border-blue-200/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* ── Step label row ────────────────────────── */}
      <div className="px-4 sm:px-6 pt-3">
        <span className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">
          STEP {step.stepNumber} OF 4
        </span>
      </div>

      {/* ── Divider ───────────────────────────────── */}
      <div className={`h-px mt-2 ${isExpanded ? 'bg-blue-200/50' : 'bg-gray-200'}`} />

      {/* ── Accordion header button ───────────────── */}
      <button
        type="button"
        onClick={() => toggleStep(step.id)}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-black/[0.03] transition-colors text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-lg shrink-0 ${
              isExpanded ? 'bg-white shadow-xs' : 'bg-gray-100'
            }`}
          >
            {getStepIcon(step.iconName)}
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {step.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selectedCount > 0 && (
            <span className="text-sm font-semibold text-[#4E2FD2]">
              {selectedCount} selected
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#4E2FD2]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* ── Expanded content ─────────────────────── */}
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-6">
          {/*
            Grid layout:
            - Mobile (default):  1 col, vertical cards
            - Desktop lg-xl:     2 cols, horizontal cards
            - Wide 2xl:          5 cols, vertical cards
            Odd last card → center it on sm-xl, natural on 2xl
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-3">
            {products.map((product, index) => {
              const isLastOdd =
                products.length % 2 !== 0 && index === products.length - 1;
              return (
                <div
                  key={product.id}
                  className={
                    isLastOdd
                      ? 'sm:col-span-2 2xl:col-span-1 sm:w-1/2 2xl:w-full mx-auto'
                      : ''
                  }
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          {/* Next step button */}
          {step.nextStepTitle && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleNextStep}
                className="
                  px-8 py-2.5
                  bg-white border-2 border-[#4E2FD2] text-[#4E2FD2]
                  hover:bg-[#4E2FD2] hover:text-white
                  font-semibold text-sm rounded-lg
                  transition-all duration-150 shadow-xs active:scale-95
                "
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
