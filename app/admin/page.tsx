'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { STORES } from '@/data/stores';
import { formatPrice } from '@/lib/utils';
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
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'kitchen' | 'products' | 'stores'>('orders');

  const liveOrders = [
    {
      id: 'FFC-ORD-92819',
      customer: 'Priya N.',
      type: 'Custom Chicken (Fire BBQ Strips)',
      itemsCount: 3,
      amount: 649,
      status: 'Frying in Oil',
      statusColor: 'text-ffc-orange',
      time: '2 mins ago',
    },
    {
      id: 'FFC-ORD-92818',
      customer: 'Karan M.',
      type: 'Friends Ultimate Feast Barrel',
      itemsCount: 5,
      amount: 1149,
      status: 'Out for Delivery',
      statusColor: 'text-emerald-400',
      time: '8 mins ago',
    },
    {
      id: 'FFC-ORD-92817',
      customer: 'Ananya S.',
      type: 'Custom Wings (Ghost Fire L5)',
      itemsCount: 2,
      amount: 429,
      status: 'Order Received',
      statusColor: 'text-ffc-gold',
      time: '12 mins ago',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ffc-cardBorder/60 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black bg-ffc-red/20 text-ffc-red px-2.5 py-0.5 rounded-full border border-ffc-red/40">
              KITCHEN HQ & OPERATIONS
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mt-1">
            FFC COMMAND CENTER
          </h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-ffc-card p-1 rounded-2xl border border-ffc-cardBorder">
          {[
            { id: 'orders', label: 'LIVE ORDERS', icon: ShoppingBag },
            { id: 'kitchen', label: 'FRYERS & OIL', icon: Flame },
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
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            TODAY&apos;S ORDERS
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-white mt-1 block">
            348
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">↑ 24% vs yesterday</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            CUSTOM CREATIONS RATIO
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-ffc-gold mt-1 block">
            68.4%
          </span>
          <span className="text-[11px] text-ffc-gold font-mono">High customizer adoption</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            AVG FRY & PACK DURATION
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-white mt-1 block">
            9.2 MIN
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">⚡ 100% on-time target</span>
        </div>

        <div className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder">
          <span className="text-[10px] font-mono text-ffc-smoke uppercase block">
            TOP SPICE LEVEL
          </span>
          <span className="text-2xl sm:text-3xl font-black font-display text-ffc-red mt-1 block">
            L04 HOT
          </span>
          <span className="text-[11px] text-ffc-smoke font-mono">38% of all custom orders</span>
        </div>
      </div>

      {/* TAB 1: LIVE ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-ffc-card/60 border border-ffc-cardBorder rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h2 className="text-base font-black font-display uppercase text-white">
              INCOMING REAL-TIME TICKETS
            </h2>
            <span className="text-xs font-mono text-ffc-gold font-bold">
              ⚡ LIVE POLLING ACTIVE
            </span>
          </div>

          <div className="space-y-3">
            {liveOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-ffc-surface border border-ffc-cardBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono font-bold text-white">{ord.id}</span>
                    <span className="text-xs text-ffc-cream/70 font-sans">• {ord.customer}</span>
                  </div>
                  <p className="text-xs text-ffc-gold font-display font-bold">{ord.type}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
                  <span className="font-bold text-white">{formatPrice(ord.amount)}</span>
                  <span className={`font-bold px-2.5 py-1 rounded-full bg-ffc-card border border-white/10 ${ord.statusColor}`}>
                    ● {ord.status}
                  </span>
                  <span className="text-ffc-smoke">{ord.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KITCHEN FRYERS & OIL STATUS */}
      {activeTab === 'kitchen' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'FRYER #01', type: 'Crispy Strips & Tenders', temp: '175°C', health: 'Optimal', oilHours: '12h / 48h', status: 'Active Frying' },
            { id: 'FRYER #02', type: 'Bone-In Golden Chicken', temp: '176°C', health: 'Optimal', oilHours: '16h / 48h', status: 'Active Frying' },
            { id: 'FRYER #03', type: 'Ghost Fire Wings', temp: '174°C', health: 'Optimal', oilHours: '8h / 48h', status: 'Batch Dredge' },
            { id: 'FRYER #04 (VEG)', type: 'Paneer & Cheese Bites', temp: '172°C', health: 'Pure Veg Standard', oilHours: '10h / 48h', status: 'Idle Ready' },
          ].map((f) => (
            <div key={f.id} className="p-5 rounded-3xl bg-ffc-card/70 border border-ffc-cardBorder space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-ffc-gold">{f.id}</span>
                <Flame className="w-4 h-4 text-ffc-red fill-ffc-red animate-pulse" />
              </div>
              <h3 className="text-sm font-black font-display text-white uppercase">{f.type}</h3>
              <div className="space-y-1 text-xs font-mono text-ffc-cream/70 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span className="text-emerald-400 font-bold">{f.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Oil Quality:</span>
                  <span>{f.health}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-ffc-gold font-bold">{f.status}</span>
                </div>
              </div>
            </div>
          ))}
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
                  OPEN
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
