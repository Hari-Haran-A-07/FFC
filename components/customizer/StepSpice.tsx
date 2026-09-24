'use client';

import React from 'react';
import { SPICE_LEVELS } from '@/data/customizer-options';
import { useCustomizer } from '@/context/CustomizerContext';
import { formatPrice } from '@/lib/utils';
import { HeatMeter } from '@/components/ui/HeatMeter';
import { AlertTriangle, Check, Flame } from 'lucide-react';

export function StepSpice() {
  const { spice, setSpice } = useCustomizer();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-wider font-bold block mb-1">
          STEP 04 OF 06
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
          CALIBRATE YOUR SPICE LEVEL
        </h2>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-1">
          From mild golden warmth to blistering Ghost Pepper heat.
        </p>
      </div>

      {/* Interactive Main Heat Gauge */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-ffc-card to-ffc-surface border border-ffc-cardBorder shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-ffc-smoke uppercase tracking-wider block">
            SELECTED HEAT CALIBRATION
          </span>
          <span className="text-lg sm:text-xl font-black font-display text-white uppercase">
            LEVEL 0{spice.level}: {spice.name}
          </span>
          <p className="text-xs text-ffc-cream/70 mt-0.5">{spice.tagline}</p>
        </div>
        <HeatMeter
          level={spice.level}
          interactive
          size="lg"
          showLabel={false}
          onSelectLevel={(lvl) => {
            const found = SPICE_LEVELS.find((s) => s.level === lvl);
            if (found) setSpice(found);
          }}
        />
      </div>

      {/* Fire Zone Dramatic Warning Banner */}
      {spice.level === 5 && (
        <div className="p-4 rounded-2xl bg-ffc-red/20 border border-ffc-red/70 shadow-fire flex items-center gap-3 animate-pulse">
          <AlertTriangle className="w-6 h-6 text-ffc-red shrink-0" />
          <div>
            <span className="text-xs font-black font-mono text-white tracking-wider uppercase block">
              🔥 YOU HAVE ENTERED THE FIRE ZONE.
            </span>
            <p className="text-[11px] text-ffc-cream font-sans">
              High Scoville blend with authentic Ghost Pepper dry rub. Keep milk or an iced beverage ready!
            </p>
          </div>
        </div>
      )}

      {/* Spice Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {SPICE_LEVELS.map((item) => {
          const isSelected = spice.level === item.level;
          const isFire = item.level === 5;

          return (
            <div
              key={item.level}
              onClick={() => setSpice(item)}
              data-cursor={isFire ? 'fire' : 'pointer'}
              data-cursor-label={isFire ? 'FIRE' : 'SPICE'}
              className={`group relative p-3.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? isFire
                    ? 'bg-ffc-red/20 border-ffc-red shadow-fire ring-1 ring-ffc-red'
                    : 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                  : 'bg-ffc-card/80 border-ffc-cardBorder hover:border-ffc-gold/50 hover:bg-ffc-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-ffc-gold">
                      0{item.level}
                    </span>
                    <h3 className="text-sm font-black font-display uppercase tracking-tight text-white flex items-center gap-1.5">
                      {item.name}
                      {isFire && <Flame className="w-3.5 h-3.5 text-ffc-red fill-ffc-red" />}
                    </h3>
                  </div>
                  {isSelected && (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isFire ? 'bg-ffc-red text-white' : 'bg-ffc-gold text-ffc-black'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-ffc-cream/65 mt-1.5 font-sans leading-relaxed">
                  {item.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-ffc-smoke">
                  Intensity: {item.flameIntensity}/5
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
