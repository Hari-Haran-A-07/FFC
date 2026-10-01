'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Flame, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<'ignite' | 'spin_fire' | 'superheat' | 'blast_open' | 'done'>('ignite');
  const [progress, setProgress] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth rotation & progress loop
  useEffect(() => {
    // Check if user has already seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('ffc_cinematic_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      onComplete();
      return;
    }

    let start = performance.now();
    const duration = 5200; // 5.2s total sequence

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Continuous 3D spin speed ramps up during fire phase
      setRotationDeg((prev) => prev + (pct > 60 ? 3.5 : pct > 25 ? 2.2 : 1.2));

      if (elapsed < duration && !isSkipped) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Sequence Stages
    const t1 = setTimeout(() => {
      setPhase('spin_fire');
      soundManager.playOilDrop();
      soundManager.playSizzle();
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase('superheat');
      soundManager.playFireWhoosh();
    }, 3000);

    const t3 = setTimeout(() => {
      setPhase('blast_open');
      soundManager.playCrunch();
      soundManager.playAchievementFanfare();
    }, 4500);

    const t4 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('ffc_cinematic_intro_seen', 'true');
      setTimeout(onComplete, 700);
    }, 5200);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, isSkipped]);

  // Realistic Swirling Fire Vortex & Ember Sparks Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface FireParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
      orbitAngle: number;
      orbitDist: number;
      orbitSpeed: number;
      isSpark: boolean;
    }

    const particles: FireParticle[] = [];
    const colors = [
      '#FFFFFF', // White core
      '#FFE853', // Bright gold
      '#FF8800', // Searing orange
      '#FF3700', // Hot scarlet
      '#D61A00', // Deep flame
    ];

    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      const centerX = width / 2;
      const centerY = height / 2;

      // Spawn rate ramps up dynamically with phase
      const spawnCount =
        phase === 'blast_open' ? 24 : phase === 'superheat' ? 12 : phase === 'spin_fire' ? 7 : 3;

      for (let s = 0; s < spawnCount; s++) {
        const orbitAngle = Math.random() * Math.PI * 2;
        const orbitDist = Math.random() * 160 + 20;
        const isSpark = Math.random() > 0.35;

        particles.push({
          x: centerX + Math.cos(orbitAngle) * orbitDist,
          y: centerY + Math.sin(orbitAngle) * orbitDist * 0.45,
          vx: (Math.random() - 0.5) * (phase === 'superheat' ? 4 : 2),
          vy: -Math.random() * (phase === 'superheat' ? 6 : 3.5) - 1.5,
          radius: isSpark ? Math.random() * 2.5 + 1 : Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.008,
          orbitAngle,
          orbitDist,
          orbitSpeed: (Math.random() * 0.05 + 0.02) * (phase === 'superheat' ? 1.8 : 1),
          isSpark,
        });
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Swirling vortex physics around center
        p.orbitAngle += p.orbitSpeed;
        p.x += Math.cos(p.orbitAngle) * 1.5 + p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.isSpark ? 8 : 22;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Blast Open Shockwave Flare
      if (phase === 'blast_open') {
        ctx.save();
        const shockRadius = (frame % 40) * 18 + 50;
        ctx.strokeStyle = 'rgba(255, 176, 0, 0.4)';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#FF6A00';
        ctx.beginPath();
        ctx.arc(centerX, centerY, shockRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [phase]);

  const handleSkip = () => {
    setIsSkipped(true);
    sessionStorage.setItem('ffc_cinematic_intro_seen', 'true');
    onComplete();
  };

  if (isSkipped) return null;

  const isBlasting = phase === 'blast_open' || phase === 'done';

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#070707] flex flex-col items-center justify-between p-6 overflow-hidden select-none transition-all duration-700 ${
        isBlasting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
          phase === 'superheat' || phase === 'blast_open'
            ? 'w-[750px] h-[750px] bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold opacity-60 scale-125'
            : 'w-[450px] h-[450px] bg-ffc-red/25 opacity-40 scale-100'
        }`}
      />

      {/* Dynamic Swirling Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Top Header Bar with Skip Button */}
      <div className="relative z-30 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ffc-red to-ffc-orange flex items-center justify-center shadow-fire">
            <Flame className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <span className="text-sm font-black font-display tracking-tight text-white">
            FFC<span className="text-ffc-red">.</span> LABS
          </span>
        </div>

        <button
          onClick={handleSkip}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <span>ENTER FEAST (SKIP)</span>
          <span className="text-ffc-gold">➔</span>
        </button>
      </div>

      {/* CENTER STAGE: 3D ROTATING CHICKEN WITH REALISTIC FIRE */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto perspective-[1200px]">
        {/* Swirling Plasma Ring Pedestal */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          {/* Outer Rotating Energy Ring */}
          <div
            style={{ transform: `rotate(${rotationDeg * 0.8}deg)` }}
            className="absolute inset-2 rounded-full border-2 border-dashed border-ffc-gold/60 blur-[1px] animate-pulse"
          />

          {/* Inner Counter-Rotating Flame Ring */}
          <div
            style={{ transform: `rotate(${-rotationDeg * 1.4}deg)` }}
            className="absolute inset-8 rounded-full border-4 border-dashed border-ffc-red/70 blur-[2px]"
          />

          {/* Sizzling Heat Distortion Aura */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-ffc-red via-ffc-orange to-ffc-gold opacity-30 blur-2xl animate-pulse" />

          {/* 3D ROTATING CHICKEN PIECE */}
          <div
            style={{
              transform: `rotateY(${rotationDeg * 1.2}deg) rotateX(${Math.sin(rotationDeg * 0.05) * 12}deg) scale(${
                phase === 'superheat' ? 1.15 : 1
              })`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.08s linear, scale 0.4s ease-out',
            }}
            className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center"
          >
            {/* Main Crispy Golden Chicken Image */}
            <div className="relative w-full h-full animate-sizzle">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=700&auto=format&fit=crop"
                alt="3D Frying Chicken"
                fill
                priority
                className="object-contain filter drop-shadow-[0_15px_35px_rgba(230,57,31,0.9)] contrast-125 saturate-120"
              />
            </div>

            {/* Fiery Core Heat Flare behind piece */}
            <div className="absolute inset-4 bg-gradient-to-t from-ffc-red via-ffc-orange to-transparent opacity-60 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Temperature & Crunch Floating Badges */}
          <div className="absolute -top-3 right-2 bg-ffc-red/90 backdrop-blur-md text-white text-[10px] font-mono font-black px-3 py-1 rounded-full border border-ffc-red shadow-fire animate-bounce-short">
            🔥 175°C CALIBRATED
          </div>

          <div className="absolute -bottom-3 left-2 bg-ffc-black/90 backdrop-blur-md text-ffc-gold text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-ffc-gold/40 shadow-gold">
            💥 135 dB CRUNCH FACTOR
          </div>
        </div>

        {/* Phase Subtitle & Status */}
        <div className="mt-8 text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ffc-card/90 border border-white/10 text-xs font-mono font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {phase === 'ignite'
                ? 'IGNITING 175°C LAB OVEN...'
                : phase === 'spin_fire'
                ? 'ROTATING & INFUSING 11 SECRET SPICES...'
                : phase === 'superheat'
                ? 'LOCKING MAXIMUM DECIBEL CRUNCH...'
                : 'FEAST READY! OPENING THE DOORS...'}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            FRIENDS FRIED CHICKEN<span className="text-ffc-red">.</span>
          </h2>
        </div>
      </div>

      {/* Bottom Loading Progress Bar & Telemetry */}
      <div className="relative z-30 w-full max-w-xl space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ffc-smoke uppercase">SYSTEM TELEMETRY</span>
          <span className="text-ffc-gold font-bold">{progress}% READY</span>
        </div>

        {/* High-tech Progress Bar */}
        <div className="w-full h-2 bg-ffc-card rounded-full overflow-hidden border border-white/10 p-0.5">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold rounded-full transition-all duration-100 shadow-fire"
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-ffc-smoke">
          <span>24-HR BUTTERMILK BRINE</span>
          <span>100% WHOLE CHICKEN</span>
          <span>FRESH TO ORDER</span>
        </div>
      </div>
    </div>
  );
}
