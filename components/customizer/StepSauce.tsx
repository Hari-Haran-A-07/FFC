'use client';

import React from 'react';
import { SAUCE_OPTIONS } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';

export function StepSauce() {
  const { sauce, setSauce, saucePlacement, setSaucePlacement } = useCustomizer();

  const placements = [
    {
      id: 'drizzled',
      label: 'DRIZZLED ON TOP',
      desc: 'Evenly coated over the hot crispy ridges for instant flavor impact.',
      icon: '🍯',
    },
    {
      id: 'on-the-side',
      label: 'ON THE SIDE',
      desc: 'Separate sealed dipping tub to control your crunch-to-sauce ratio.',
      icon: '🫙',
    },
    {
      id: 'double-dip',
      label: 'DOUBLE DIP LOADED',
      desc: 'Both drizzled over the chicken and served with an extra dipping tub.',
      icon: '🔥',
    },
  ] as const;

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 05 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          CHOOSE YOUR SAUCE & APPLICATION
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          Select your signature glaze and how you want our kitchen to apply it.
        </p>
      </div>

      {/* Sauce Placement Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        {placements.map((p) => {
          const isSelected = saucePlacement === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSaucePlacement(p.id)}
              data-cursor="pointer"
              data-cursor-label="STYLE"
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-ffc-gold/15 border-ffc-gold text-white shadow-sm ring-1 ring-ffc-gold/50'
                  : 'bg-ffc-card/60 border-ffc-cardBorder text-ffc-cream/80 hover:border-ffc-gold/40'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{p.icon}</span>
                <span className="text-xs font-black font-display tracking-tight uppercase">
                  {p.label}
                </span>
              </div>
              <p className="text-[10px] text-ffc-cream/60 leading-tight">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Sauce Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {SAUCE_OPTIONS.map((item) => {
          const isSelected = sauce.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setSauce(item)}
              data-cursor="pointer"
              data-cursor-label="SAUCE"
              className={`group relative p-3.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                  : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/50 hover:bg-ffc-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: item.color }}
                      className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                    />
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

                <p className="text-[11px] text-ffc-cream/65 mt-1.5 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-ffc-smoke italic">
                  {item.pairingNote}
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
