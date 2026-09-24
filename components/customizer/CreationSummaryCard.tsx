'use client';

import React from 'react';
import { useCustomizer } from '@/context/CustomizerContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Flame, ShoppingBag, Sparkles } from 'lucide-react';

export function CreationSummaryCard() {
  const {
    currentStep,
    chicken,
    crunch,
    flavour,
    spice,
    sauce,
    saucePlacement,
    selectedSides,
    selectedDrink,
    selectedExtraDip,
    selectedDessert,
    priceBreakdown,
    badges,
    nextStep,
    openRevealModal,
  } = useCustomizer();

  const isFinalStep = currentStep === 6;

  return (
    <div className="bg-ffc-surface border border-ffc-cardBorder rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-ffc-cardBorder/60">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ffc-gold block">
              LIVE CONFIGURATION
            </span>
            <h3 className="text-base sm:text-lg font-black font-display text-white uppercase tracking-tight">
              RECIPE SPECS
            </h3>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {badges.map((b) => (
              <span
                key={b}
                className="text-[9px] font-mono font-bold bg-ffc-card px-2 py-0.5 rounded-full border border-ffc-cardBorder text-ffc-gold"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="py-4 space-y-2.5 text-xs font-sans">
          {/* Base Chicken */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-ffc-smoke font-mono">01</span>
              <span className="text-white font-medium">{chicken.name}</span>
            </div>
            <span className="font-mono text-ffc-cream">{formatPrice(chicken.basePrice)}</span>
          </div>

          {/* Crunch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-ffc-smoke font-mono">02</span>
              <span className="text-white font-medium">{crunch.name}</span>
            </div>
            <span className="font-mono text-ffc-cream">
              {crunch.priceModifier > 0 ? `+${formatPrice(crunch.priceModifier)}` : '₹0'}
            </span>
          </div>

          {/* Flavour */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-ffc-smoke font-mono">03</span>
              <span className="text-white font-medium">{flavour.name}</span>
            </div>
            <span className="font-mono text-ffc-cream">
              {flavour.priceModifier > 0 ? `+${formatPrice(flavour.priceModifier)}` : '₹0'}
            </span>
          </div>

          {/* Spice Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-ffc-smoke font-mono">04</span>
              <span
                className={`font-medium flex items-center gap-1 ${
                  spice.level === 5 ? 'text-ffc-red font-bold' : 'text-white'
                }`}
              >
                L0{spice.level}: {spice.name}
                {spice.level === 5 && <Flame className="w-3 h-3 fill-ffc-red text-ffc-red" />}
              </span>
            </div>
            <span className="font-mono text-ffc-cream">
              {spice.priceModifier > 0 ? `+${formatPrice(spice.priceModifier)}` : '₹0'}
            </span>
          </div>

          {/* Sauce & Style */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-ffc-smoke font-mono">05</span>
              <span className="text-white font-medium truncate max-w-[150px]">
                {sauce.name} ({saucePlacement === 'drizzled' ? 'Top' : 'Side'})
              </span>
            </div>
            <span className="font-mono text-ffc-cream">
              {sauce.priceModifier > 0 ? `+${formatPrice(sauce.priceModifier)}` : '₹0'}
            </span>
          </div>

          {/* Sides */}
          {selectedSides.map((side) => (
            <div key={side.id} className="flex items-center justify-between text-ffc-cream/80 pl-4">
              <span className="truncate max-w-[150px]">+ {side.name}</span>
              <span className="font-mono">{formatPrice(side.price)}</span>
            </div>
          ))}

          {/* Drink */}
          {selectedDrink && (
            <div className="flex items-center justify-between text-ffc-cream/80 pl-4">
              <span className="truncate max-w-[150px]">+ {selectedDrink.name}</span>
              <span className="font-mono">{formatPrice(selectedDrink.price)}</span>
            </div>
          )}

          {/* Extra Dip */}
          {selectedExtraDip && (
            <div className="flex items-center justify-between text-ffc-cream/80 pl-4">
              <span className="truncate max-w-[150px]">+ {selectedExtraDip.name}</span>
              <span className="font-mono">{formatPrice(selectedExtraDip.price)}</span>
            </div>
          )}

          {/* Dessert */}
          {selectedDessert && (
            <div className="flex items-center justify-between text-ffc-cream/80 pl-4">
              <span className="truncate max-w-[150px]">+ {selectedDessert.name}</span>
              <span className="font-mono">{formatPrice(selectedDessert.price)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Total & Action */}
      <div className="pt-4 border-t border-ffc-cardBorder/60 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-ffc-smoke block">
              TOTAL PRICE {priceBreakdown.quantity > 1 ? `(${priceBreakdown.quantity}x)` : ''}
            </span>
            <span className="text-2xl sm:text-3xl font-black font-display text-ffc-gold tracking-tight">
              {formatPrice(priceBreakdown.subtotal)}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            FRESH TO ORDER
          </span>
        </div>

        {isFinalStep ? (
          <button
            type="button"
            onClick={openRevealModal}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            FINISH & REVEAL CREATION
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            className="w-full py-3.5 px-4 rounded-2xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-sm uppercase tracking-wider shadow-gold hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            NEXT STEP
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
}
