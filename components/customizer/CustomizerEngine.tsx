'use client';

import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { ChickenVisualizer } from './ChickenVisualizer';
import { StepChicken } from './StepChicken';
import { StepCrunch } from './StepCrunch';
import { StepFlavour } from './StepFlavour';
import { StepSpice } from './StepSpice';
import { StepSauce } from './StepSauce';
import { StepMeal } from './StepMeal';
import { CreationSummaryCard } from './CreationSummaryCard';
import { CreationRevealModal } from './CreationRevealModal';
import { AutoCraftSimulator } from './AutoCraftSimulator';
import { formatPrice } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';

export function CustomizerEngine() {
  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    priceBreakdown,
    resetCustomizer,
    openRevealModal,
  } = useCustomizer();

  const steps = [
    { num: 1, title: 'CHICKEN', shortTitle: 'CUT' },
    { num: 2, title: 'CRUNCH', shortTitle: 'CRUNCH' },
    { num: 3, title: 'FLAVOUR', shortTitle: 'FLAVOUR' },
    { num: 4, title: 'SPICE', shortTitle: 'SPICE' },
    { num: 5, title: 'SAUCE', shortTitle: 'SAUCE' },
    { num: 6, title: 'MEAL & NAME', shortTitle: 'FEAST' },
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepChicken />;
      case 2:
        return <StepCrunch />;
      case 3:
        return <StepFlavour />;
      case 4:
        return <StepSpice />;
      case 5:
        return <StepSauce />;
      case 6:
        return <StepMeal />;
      default:
        return <StepChicken />;
    }
  };

  const isFinalStep = currentStep === 6;

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header & Progress Stepper */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ffc-cardBorder/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black bg-ffc-gold/15 px-2.5 py-0.5 rounded-full border border-ffc-gold/40">
                INTERACTIVE LAB
              </span>
              <span className="text-xs text-ffc-smoke font-mono">
                YOU CREATE IT. WE FRY IT.
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mt-1">
              MAKE YOUR CHICKEN
            </h1>
          </div>

          {/* Action Tools: AI Auto-Craft Simulator + Quick Reset */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <AutoCraftSimulator />

            <button
              type="button"
              onClick={resetCustomizer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-xs font-mono text-ffc-smoke hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-3 mt-4">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`flex flex-col text-left transition-all p-1.5 sm:p-2.5 rounded-xl border ${
                  isCurrent
                    ? 'bg-ffc-surface border-ffc-gold shadow-gold'
                    : isCompleted
                    ? 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/40'
                    : 'bg-ffc-card/40 border-white/5 opacity-50 hover:opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] sm:text-[11px] font-mono font-bold ${
                      isCurrent ? 'text-ffc-gold' : isCompleted ? 'text-emerald-400' : 'text-ffc-smoke'
                    }`}
                  >
                    0{s.num}
                  </span>
                  {isCompleted && (
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3] hidden sm:block" />
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-black font-display uppercase tracking-tight truncate mt-0.5 ${
                    isCurrent ? 'text-white' : 'text-ffc-cream/70'
                  }`}
                >
                  <span className="sm:hidden">{s.shortTitle}</span>
                  <span className="hidden sm:inline">{s.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Column Desktop Layout / Stacked Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start my-auto">
        {/* Left Column: Interactive Step Controls (5 cols on lg) */}
        <div className="lg:col-span-5 order-2 lg:order-1 bg-ffc-charcoal/60 rounded-3xl p-4 sm:p-6 border border-ffc-cardBorder/80 backdrop-blur-sm">
          {renderCurrentStep()}
        </div>

        {/* Center Column: Live Dynamic Reactive Chicken Canvas (4 cols on lg) */}
        <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center sticky top-24">
          <ChickenVisualizer interactiveTilt={true} />
        </div>

        {/* Right Column: Dynamic Price Breakdown Ticket (3 cols on lg) */}
        <div className="lg:col-span-3 order-3 hidden lg:block h-full">
          <CreationSummaryCard />
        </div>
      </div>

      {/* Bottom Desktop Navigation Bar */}
      <div className="hidden lg:flex items-center justify-between pt-6 border-t border-ffc-cardBorder/60 mt-8">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-sm font-black font-display uppercase tracking-wider text-ffc-cream disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          PREVIOUS STEP
        </button>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-ffc-smoke block">
              ESTIMATED TOTAL
            </span>
            <span className="text-xl font-black font-display text-ffc-gold">
              {formatPrice(priceBreakdown.subtotal)}
            </span>
          </div>

          {isFinalStep ? (
            <button
              type="button"
              onClick={openRevealModal}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              FINISH & REVEAL CREATION
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-sm uppercase tracking-wider shadow-gold hover:shadow-lg active:scale-[0.98] transition-all"
            >
              NEXT STEP (0{currentStep + 1})
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ffc-surface/95 backdrop-blur-xl border-t border-ffc-cardBorder p-3.5 flex items-center justify-between gap-3 shadow-2xl">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={prevStep}
          className="p-3 rounded-xl bg-ffc-card border border-ffc-cardBorder text-ffc-cream disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="flex-1 text-center">
          <span className="text-[10px] font-mono uppercase text-ffc-smoke block">TOTAL</span>
          <span className="text-base font-black font-display text-ffc-gold block leading-tight">
            {formatPrice(priceBreakdown.subtotal)}
          </span>
        </div>

        {isFinalStep ? (
          <button
            type="button"
            onClick={openRevealModal}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-ffc-red to-ffc-gold text-white font-black font-display text-xs uppercase tracking-wider shadow-fire flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            REVEAL
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            className="flex-1 py-3 px-4 rounded-xl bg-ffc-gold text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold flex items-center justify-center gap-1.5"
          >
            NEXT (0{currentStep + 1})
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        )}
      </div>

      {/* Reveal Modal Component */}
      <CreationRevealModal />
    </section>
  );
}
