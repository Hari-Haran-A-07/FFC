'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';
import { STORES } from '@/data/stores';
import { formatPrice } from '@/lib/utils';
import { soundManager } from '@/lib/sound';
import {
  Flame,
  ShoppingBag,
  TrendingUp,
  Sliders,
  Store,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Play,
  Pause,
  Plus,
  Radio,
  Zap,
  Activity,
  Droplets,
  RotateCcw,
} from 'lucide-react';

interface LiveOrderTicket {
  id: string;
  customer: string;
  city: string;
  type: string;
  itemsCount: number;
  amount: number;
  status: 'Order Received' | 'Kitchen Started' | 'Frying in Oil' | 'Packed & Sealed' | 'Out for Delivery' | 'Delivered';
  statusColor: string;
  timeAgo: string;
  fryerId?: string;
}

interface FryerState {
  id: string;
  name: string;
  temp: number;
  targetTemp: number;
  oilHealth: number; // percentage
  status: 'Active Frying' | 'Batch Dredge' | 'Idle Ready' | 'Auto-Filtering';
  currentBatch: string;
  batchSecondsRemaining: number;
  isVeg: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'kitchen' | 'products' | 'stores'>('orders');
  const [isAutomationActive, setIsAutomationActive] = useState<boolean>(true);
  const [totalOrdersToday, setTotalOrdersToday] = useState<number>(352);
  const [totalRevenueToday, setTotalRevenueToday] = useState<number>(184290);

  // Live Orders Stream
  const [orders, setOrders] = useState<LiveOrderTicket[]>([
    {
      id: 'FFC-ORD-94825',
      customer: 'Aarav M.',
      city: 'Indiranagar, BLR',
      type: 'Custom Chicken (Inferno L5 Ghost Fire Strips)',
      itemsCount: 3,
      amount: 489,
      status: 'Frying in Oil',
      statusColor: 'text-ffc-orange',
      timeAgo: 'Just now',
      fryerId: 'FRYER #01',
    },
    {
      id: 'FFC-ORD-94824',
      customer: 'Sneha K.',
      city: 'Cyber Hub, GGN',
      type: 'Honey Heat Blistered Wings + Garlic Dip',
      itemsCount: 2,
      amount: 389,
      status: 'Kitchen Started',
      statusColor: 'text-ffc-gold',
      timeAgo: '1m ago',
      fryerId: 'FRYER #03',
    },
    {
      id: 'FFC-ORD-94823',
      customer: 'Rohan & Squad',
      city: 'Bandra West, MUM',
      type: 'Friends Ultimate Feast Barrel (12 Pcs)',
      itemsCount: 5,
      amount: 1149,
      status: 'Out for Delivery',
      statusColor: 'text-emerald-400',
      timeAgo: '4m ago',
    },
    {
      id: 'FFC-ORD-94822',
      customer: 'Priya N.',
      city: 'Koramangala, BLR',
      type: 'Fire Crunch Double Fillet Burger Meal',
      itemsCount: 2,
      amount: 449,
      status: 'Packed & Sealed',
      statusColor: 'text-blue-400',
      timeAgo: '7m ago',
    },
  ]);

  // Fryers Matrix
  const [fryers, setFryers] = useState<FryerState[]>([
    {
      id: 'FRYER #01',
      name: 'Crispy Strips & Tenders',
      temp: 175.2,
      targetTemp: 175.0,
      oilHealth: 96,
      status: 'Active Frying',
      currentBatch: 'Inferno Ghost Fire Strips (Batch #49)',
      batchSecondsRemaining: 142,
      isVeg: false,
    },
    {
      id: 'FRYER #02',
      name: 'Bone-In Golden Chicken',
      temp: 176.1,
      targetTemp: 176.0,
      oilHealth: 92,
      status: 'Active Frying',
      currentBatch: 'Ultimate Golden Feast (Batch #50)',
      batchSecondsRemaining: 215,
      isVeg: false,
    },
    {
      id: 'FRYER #03',
      name: 'Ghost Fire Wings Lab',
      temp: 174.8,
      targetTemp: 175.0,
      oilHealth: 98,
      status: 'Batch Dredge',
      currentBatch: 'Blistered Fire Wings (Batch #51)',
      batchSecondsRemaining: 0,
      isVeg: false,
    },
    {
      id: 'FRYER #04 (VEG)',
      name: 'Pure Veg Standard Fryer',
      temp: 172.5,
      targetTemp: 172.0,
      oilHealth: 99,
      status: 'Idle Ready',
      currentBatch: 'Awaiting Paneer & Cheese Bites',
      batchSecondsRemaining: 0,
      isVeg: true,
    },
  ]);

