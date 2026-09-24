'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Flame, Sparkles, X } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<'ember' | 'emerge' | 'fire' | 'logo' | 'complete'>('ember');
  const [isSkipped, setIsSkipped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if user has already experienced intro in this session
    const hasSeenIntro = sessionStorage.getItem('ffc_cinematic_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence Timers
    const timer1 = setTimeout(() => {
      setPhase('emerge');
      soundManager.playSizzle();
    }, 1200);

    const timer2 = setTimeout(() => {
      setPhase('fire');
      soundManager.playFireWhoosh();
    }, 2800);

    const timer3 = setTimeout(() => {
      setPhase('logo');
      soundManager.playCrunch();
    }, 4200);

    const timer4 = setTimeout(() => {
      setPhase('complete');
      sessionStorage.setItem('ffc_cinematic_intro_seen', 'true');
      setTimeout(onComplete, 600);
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Dynamic Fire & Spark Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
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
      size: number;
      color: string;
      alpha: number;
      decay: number;
    }

    const particles: FireParticle[] = [];
    const colors = ['#FF1A00', '#FF5500', '#FF9900', '#FFCC00', '#FFFFFF'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn particles based on current phase
      const spawnRate = phase === 'fire' || phase === 'logo' ? 8 : phase === 'emerge' ? 2 : 1;

      for (let s = 0; s < spawnRate; s++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = phase === 'fire' ? Math.random() * 8 + 3 : Math.random() * 3 + 1;
        particles.push({
          x: width / 2 + (Math.random() * 60 - 30),
          y: height / 2 + (Math.random() * 60 - 30),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (phase === 'fire' ? 3 : 1),
          size: Math.random() * (phase === 'fire' ? 6 : 3) + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = phase === 'fire' ? 20 : 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [phase]);

  const handleSkip = () => {
    setIsSkipped(true);
    sessionStorage.setItem('ffc_cinematic_intro_seen', 'true');
    onComplete();
  };

  if (isSkipped) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#070707] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
        phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-widest transition-all"
      >
        SKIP INTRO ➔
      </button>

      {/* Central Visual Container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-xl">
        {/* Phase 1 & 2: Rotating Glowing Ember & Chicken Emergence */}
        {(phase === 'ember' || phase === 'emerge') && (
          <div className="relative flex flex-col items-center animate-fadeIn">
            {/* Glowing Orb */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-ffc-red via-ffc-orange to-ffc-gold blur-xl animate-pulse" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="w-12 h-12 text-ffc-gold fill-ffc-gold animate-spin-slow" />
            </div>

            {phase === 'emerge' && (
              <div className="mt-8 text-center animate-fadeIn">
                <span className="text-xs font-mono text-ffc-gold tracking-widest uppercase block animate-pulse">
                  IGNITING THE LAB...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Fire Eruption Phase */}
        {phase === 'fire' && (
          <div className="relative flex flex-col items-center animate-fireErupt">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold blur-3xl opacity-80 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 animate-sizzle">
                <Image
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop"
                  alt="FFC Golden Chicken"
                  fill
                  className="object-contain filter drop-shadow-[0_0_45px_#E6391F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: FFC Logo Reveal */}
        {phase === 'logo' && (
          <div className="flex flex-col items-center space-y-4 animate-scaleUp">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-ffc-red via-ffc-orange to-ffc-gold flex items-center justify-center shadow-fire p-4">
              <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white animate-bounce-short" />
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tighter uppercase leading-none">
                FFC<span className="text-ffc-red">.</span>
              </h1>
              <p className="text-sm sm:text-base font-black font-display tracking-widest text-ffc-gold uppercase mt-2">
                FRIENDS FRIED CHICKEN
              </p>
              <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white tracking-widest uppercase">
                FRY IT YOUR WAY.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ambient Floor Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-[100%] bg-ffc-red/20 blur-3xl pointer-events-none" />
    </div>
  );
}
