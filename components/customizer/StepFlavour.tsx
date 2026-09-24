'use client';

import React from 'react';
import { FLAVOUR_OPTIONS } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { Check, Flame } from 'lucide-react';

export function StepFlavour() {
  const { flavour, setFlavour } = useCustomizer();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 03 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          CHOOSE YOUR FLAVOUR PROFILE
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          Pick your artisan glaze, dry rub, or seasoning power-up.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {FLAVOUR_OPTIONS.map((item) => {
          const isSelected = flavour.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setFlavour(item)}
              data-cursor="pointer"
              data-cursor-label="FLAVOUR"
              className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                  : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/50 hover:bg-ffc-card'
              }`}
            >
              {/* Color Accent Pill */}
              <div
                style={{ backgroundColor: item.color }}
                className="absolute top-0 right-0 w-24 h-1 rounded-bl-full"
              />

              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h3 className="text-sm font-black font-display uppercase tracking-tight text-white">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono text-ffc-orange font-bold block">
                        {item.tagline}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-ffc-cream/65 mt-2 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono text-ffc-smoke mr-1">HEAT:</span>
                  {[...Array(5)].map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-3 h-3 ${
                        i < item.heat ? 'text-ffc-orange fill-ffc-orange' : 'text-white/10'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-ffc-cream">
                  {item.priceModifier > 0 ? `+${formatPrice(item.priceModifier)}` : 'INCLUDED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