  // Automated Incoming Orders Generator
  useEffect(() => {
    if (!isAutomationActive) return;

    const sampleCustomers = ['Ananya S.', 'Vikram R.', 'Kabir D.', 'Meera P.', 'Aditya T.', 'Zara H.', 'Rishi N.'];
    const sampleCities = ['Indiranagar, BLR', 'Bandra, MUM', 'Cyber Hub, GGN', 'Koramangala, BLR', 'Powai, MUM'];
    const sampleItems = [
      { type: 'Custom Chicken (Double Crunch Peri Strips)', amount: 469 },
      { type: 'Friends Midnight Feast Box', amount: 899 },
      { type: 'Ghost Fire Hot Wings (8 Pcs)', amount: 379 },
      { type: 'Honey Heat Fillet Burger + Molten Lava', amount: 529 },
      { type: 'Custom Bone-In Golden Crunch (Level 5 Fire)', amount: 619 },
    ];

    const orderInterval = setInterval(() => {
      const cust = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
      const city = sampleCities[Math.floor(Math.random() * sampleCities.length)];
      const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
      const newId = `FFC-ORD-${Math.floor(Math.random() * 80000 + 10000)}`;

      const newOrder: LiveOrderTicket = {
        id: newId,
        customer: cust,
        city: city,
        type: item.type,
        itemsCount: Math.floor(Math.random() * 3) + 1,
        amount: item.amount,
        status: 'Order Received',
        statusColor: 'text-ffc-gold',
        timeAgo: 'Just now',
      };

      setOrders((prev) => [newOrder, ...prev.slice(0, 7)]);
      setTotalOrdersToday((prev) => prev + 1);
      setTotalRevenueToday((prev) => prev + item.amount);
      soundManager.playTicketPrint();
    }, 7500);

    return () => clearInterval(orderInterval);
  }, [isAutomationActive]);

  // Automated Fryer Temperature & Timer Oscillations
  useEffect(() => {
    const fryerInterval = setInterval(() => {
      setFryers((prev) =>
        prev.map((f) => {
          // Micro-fluctuate temp
          const jitter = (Math.random() - 0.5) * 0.4;
          const newTemp = parseFloat((f.targetTemp + jitter).toFixed(1));

          // Decrement countdown
          let newRemaining = f.batchSecondsRemaining > 0 ? f.batchSecondsRemaining - 1 : 0;
          let newStatus = f.status;

          if (f.status === 'Active Frying' && newRemaining === 0) {
            newStatus = 'Idle Ready';
            soundManager.playAchievementFanfare();
          }

          return {
            ...f,
            temp: newTemp,
            batchSecondsRemaining: newRemaining,
            status: newStatus,
          };
        })
      );
    }, 1000);

    return () => clearInterval(fryerInterval);
  }, []);

