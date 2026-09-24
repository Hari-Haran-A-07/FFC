'use client';

import React from 'react';
import { CRUNCH_OPTIONS } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

export function StepCrunch() {
  const { crunch, setCrunch } = useCustomizer();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 02 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          CHOOSE YOUR CRUNCH FACTOR
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          How do you like your coating texture and decibel resonance?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {CRUNCH_OPTIONS.map((item) => {
          const isSelected = crunch.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setCrunch(item)}
              data-cursor="pointer"
              data-cursor-label="TEXTURE"
              className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                  : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/50 hover:bg-ffc-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="text-sm font-black font-display uppercase tracking-tight text-white">
                      {item.name}
                    </h3>
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

              <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-white/5">
                <span className="text-[10px] font-mono text-ffc-gold font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {item.crispFactor}
                </span>
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
