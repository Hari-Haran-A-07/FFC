'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCustomizer } from '@/context/CustomizerContext';

interface ChickenVisualizerProps {
  interactiveTilt?: boolean;
  className?: string;
  showBadgesOverlay?: boolean;
}

export function ChickenVisualizer({
  interactiveTilt = true,
  className = '',
  showBadgesOverlay = true,
}: ChickenVisualizerProps) {
  const {
    chicken,
    crunch,
    flavour,
    spice,
    sauce,
    saucePlacement,
    selectedSides,
    selectedDrink,
    badges,
  } = useCustomizer();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mouse / Touch Tilt Handler with damping
  useEffect(() => {
    if (!interactiveTilt) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * 18, y: -y * 18 });
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
  }, [interactiveTilt]);

  // Particle, Embers, Steam & Crunch Dust Physics Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
      type: 'flame' | 'ember' | 'steam' | 'crumb';
      rotation: number;
      vRot: number;
    }

    const particles: Particle[] = [];
    const maxParticles = spice.level >= 4 ? 65 : spice.level >= 2 ? 35 : 20;

    const createParticle = (): Particle => {
      const rand = Math.random();
      const isFireZone = spice.level === 5;

      let type: 'flame' | 'ember' | 'steam' | 'crumb' = 'crumb';
      if (rand < (isFireZone ? 0.55 : spice.level * 0.1)) {
        type = 'flame';
      } else if (rand < 0.75) {
        type = 'ember';
      } else if (rand < 0.9) {
        type = 'steam';
      }

      const colors =
        type === 'flame'
          ? ['#FF1A00', '#FF5500', '#FFAA00', '#FFFFFF']
          : type === 'ember'
          ? ['#FF8800', '#FFAA00', '#FFD700']
          : type === 'steam'
          ? ['rgba(240, 240, 240, 0.4)', 'rgba(255, 230, 210, 0.3)']
          : ['#D49B4B', '#FFB000', '#E5A038'];

      const size =
        type === 'flame'
          ? Math.random() * 5 + 2
          : type === 'steam'
          ? Math.random() * 12 + 6
          : Math.random() * 2.5 + 1;

      return {
        x: width / 2 + (Math.random() * 220 - 110),
        y: height / 2 + (Math.random() * 90 - 25),
        vx: (Math.random() - 0.5) * (type === 'steam' ? 0.8 : 2.2),
        vy: type === 'crumb' ? Math.random() * 1.5 + 0.4 : -Math.random() * 2.5 - (type === 'flame' ? 1.8 : 0.8),
        size,
        alpha: type === 'steam' ? 0.35 : Math.random() * 0.8 + 0.3,
        decay: type === 'steam' ? 0.005 : Math.random() * 0.018 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
      };
    };

    let frameCount = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      if (particles.length < maxParticles && frameCount % 2 === 0) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.type === 'steam') {
          p.size += 0.12; // Steam expands as it rises
        }

        if (p.alpha <= 0 || p.y < 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.type === 'flame' || p.type === 'ember') {
          ctx.shadowBlur = p.type === 'flame' ? 14 : 6;
          ctx.shadowColor = p.color;
        }

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'crumb') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [spice.level, flavour.id, crunch.id]);

  const isFireZone = spice.level === 5;
  const isExtraHot = spice.level >= 4;

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none overflow-visible perspective-[1000px] ${className}`}
    >
      {/* Background Ambience / Heat Aura */}
      <div
        style={{
          background: `radial-gradient(circle at center, ${
            isFireZone
              ? 'rgba(230, 57, 31, 0.45)'
              : isExtraHot
              ? 'rgba(255, 106, 0, 0.35)'
              : flavour.glowColor || 'rgba(255, 176, 0, 0.25)'
          } 0%, rgba(11, 11, 11, 0) 70%)`,
        }}
        className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
          isFireZone ? 'scale-125 animate-pulse' : 'scale-100'
        }`}
      />

      {/* Interactive 3D Canvas for Realistic Smoke, Flames & Crumbs */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none w-full h-full"
      />

      {/* Floating 3D Food Stage Plate */}
      <div
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative z-10 w-full h-full flex items-center justify-center p-6"
      >
        {/* Glow Pedestal Ring */}
        <div
          className={`absolute bottom-8 w-4/5 h-20 rounded-[100%] transition-colors duration-500 blur-md ${
            isFireZone
              ? 'bg-ffc-red/40 shadow-[0_0_50px_#E6391F]'
              : 'bg-ffc-gold/20 shadow-gold'
          }`}
        />

        {/* Main Chicken Cut Image */}
        <div className="relative w-4/5 h-4/5 flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
            <Image
              src={chicken.image}
              alt={chicken.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter contrast-110 saturate-115 rounded-3xl"
            />

            {/* Flavor Dusting / Glaze Overlay Layer */}
            <div
              style={{
                backgroundColor: flavour.spiceDustColor,
                opacity: 0.18 + spice.level * 0.04,
                mixBlendMode: 'color-burn',
              }}
              className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
            />

            {/* Sauce Drizzle Overlay Layer */}
            {saucePlacement === 'drizzled' && (
              <div
                style={{
                  boxShadow: `inset 0 0 35px ${sauce.drizzleColor}66`,
                  border: `2px dashed ${sauce.drizzleColor}88`,
                }}
                className="absolute inset-4 rounded-2xl pointer-events-none animate-pulse duration-1000"
              />
            )}

            {/* Fire Zone Heat Shimmer / Distortion Flare */}
            {isFireZone && (
              <div className="absolute -inset-4 bg-gradient-to-t from-ffc-red/30 via-transparent to-ffc-orange/20 rounded-full blur-sm pointer-events-none animate-sizzle" />
            )}
          </div>
        </div>

        {/* Dynamic Accompaniment Badges & Props */}
        {/* Side Drink Prop if selected */}
        {selectedDrink && (
          <div className="absolute -bottom-2 -left-2 z-30 bg-ffc-card/90 backdrop-blur-md p-2 rounded-2xl border border-ffc-cardBorder shadow-xl flex items-center gap-2 animate-bounce-short">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image
                src={selectedDrink.image}
                alt={selectedDrink.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left pr-2">
              <span className="text-[9px] font-mono uppercase text-ffc-gold block">BEVERAGE</span>
              <span className="text-xs font-bold text-white block truncate max-w-[90px]">
                {selectedDrink.name}
              </span>
            </div>
          </div>
        )}

        {/* Side Dipping Sauce Cup */}
        {saucePlacement !== 'drizzled' && (
          <div className="absolute -bottom-2 -right-2 z-30 bg-ffc-card/90 backdrop-blur-md p-2 rounded-2xl border border-ffc-cardBorder shadow-xl flex items-center gap-2">
            <div
              style={{ backgroundColor: sauce.color }}
              className="w-10 h-10 rounded-full border-2 border-white/40 shadow-inner flex items-center justify-center text-xs font-bold text-black"
            >
              🫙
            </div>
            <div className="text-left pr-2">
              <span className="text-[9px] font-mono uppercase text-ffc-orange block">
                {saucePlacement === 'double-dip' ? 'DOUBLE DIP' : 'SAUCE ON SIDE'}
              </span>
              <span className="text-xs font-bold text-white block truncate max-w-[90px]">
                {sauce.name}
              </span>
            </div>
          </div>
        )}

        {/* Side Item count badge */}
        {selectedSides.length > 0 && (
          <div className="absolute top-4 left-4 z-30 bg-ffc-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-ffc-cardBorder flex items-center gap-2 shadow-lg">
            <span className="text-xs">🍟</span>
            <span className="text-xs font-mono font-bold text-ffc-cream">
              +{selectedSides.length} SIDE{selectedSides.length > 1 ? 'S' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Floating Status Badges Overlay */}
      {showBadgesOverlay && (
        <div className="absolute top-2 right-2 z-30 flex flex-col items-end gap-1.5 pointer-events-none">
          <div className="bg-ffc-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-ffc-cardBorder text-[10px] font-mono font-bold text-ffc-gold">
            {crunch.name}
          </div>
          <div
            style={{ backgroundColor: `${flavour.color}25`, borderColor: flavour.color }}
            className="backdrop-blur-md px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold text-white shadow-sm"
          >
            {flavour.name}
          </div>
          {isFireZone && (
            <div className="bg-ffc-red text-white font-black text-[10px] font-mono px-3 py-1 rounded-full shadow-[0_0_15px_#E6391F] animate-pulse">
              FIRE ZONE ACTIVE
            </div>
          )}
        </div>
      )}
    </div>
  );
}
