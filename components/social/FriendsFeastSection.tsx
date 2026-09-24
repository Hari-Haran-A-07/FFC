'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Sparkles, ArrowRight, Flame } from 'lucide-react';

export function FriendsFeastSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1A0E0B] via-ffc-charcoal to-[#18110F] border border-ffc-cardBorder p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Background Ambient Flame Glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-ffc-red/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ffc-red/20 border border-ffc-red/40 text-ffc-red text-xs font-mono font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              <span>THE SOCIAL EXPERIMENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight leading-[0.95]">
              CHICKEN TASTES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ffc-gold via-ffc-orange to-ffc-red">
                BETTER WITH FRIENDS.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-ffc-cream/80 font-sans leading-relaxed max-w-xl">
              We started FFC because ordering food for a group was always full of compromises.
              With our Customizer Lab, every friend builds their personal crunch, spice level, and signature dip in one combined squad feast box!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-2xl font-black font-display text-ffc-gold block">100%</span>
                <span className="text-xs font-mono text-ffc-smoke">Zero Flavour Compromises</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-2xl font-black font-display text-ffc-red block">1-LINK</span>
                <span className="text-xs font-mono text-ffc-smoke">Recipe Sharing to WhatsApp</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-2xl font-black font-display text-white block">35 MIN</span>
                <span className="text-xs font-mono text-ffc-smoke">Thermodynamic Doorstep Drop</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/make-your-chicken"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>BUILD A FRIENDS FEAST NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-ffc-cardBorder shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=900&auto=format&fit=crop"
                alt="Friends sharing fried chicken feast"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono text-ffc-gold uppercase font-bold block">
                    SQUAD PASS
                  </span>
                  <p className="text-sm font-bold text-white font-display">
                    &ldquo;Best hostel matchday dinner ever. The Ghost Fire wings are legendary.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
