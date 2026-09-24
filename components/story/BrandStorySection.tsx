'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, ShieldCheck, Thermometer, Sparkles } from 'lucide-react';

export function BrandStorySection() {
  const pillars = [
    {
      num: '01',
      title: '24-HOUR BUTTERMILK BRINE',
      desc: 'We never freeze our poultry. Every whole-muscle cut marinates for a full day in cultured buttermilk and fresh bay herbs to guarantee deep cellular juiciness.',
      icon: '🌿',
    },
    {
      num: '02',
      title: 'PRECISION SHATTER-DREDGE',
      desc: 'Our proprietary flour blend is aerated and double-tossed to create microscopic crags that blister into an ultra-resonant 110dB+ golden crust.',
      icon: '✨',
    },
    {
      num: '03',
      title: '175°C RAPID PRESSURE FRY',
      desc: 'Frying at calibrated temperatures locks moisture inside while expelling excess surface oils, giving you clean, grease-free crispy indulgence.',
      icon: '🔥',
    },
    {
      num: '04',
      title: 'ARTISAN FLAVOUR DUSTING',
      desc: 'Direct from the fryer, our chicken is hand-tossed in small-batch spice dustings and molten glazes so the heat bonds with the crunchy crust.',
      icon: '🌶️',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black bg-ffc-gold/15 px-3 py-1 rounded-full border border-ffc-gold/40">
          THE CRUNCH PHILOSOPHY
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
          WE DON&apos;T JUST FRY CHICKEN.
        </h2>
        <p className="text-sm sm:text-base text-ffc-cream/70 font-sans leading-relaxed">
          Fast food treated fried chicken like a commodity. We treat it like culinary engineering.
          No soggy cardboard boxes. No generic frozen pieces. Every single meal is custom-crafted for your palate.
        </p>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="p-6 sm:p-7 rounded-3xl bg-ffc-card/80 border border-ffc-cardBorder hover:border-ffc-gold/50 transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs font-mono font-black text-ffc-gold bg-ffc-gold/10 px-2.5 py-1 rounded-full border border-ffc-gold/30">
                  PHASE {p.num}
                </span>
              </div>
              <h3 className="text-base font-black font-display text-white uppercase tracking-tight mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-ffc-cream/70 font-sans leading-relaxed">
                {p.desc}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-ffc-smoke uppercase">
              FFC KITCHEN STANDARD
            </div>
          </div>
        ))}
      </div>

      {/* Brand Proof Stats Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-ffc-surface via-ffc-card to-ffc-surface border border-ffc-cardBorder flex flex-col md:flex-row items-center justify-around gap-6 text-center">
        <div>
          <span className="text-3xl sm:text-4xl font-black font-display text-white block">
            100% FRESH
          </span>
          <span className="text-xs font-mono text-ffc-smoke uppercase">
            Never Frozen Farm Poultry
          </span>
        </div>
        <div className="hidden md:block w-px h-12 bg-ffc-cardBorder" />
        <div>
          <span className="text-3xl sm:text-4xl font-black font-display text-ffc-gold block">
            12 SECRET SPICES
          </span>
          <span className="text-xs font-mono text-ffc-smoke uppercase">
            Signature House Rub
          </span>
        </div>
        <div className="hidden md:block w-px h-12 bg-ffc-cardBorder" />
        <div>
          <span className="text-3xl sm:text-4xl font-black font-display text-ffc-red block">
            0% ARTIFICIAL TRANS FATS
          </span>
          <span className="text-xs font-mono text-ffc-smoke uppercase">
            Pure Filtered Cooking
          </span>
        </div>
      </div>
    </section>
  );
}
