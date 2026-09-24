'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-t border-ffc-cardBorder">
      {/* Background Ambient Flame Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] rounded-full bg-gradient-to-tr from-ffc-red/30 via-ffc-orange/20 to-ffc-gold/15 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ffc-card border border-ffc-cardBorder shadow-sm">
          <Flame className="w-4 h-4 text-ffc-red fill-ffc-red animate-bounce-short" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-ffc-gold">
            READY TO FRY DIFFERENT?
          </span>
        </div>

        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter text-white leading-[0.9]">
          YOUR CHICKEN. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold">
            YOUR RULES.
          </span>
        </h2>

        <p className="text-base sm:text-xl font-medium text-ffc-cream/80 font-sans max-w-xl mx-auto">
          Don&apos;t settle for generic fast food. Jump into our interactive lab and create something genuinely worth craving.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/make-your-chicken"
            data-cursor="pointer"
            data-cursor-label="CREATE"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-base uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform" />
            <span>MAKE YOUR CHICKEN NOW</span>
            <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-ffc-surface hover:bg-ffc-card border border-ffc-cardBorder text-white font-black font-display text-sm uppercase tracking-wider hover:border-ffc-gold/50 transition-colors flex items-center justify-center"
          >
            EXPLORE FULL MENU
          </Link>
        </div>
      </div>
    </section>
  );
}
