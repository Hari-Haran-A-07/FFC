'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Sliders, Utensils, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'CHOOSE YOUR CUT',
      desc: 'Pick from 100% fresh whole-breast strips, bone-in golden pieces, blistered wings, or juicy double-fillet burgers.',
      icon: '🍗',
    },
    {
      step: '02',
      title: 'CALIBRATE CRUNCH & HEAT',
      desc: 'Select your decibel crunch level, spice intensity (Level 01 Mild up to Level 05 Fire Zone), and signature seasonings.',
      icon: '⚡',
    },
    {
      step: '03',
      title: 'WE FRY TO ORDER',
      desc: 'No heat lamps. Our fry masters drop your custom recipe in 175°C filtered oil the second your order tickets print.',
      icon: '🔥',
    },
    {
      step: '04',
      title: 'YOU FEAST WITH FRIENDS',
      desc: 'Delivered in thermodynamic vented packaging so your customized crunch stays shattering and piping hot.',
      icon: '🎉',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black bg-ffc-gold/15 px-3 py-1 rounded-full border border-ffc-gold/40">
          THE FFC LAB PROCESS
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
          YOU CREATE IT. WE FRY IT.
        </h2>
        <p className="text-sm sm:text-base text-ffc-cream/70 font-sans">
          Four precision steps between your wildest chicken craving and that unforgettable first shatter-crunch bite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div
            key={s.step}
            className="group relative p-6 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder hover:border-ffc-gold/50 transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-2xl bg-ffc-surface border border-ffc-cardBorder flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {s.icon}
                </span>
                <span className="text-3xl font-black font-display text-white/15 group-hover:text-ffc-gold/30 transition-colors">
                  {s.step}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black font-display text-white uppercase tracking-tight mb-2">
                {s.title}
              </h3>

              <p className="text-xs sm:text-sm text-ffc-cream/65 font-sans leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-ffc-gold">
              <span>STEP {s.step}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/make-your-chicken"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>START CREATING YOUR CHICKEN NOW</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </Link>
      </div>
    </section>
  );
}
