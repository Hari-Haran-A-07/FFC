'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black bg-ffc-gold/15 px-3 py-1 rounded-full border border-ffc-gold/40">
          EVERYTHING YOU NEED TO KNOW
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-sm sm:text-base text-ffc-cream/70 font-sans">
          Got questions about our 6-step creation lab, heat tolerance levels, or late-night delivery?
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-ffc-surface border-ffc-gold/60 shadow-gold'
                  : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-cardBorder'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-black font-display text-white uppercase tracking-tight">
                  {item.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-xl bg-ffc-card flex items-center justify-center text-ffc-gold shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-ffc-gold text-ffc-black' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ffc-cream/80 font-sans leading-relaxed border-t border-white/5">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