  // Action: Manual Trigger New Fry Batch
  const triggerFryBatch = (fryerId: string) => {
    soundManager.playOilDrop();
    soundManager.playSizzle();
    setFryers((prev) =>
      prev.map((f) =>
        f.id === fryerId
          ? {
              ...f,
              status: 'Active Frying',
              batchSecondsRemaining: 180,
              currentBatch: 'Simulated Hot Batch Submerged',
            }
          : f
      )
    );
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ffc-cardBorder/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black bg-ffc-red/20 text-ffc-red px-2.5 py-0.5 rounded-full border border-ffc-red/40 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-ffc-red animate-pulse" />
              LIVE AUTOMATED DISPATCH HQ
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mt-1">
            FFC OPERATIONS COMMAND CENTER
          </h1>
        </div>

        {/* Automation Master Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutomationActive(!isAutomationActive)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono font-bold transition-all border ${
              isAutomationActive
                ? 'bg-ffc-gold text-ffc-black border-ffc-gold shadow-gold'
                : 'bg-ffc-card border-ffc-cardBorder text-ffc-smoke'
            }`}
          >
            {isAutomationActive ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>SIMULATOR: AUTO (7s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>SIMULATOR: PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            TODAY&apos;S ORDERS (LIVE)
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-white mt-1 block">
            {totalOrdersToday}
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">↑ Live Stream Active</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            LIVE REVENUE TICKER
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-ffc-gold mt-1 block">
            {formatPrice(totalRevenueToday)}
          </span>
          <span className="text-[11px] text-ffc-gold font-mono">Real-time GMV calculation</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            CUSTOM CREATIONS RATIO
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-ffc-red mt-1 block">
            71.8%
          </span>
          <span className="text-[11px] text-ffc-smoke font-mono">High Lab customizer usage</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            ACTIVE OIL PURITY
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-emerald-400 mt-1 block">
            96.4%
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">⚡ 175°C Calibrated PID</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 bg-ffc-card p-1 rounded-2xl border border-ffc-cardBorder w-fit">
        {[
          { id: 'orders', label: 'LIVE ORDERS STREAM', icon: ShoppingBag },
          { id: 'kitchen', label: 'AUTONOMOUS FRYERS', icon: Flame },
          { id: 'products', label: 'MENU & PRICING', icon: Layers },
          { id: 'stores', label: 'FLAGSHIP LABS', icon: Store },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-ffc-red text-white shadow-fire'
                  : 'text-ffc-smoke hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE ORDERS STREAM */}
      {activeTab === 'orders' && (
        <div className="bg-ffc-card/60 border border-ffc-cardBorder rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black font-display uppercase text-white">
                INCOMING REAL-TIME TICKETS ({orders.length})
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-xs font-mono text-ffc-gold font-bold">
              ⚡ THERMAL POS SYNCED
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-ffc-surface border border-ffc-cardBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-bold text-white">{ord.id}</span>
                    <span className="text-xs text-ffc-cream/70 font-sans">• {ord.customer}</span>
                    <span className="text-[10px] font-mono text-ffc-gold bg-ffc-gold/15 px-2 py-0.2 rounded border border-ffc-gold/30">
                      {ord.city}
                    </span>
                  </div>
                  <p className="text-xs text-ffc-gold font-display font-bold">{ord.type}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
                  <span className="font-bold text-white">{formatPrice(ord.amount)}</span>
                  <span className={`font-bold px-2.5 py-1 rounded-full bg-ffc-card border border-white/10 ${ord.statusColor}`}>
                    ● {ord.status}
                  </span>
                  <span className="text-ffc-smoke">{ord.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AUTONOMOUS FRYERS & OIL TELEMETRY */}
      {activeTab === 'kitchen' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fryers.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-ffc-gold">{f.id}</span>
                  <Flame className="w-4 h-4 text-ffc-red fill-ffc-red animate-pulse" />
                </div>

                <div>
                  <h3 className="text-sm font-black font-display text-white uppercase">{f.name}</h3>
                  <p className="text-[11px] text-ffc-smoke font-mono truncate mt-0.5">
                    {f.currentBatch}
                  </p>
                </div>

                {/* Telemetry rows */}
                <div className="space-y-1.5 text-xs font-mono text-ffc-cream/70 pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Temperature (PID):</span>
                    <span className="text-ffc-red font-bold">{f.temp}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oil Health:</span>
                    <span className="text-emerald-400 font-bold">{f.oilHealth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Batch Timer:</span>
                    <span className="text-ffc-gold font-bold">
                      {f.batchSecondsRemaining > 0
                        ? `${Math.floor(f.batchSecondsRemaining / 60)}m ${f.batchSecondsRemaining % 60}s`
                        : 'COMPLETED'}
                    </span>
                  </div>
                </div>

                {/* Fryer Action */}
                <button
                  type="button"
                  onClick={() => triggerFryBatch(f.id)}
                  className="w-full py-2 rounded-xl bg-ffc-surface hover:bg-ffc-red hover:text-white border border-ffc-cardBorder text-[11px] font-mono font-bold text-ffc-gold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5" />
                  SUBMERGE BATCH
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MENU & PRICING */}
      {activeTab === 'products' && (
        <div className="bg-ffc-card/60 border border-ffc-cardBorder rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-black font-display uppercase text-white pb-3 border-b border-white/5">
            ALL MENU PRODUCTS & LIVE INVENTORY ({PRODUCTS.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-ffc-surface border border-ffc-cardBorder flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate font-display uppercase">
                    {p.name}
                  </h4>
                  <span className="text-[10px] font-mono text-ffc-smoke capitalize">
                    {p.categoryLabel}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-ffc-gold block">
                    {formatPrice(p.price)}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">IN STOCK</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STORES */}
      {activeTab === 'stores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STORES.map((s) => (
            <div key={s.id} className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-display text-white uppercase">{s.name}</h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  OPEN & SIZZLING
                </span>
              </div>
              <p className="text-xs text-ffc-cream/70 font-sans">{s.address}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono text-ffc-smoke">
                <span>{s.hours}</span>
                <span>Rating: {s.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
