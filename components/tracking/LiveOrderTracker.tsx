'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OrderTrackingState } from '@/types';
import { formatPrice } from '@/lib/utils';
import { soundManager } from '@/lib/sound';
import {
  Flame,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Sparkles,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

interface LiveOrderTrackerProps {
  orderId?: string;
}

export function LiveOrderTracker({ orderId = 'FFC-ORD-84920' }: LiveOrderTrackerProps) {
  const [order, setOrder] = useState<OrderTrackingState | null>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(2); // Default at FRYING stage for maximum visual impact

  const stages = [
    { id: 'received', title: 'ORDER RECEIVED', desc: 'Lab ticket printed in kitchen', icon: '📝' },
    { id: 'kitchen_started', title: 'KITCHEN STARTED', desc: 'Buttermilk chicken dredged in custom flour', icon: '🥣' },
    { id: 'frying', title: 'FRYING IN OIL', desc: 'Bubbling in 175°C filtered oil for decibel crunch', icon: '🔥', isSpecial: true },
    { id: 'packed', title: 'PACKED & SEALED', desc: 'Vented thermodynamic packaging secured', icon: '📦' },
    { id: 'out_for_delivery', title: 'OUT FOR DELIVERY', desc: 'Rider speeding to your doorstep', icon: '⚡' },
    { id: 'delivered', title: 'DELIVERED & FEAST', desc: 'Piping hot and ready to feast with friends', icon: '🍗' },
  ];

  useEffect(() => {
    // Load saved order from localStorage if available
    try {
      const saved = localStorage.getItem(`ffc_order_${orderId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
      }
    } catch {
      // Ignore
    }

    // Auto-advance stage timer demo
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev === 2) {
          soundManager.playSizzle();
        }
        return (prev + 1) % stages.length;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ffc-red/20 border border-ffc-red/40 text-ffc-red text-xs font-mono font-bold uppercase tracking-widest">
          <Flame className="w-4 h-4 fill-ffc-red animate-pulse" />
          <span>LIVE KITCHEN TRACKER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
          YOUR CHICKEN IS ON THE WAY. 🔥
        </h1>

        <p className="text-sm font-mono text-ffc-gold">
          ORDER ID: <strong className="text-white">{orderId}</strong> • ESTIMATED TIME: 25–30 MINS
        </p>
      </div>

      {/* SPECIAL ACTIVE FRYING STAGE SPOTLIGHT CARD */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#1C100D] to-ffc-charcoal border border-ffc-red/50 p-6 sm:p-8 shadow-[0_0_60px_rgba(230,57,31,0.25)] overflow-hidden">
        {/* Background Sizzling Fire Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-ffc-red/20 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Animated Frying Visual */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Boiling Oil Ring Glow */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-ffc-gold/60 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-ffc-red via-ffc-orange to-ffc-gold opacity-20 blur-md animate-pulse" />

              <div className="relative w-32 h-32 animate-sizzle">
                <Image
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop"
                  alt="Frying chicken piece"
                  fill
                  className="object-contain filter drop-shadow-[0_10px_20px_#E6391F]"
                />
              </div>

              {/* Sparks and Smoke Badges */}
              <span className="absolute -top-1 -right-1 bg-ffc-red text-white text-[9px] font-mono font-black px-2 py-0.5 rounded shadow-fire animate-bounce-short">
                175°C OIL
              </span>
            </div>
            <span className="text-[11px] font-mono text-ffc-gold uppercase mt-2 font-bold">
              🔥 ACTIVE LAB FRYER #04
            </span>
          </div>

          {/* Current Status Info */}
          <div className="md:col-span-7 space-y-3 text-left">
            <span className="text-xs font-mono uppercase text-ffc-smoke">
              STAGE 0{currentStageIdx + 1} OF 06
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight">
              {stages[currentStageIdx].title}
            </h2>
            <p className="text-xs sm:text-sm text-ffc-cream/80 font-sans leading-relaxed">
              {stages[currentStageIdx].desc}
            </p>

            {/* Quick manual stage simulator for testing */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-ffc-smoke mr-1">SIMULATE:</span>
              {stages.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStageIdx(idx)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                    currentStageIdx === idx
                      ? 'bg-ffc-gold text-ffc-black border-ffc-gold'
                      : 'bg-ffc-card border-white/10 text-ffc-cream/60 hover:text-white'
                  }`}
                >
                  {s.icon} {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Timeline Progression */}
      <div className="bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-black font-display uppercase tracking-tight text-white">
          ORDER PROGRESS TIMELINE
        </h3>

        <div className="space-y-4">
          {stages.map((s, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={s.id}
                className={`flex items-start gap-4 p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-ffc-surface border-ffc-gold shadow-gold'
                    : isCompleted
                    ? 'bg-ffc-surface/40 border-emerald-500/30'
                    : 'bg-transparent border-transparent opacity-40'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 border ${
                    isCurrent
                      ? 'bg-ffc-gold text-ffc-black border-ffc-gold font-bold animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500'
                      : 'bg-ffc-card border-ffc-cardBorder text-ffc-smoke'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black font-display uppercase tracking-tight text-white">
                      {s.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-ffc-gold animate-pulse">
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ffc-cream/70 font-sans mt-0.5">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Rider & Delivery Map Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rider Card */}
        <div className="p-6 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-ffc-gold">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                alt="Delivery Rider"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-ffc-gold block font-bold">
                YOUR FRY RUNNER
              </span>
              <h4 className="text-sm font-black font-display text-white">Vikas Kumar</h4>
              <span className="text-xs text-ffc-smoke font-mono">Ather 450X (EV) • 4.9 ★</span>
            </div>
          </div>

          <a
            href="tel:+919845019283"
            className="p-3 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 transition-colors"
            title="Call Rider"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Action Link */}
        <div className="p-6 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white uppercase block font-display">
              CRAVING MORE CRUNCH?
            </span>
            <span className="text-xs text-ffc-cream/60">Build another custom masterpiece.</span>
          </div>

          <Link
            href="/make-your-chicken"
            className="px-4 py-2.5 rounded-xl bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black font-black font-display text-xs uppercase tracking-wider shadow-gold"
          >
            MAKE ANOTHER
          </Link>
        </div>
      </div>
    </div>
  );
}
