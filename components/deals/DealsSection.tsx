'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DEALS } from '@/data/deals';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Sparkles, Copy, Check, ShoppingBag, ArrowRight } from 'lucide-react';

export function DealsSection() {
  const { addDeal, applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-ffc-cardBorder/60">
        <div>
          <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black">
            LIMITED-TIME CRUNCH DROPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight mt-1">
            BIG CRAVINGS. BETTER DEALS.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans max-w-md">
          Apply promotional promo codes at checkout or grab pre-assembled party barrels at deep discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEALS.map((deal) => (
          <div
            key={deal.id}
            className="group relative bg-ffc-card/80 hover:bg-ffc-surface border border-ffc-cardBorder hover:border-ffc-gold/50 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-card flex flex-col justify-between overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="bg-ffc-red text-white text-[11px] font-mono font-black px-3 py-1 rounded-full shadow-fire">
                {deal.badge}
              </span>
              <span className="text-xs font-mono text-ffc-smoke">{deal.expiresIn}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Deal Image */}
              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-ffc-black border border-white/5 group-hover:scale-105 transition-transform duration-300">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
              </div>

              {/* Deal Specs */}
              <div className="sm:col-span-7 space-y-2">
                <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-white group-hover:text-ffc-gold transition-colors">
                  {deal.title}
                </h3>

                <p className="text-xs font-medium text-ffc-orange font-sans">{deal.tagline}</p>

                <p className="text-xs text-ffc-cream/65 font-sans leading-relaxed">
                  {deal.description}
                </p>

                <ul className="space-y-1 pt-1 text-[11px] text-ffc-cream/70 font-sans">
                  {deal.includes.slice(0, 3).map((inc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-ffc-gold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions & Code */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black font-display text-ffc-gold">
                  {formatPrice(deal.price)}
                </span>
                <span className="text-xs text-ffc-smoke line-through font-mono">
                  {formatPrice(deal.originalPrice)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Promo Code Box */}
                <button
                  type="button"
                  onClick={() => handleCopyCode(deal.code)}
                  className="px-3 py-2 rounded-xl bg-ffc-black border border-ffc-gold/40 hover:border-ffc-gold text-xs font-mono font-bold text-ffc-gold flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode === deal.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      <span className="text-emerald-400">APPLIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>CODE: {deal.code}</span>
                    </>
                  )}
                </button>

                {/* Add Deal Button */}
                <button
                  type="button"
                  onClick={() => addDeal(deal)}
                  className="px-4 py-2 rounded-xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>CLAIM DEAL</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
