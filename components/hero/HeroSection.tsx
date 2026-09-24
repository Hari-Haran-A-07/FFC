'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Flame, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * 20, y: -y * 20 });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-ffc-red/20 via-ffc-orange/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Headline & Content */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ffc-surface border border-ffc-cardBorder shadow-sm">
            <span className="w-2 h-2 rounded-full bg-ffc-red animate-ping" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-ffc-gold">
              NEXT-GEN FOOD-TECH ORDERING
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display uppercase tracking-tight text-white leading-[0.95]">
              FRIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold">
                DIFFERENT.
              </span>
            </h1>
            <p className="text-base sm:text-xl font-medium text-ffc-cream/80 font-sans max-w-xl mx-auto lg:mx-0 pt-2 leading-relaxed">
              Bold chicken. Your crunch. Your flavour. Your rules. Customize every cut, dusting, and heat level from our interactive fry lab.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/make-your-chicken"
              data-cursor="pointer"
              data-cursor-label="CREATE"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
            >
              <Sparkles className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
              <span>MAKE YOUR CHICKEN</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/menu"
              data-cursor="pointer"
              data-cursor-label="MENU"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ffc-surface hover:bg-ffc-card border border-ffc-cardBorder text-white font-black font-display text-sm uppercase tracking-wider hover:border-ffc-gold/50 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE MENU</span>
            </Link>
          </div>

          {/* Micro Stats Row */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-ffc-cardBorder/60 max-w-lg mx-auto lg:mx-0">
            <div>
              <span className="text-lg sm:text-2xl font-black font-display text-white block">
                24-HR
              </span>
              <span className="text-[10px] font-mono text-ffc-smoke uppercase">
                Buttermilk Brine
              </span>
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black font-display text-ffc-gold block">
                135 dB
              </span>
              <span className="text-[10px] font-mono text-ffc-smoke uppercase">
                Max Crunch Peak
              </span>
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black font-display text-ffc-red block">
                5 LEVELS
              </span>
              <span className="text-[10px] font-mono text-ffc-smoke uppercase">
                Ghost Pepper Heat
              </span>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Parallax Hero Food Visual */}
        <div className="lg:col-span-6 flex items-center justify-center relative select-none">
          {/* Floating Pill Badges */}
          <div className="absolute -top-4 -left-2 z-20 bg-ffc-card/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-ffc-cardBorder shadow-xl flex items-center gap-2 animate-float">
            <span className="text-base">💥</span>
            <div>
              <span className="text-[9px] font-mono text-ffc-gold uppercase block leading-none">
                CRUNCH FACTOR
              </span>
              <span className="text-xs font-black font-display text-white">
                EXTRA CRISPY DREDGE
              </span>
            </div>
          </div>

          <div className="absolute -bottom-4 right-0 z-20 bg-ffc-card/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-ffc-cardBorder shadow-xl flex items-center gap-2 animate-float [animation-delay:1.5s]">
            <Flame className="w-4 h-4 text-ffc-red fill-ffc-red" />
            <div>
              <span className="text-[9px] font-mono text-ffc-red uppercase block leading-none">
                HOT DROP
              </span>
              <span className="text-xs font-black font-display text-white">
                GHOST FIRE WINGS
              </span>
            </div>
          </div>

          {/* 3D Tilt Wrapper */}
          <div
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] flex items-center justify-center"
          >
            {/* Ambient Flame Halo */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-ffc-red/40 via-ffc-orange/30 to-ffc-gold/20 blur-2xl animate-pulse" />

            {/* Main Hero Bucket & Crispy Chicken Image */}
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=900&auto=format&fit=crop"
                alt="Friends Fried Chicken Masterpiece"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.9)] filter contrast-110 saturate-110 rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Feast Indicator */}
      <a
        href="#quick-order"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ffc-smoke hover:text-ffc-gold transition-colors font-mono text-[10px] tracking-widest uppercase cursor-pointer"
      >
        <span>SCROLL TO FEAST</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
