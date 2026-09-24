'use client';

import React from 'react';
import Image from 'next/image';
import { REVIEWS } from '@/data/reviews';
import { Star, CheckCircle, Flame, ThumbsUp } from 'lucide-react';

export function ReviewsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-ffc-cardBorder/60">
        <div>
          <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black">
            AUTHENTIC CRAVER FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight mt-1">
            LOVED BY CRUNCH SEEKERS
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-ffc-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-ffc-gold" />
            ))}
          </div>
          <span className="text-sm font-mono font-bold text-white">4.9 / 5.0 (8,400+ Orders)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder hover:border-ffc-gold/40 transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-2xl"
          >
            <div>
              {/* Reviewer Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-ffc-gold/40">
                    <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black font-display text-white">{rev.author}</h3>
                    <span className="text-[10px] font-mono text-ffc-smoke block">
                      {rev.city} • {rev.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stars & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-0.5 text-ffc-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ffc-gold" />
                  ))}
                </div>
                {rev.badge && (
                  <span className="text-[9px] font-mono font-bold bg-ffc-gold/15 text-ffc-gold px-2 py-0.5 rounded-full border border-ffc-gold/30">
                    {rev.badge}
                  </span>
                )}
              </div>

              {/* Review Body */}
              <p className="text-xs text-ffc-cream/75 font-sans leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* Custom Creation Ordered tag */}
            {rev.creationName && (
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-ffc-smoke truncate max-w-[170px]">
                  Recipe: <strong className="text-ffc-gold">{rev.creationName}</strong>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
