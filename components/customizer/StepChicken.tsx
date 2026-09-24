'use client';

import React from 'react';
import Image from 'next/image';
import { CHICKEN_BASES } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { Check, Flame } from 'lucide-react';

export function StepChicken() {
  const { chicken, setChicken } = useCustomizer();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 01 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          CHOOSE YOUR CHICKEN CUT
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          Select your 100% fresh, 24-hour buttermilk-brined chicken base.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {CHICKEN_BASES.map((item) => {
          const isSelected = chicken.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setChicken(item)}
              data-cursor="food"
              data-cursor-label="CRUNCH"
              className={`group relative p-3.5 rounded-2xl border transition-all duration-300 text-left flex gap-3.5 items-center cursor-pointer ${
                isSelected
                  ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                  : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/50 hover:bg-ffc-card'
              }`}
            >
              {/* Thumbnail Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.badge && (
                  <span className="absolute top-1 left-1 bg-ffc-red text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-black font-display uppercase tracking-tight text-white truncate">
                    {item.name}
                  </h3>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-ffc-cream/65 line-clamp-2 mt-0.5 font-sans leading-relaxed">
                  {item.shortDesc}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                  <span className="text-[10px] font-mono text-ffc-smoke">{item.piecesCount}</span>
                  <span className="text-xs font-mono font-bold text-ffc-gold">
                    {formatPrice(item.basePrice)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
