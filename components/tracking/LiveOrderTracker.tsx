'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  Play,
  Pause,
  RotateCcw,
  Zap,
  Gauge,
  Radio,
  Volume2,
  ShieldCheck,
  Activity,
} from 'lucide-react';

interface LiveOrderTrackerProps {
  orderId?: string;
}

export function LiveOrderTracker({ orderId = 'FFC-ORD-84920' }: LiveOrderTrackerProps) {
  const [order, setOrder] = useState<OrderTrackingState | null>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(2); // Frying by default
  const [isAutoProgressing, setIsAutoProgressing] = useState<boolean>(true);
  const [oilTemp, setOilTemp] = useState<number>(175.2);
  const [decibels, setDecibels] = useState<number>(128);
  const [speedKmh, setSpeedKmh] = useState<number>(36);
  const [distanceKm, setDistanceKm] = useState<number>(2.4);
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; tag: string }>>([
    { id: '1', time: '21:54:02', text: 'Kitchen ticket auto-printed at Fry Lab #03 (Indiranagar)', tag: 'POS' },
    { id: '2', time: '21:55:18', text: 'Buttermilk double-dredge calibrated to 135dB texture profile', tag: 'DREDGE' },
    { id: '3', time: '21:56:45', text: 'Fryer Basket #02 submerged in 175.2°C filtered peanut oil', tag: 'FRYER' },
  ]);

  const mapCanvasRef = useRef<HTMLCanvasElement>(null);
  const fryerCanvasRef = useRef<HTMLCanvasElement>(null);

  const stages = [
    {
      id: 'received',
      title: 'ORDER RECEIVED',
      desc: 'Lab ticket printed in kitchen command center',
      icon: '📝',
      duration: '1-2m',
    },
    {
      id: 'kitchen_started',
      title: 'KITCHEN STARTED',
      desc: '24-hr brined chicken dredged in custom 11-spice flour',
      icon: '🥣',
      duration: '3-4m',
    },
    {
      id: 'frying',
      title: 'FRYING IN OIL',
      desc: 'Bubbling in 175°C filtered oil for decibel crunch',
      icon: '🔥',
      isSpecial: true,
      duration: '6-8m',
    },
    {
      id: 'packed',
      title: 'PACKED & SEALED',
      desc: 'Vented thermodynamic crisp-box secured with tamper seal',
      icon: '📦',
      duration: '2-3m',
    },
    {
      id: 'out_for_delivery',
      title: 'OUT FOR DELIVERY',
      desc: 'Ather 450X Fry Runner speeding to your doorstep',
      icon: '⚡',
      duration: '10-15m',
    },
    {
      id: 'delivered',
      title: 'DELIVERED & FEAST',
      desc: 'Piping hot and ready to feast with friends',
      icon: '🍗',
      duration: 'Enjoy!',
    },
  ];

  // Stage change sound triggers
  const triggerStageSounds = (stageIndex: number) => {
    switch (stageIndex) {
      case 0:
        soundManager.playTicketPrint();
        break;
      case 1:
        soundManager.playSelect();
        break;
      case 2:
        soundManager.playOilDrop();
        soundManager.playSizzle();
        break;
      case 3:
        soundManager.playCrunch();
        break;
      case 4:
        soundManager.playDeliveryHorn();
        break;
      case 5:
        soundManager.playAchievementFanfare();
        break;
    }
  };

  // Load saved order from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ffc_order_${orderId}`);
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, [orderId]);

  // Automated stage progression timer
  useEffect(() => {
    if (!isAutoProgressing) return;

    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        const next = (prev + 1) % stages.length;
        triggerStageSounds(next);

        // Add dynamic log
        const now = new Date().toTimeString().split(' ')[0];
        const newLogEntry = {
          id: `${Date.now()}`,
          time: now,
          text: `Automated Stage Transition → ${stages[next].title}`,
          tag: 'AUTO',
        };
        setLogs((l) => [...l.slice(-6), newLogEntry]);

        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoProgressing, stages.length]);

  // Automated micro-fluctuation for Fryer & GPS Telemetry
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      // Fryer temperature PID oscillation around 175°C
      setOilTemp((prev) => {
        const jitter = (Math.random() - 0.5) * 0.4;
        return parseFloat((175.0 + jitter).toFixed(1));
      });

      // Decibels fluctuation
      setDecibels(Math.floor(124 + Math.random() * 11));

      // Runner GPS movement
      setSpeedKmh((prev) => Math.floor(32 + Math.random() * 14));
      setDistanceKm((prev) => {
        if (prev <= 0.2) return 2.8;
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 1200);

    return () => clearInterval(telemetryInterval);
  }, []);

  // GPS Map Radar Canvas Animation
  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220);

    let progress = 0;

    const renderMap = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark GPS Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Waypoints Path
      const startX = 40;
      const startY = height - 40;
      const endX = width - 50;
      const endY = 40;

      const cp1X = width * 0.35;
      const cp1Y = height * 0.85;
      const cp2X = width * 0.65;
      const cp2Y = height * 0.2;

      // Draw Path Line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
      ctx.strokeStyle = 'rgba(255, 176, 0, 0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Animate Rider Position along Bezier curve
      progress = (progress + 0.004) % 1;
      const t = progress;
      const riderX =
        (1 - t) ** 3 * startX +
        3 * (1 - t) ** 2 * t * cp1X +
        3 * (1 - t) * t ** 2 * cp2X +
        t ** 3 * endX;
      const riderY =
        (1 - t) ** 3 * startY +
        3 * (1 - t) ** 2 * t * cp1Y +
        3 * (1 - t) * t ** 2 * cp2Y +
        t ** 3 * endY;

      // Active completed path
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + (cp1X - startX) * t,
        startY + (cp1Y - startY) * t,
        cp1X + (cp2X - cp1X) * t,
        cp1Y + (cp2Y - cp1Y) * t,
        riderX,
        riderY
      );
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#FFB000';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Store Location Pin
      ctx.fillStyle = '#E6391F';
      ctx.beginPath();
      ctx.arc(startX, startY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '9px monospace';
      ctx.fillText('LAB #03', startX - 18, startY + 18);

      // Destination Pin
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(endX, endY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('YOU', endX - 10, endY - 12);

      // Rider Marker with Pulsing Halo
      ctx.fillStyle = 'rgba(255, 106, 0, 0.35)';
      ctx.beginPath();
      ctx.arc(riderX, riderY, 14 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FF6A00';
      ctx.beginPath();
      ctx.arc(riderX, riderY, 6, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(renderMap);
    };

    renderMap();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ffc-red/20 border border-ffc-red/40 text-ffc-red text-xs font-mono font-bold uppercase tracking-widest">
          <Flame className="w-4 h-4 fill-ffc-red animate-pulse" />
          <span>AUTONOMOUS KITCHEN TELEMETRY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
          LIVE ORDER & FRYER COCKPIT 🔥
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-ffc-gold">
          <span>
            ORDER ID: <strong className="text-white">{orderId}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <strong className="text-emerald-400">TELEMETRY SYNCED</strong>
          </span>
          <span>•</span>
          <span>ESTIMATED TIME: 20–25 MINS</span>
        </div>
      </div>

      {/* AUTOMATION CONTROLLER BAR */}
      <div className="p-3.5 rounded-2xl bg-ffc-black/90 border border-ffc-cardBorder flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoProgressing(!isAutoProgressing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              isAutoProgressing
                ? 'bg-ffc-gold text-ffc-black shadow-gold'
                : 'bg-ffc-card border border-ffc-cardBorder text-ffc-smoke hover:text-white'
            }`}
          >
            {isAutoProgressing ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>AUTOMATION: RUNNING</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>AUTOMATION: PAUSED</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-mono text-ffc-smoke hidden sm:inline">
            Cycles stages every 7s with synthesized telemetry & audio
          </span>
        </div>

        {/* Manual step overrides */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono text-ffc-smoke mr-1">JUMP:</span>
          {stages.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStageIdx(idx);
                triggerStageSounds(idx);
              }}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                currentStageIdx === idx
                  ? 'bg-ffc-red text-white shadow-fire'
                  : 'bg-ffc-card text-ffc-cream/70 hover:text-white'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* SPECIAL ACTIVE STAGE SPOTLIGHT CARD */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#1C100D] via-[#140E0C] to-ffc-charcoal border border-ffc-red/50 p-6 sm:p-8 shadow-[0_0_60px_rgba(230,57,31,0.25)] overflow-hidden">
        {/* Background Sizzling Fire Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-ffc-red/20 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Animated Stage Visual */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Boiling Oil Ring Glow */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-ffc-gold/60 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-ffc-red via-ffc-orange to-ffc-gold opacity-25 blur-md animate-pulse" />

              <div className="relative w-32 h-32 animate-sizzle">
                <Image
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop"
                  alt="Chicken stage"
                  fill
                  className="object-contain filter drop-shadow-[0_10px_20px_#E6391F]"
                />
              </div>

              {/* Sparks and Smoke Badges */}
              <span className="absolute -top-1 -right-1 bg-ffc-red text-white text-[9px] font-mono font-black px-2.5 py-0.5 rounded shadow-fire animate-bounce-short">
                {oilTemp}°C OIL
              </span>
            </div>
            <span className="text-[11px] font-mono text-ffc-gold uppercase mt-3 font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-ffc-red animate-pulse" />
              AUTONOMOUS FRY LAB #03
            </span>
          </div>

          {/* Current Status Info & Live Gauges */}
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ffc-gold font-bold">
                STAGE 0{currentStageIdx + 1} OF 06 • {stages[currentStageIdx].duration}
              </span>
              <span className="text-[10px] font-mono bg-ffc-red/20 text-ffc-red px-2 py-0.5 rounded border border-ffc-red/30">
                ACTIVE TELEMETRY
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
              {stages[currentStageIdx].title}
            </h2>
            <p className="text-xs sm:text-sm text-ffc-cream/80 font-sans leading-relaxed">
              {stages[currentStageIdx].desc}
            </p>

            {/* Micro Live Telemetry Indicators */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] font-mono text-ffc-smoke uppercase block">OIL TEMP</span>
                <span className="text-sm font-mono font-black text-ffc-red">{oilTemp}°C</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] font-mono text-ffc-smoke uppercase block">CRUNCH PEAK</span>
                <span className="text-sm font-mono font-black text-ffc-gold">{decibels} dB</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] font-mono text-ffc-smoke uppercase block">OIL PURITY</span>
                <span className="text-sm font-mono font-black text-emerald-400">99.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column: Live GPS Map Radar & Autonomous Event Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: GPS Live Route Radar Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-ffc-gold animate-pulse" />
              <h3 className="text-sm font-black font-display text-white uppercase">
                LIVE EV RUNNER RADAR (ATHER 450X)
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">{speedKmh} KM/H</span>
          </div>

          <div className="relative w-full h-48 bg-black/60 rounded-2xl overflow-hidden border border-white/5">
            <canvas ref={mapCanvasRef} className="w-full h-full" />
            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-ffc-gold">
              DISTANCE REMAINING: {distanceKm} KM
            </div>
          </div>

          {/* Rider Profile Card */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-ffc-gold">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                  alt="Delivery Rider"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-ffc-gold block font-bold">
                  ASSIGNED FRY RUNNER
                </span>
                <h4 className="text-xs font-black font-display text-white">Vikas Kumar</h4>
                <span className="text-[11px] text-ffc-smoke font-mono">
                  Ather 450X (EV) • 4.9 ★ (1,420+ Feasts)
                </span>
              </div>
            </div>

            <a
              href="tel:+919845019283"
              className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>CALL</span>
            </a>
          </div>
        </div>

        {/* Right: Autonomous Live Event Terminal Log (5 cols) */}
        <div className="lg:col-span-5 bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-6 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-ffc-red animate-pulse" />
                <h3 className="text-sm font-black font-display text-white uppercase">
                  AUTONOMOUS LOG FEED
                </h3>
              </div>
              <span className="text-[10px] font-mono text-ffc-smoke">STREAM ACTIVE</span>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-52 overflow-y-auto pr-1 mt-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-start gap-2"
                >
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-ffc-gold/20 text-ffc-gold shrink-0">
                    {log.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-ffc-smoke block">{log.time}</span>
                    <p className="text-white text-[11px] leading-tight mt-0.5">{log.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-ffc-smoke">
            <span>FFC KITCHEN ENGINE V2.4</span>
            <span className="text-emerald-400">● 100% QUALITY VERIFIED</span>
          </div>
        </div>
      </div>

      {/* 6-Step Timeline Progression */}
      <div className="bg-ffc-card/70 border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-black font-display uppercase tracking-tight text-white">
          ORDER PROGRESS TIMELINE
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stages.map((s, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={s.id}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
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
                    <h4 className="text-xs font-black font-display uppercase tracking-tight text-white">
                      {s.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[9px] font-mono font-bold text-ffc-gold animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ffc-cream/70 font-sans mt-0.5 leading-tight">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
