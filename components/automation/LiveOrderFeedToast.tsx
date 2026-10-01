'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Sparkles, X, ChevronRight, Volume2, VolumeX, Eye, Activity } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface LiveFeedItem {
  id: string;
  customerName: string;
  location: string;
  itemTitle: string;
  itemType: 'custom' | 'menu';
  image: string;
  spiceBadge?: string;
  crunchFactor?: string;
  price: number;
  timeAgo: string;
  linkUrl: string;
}

const SAMPLE_LIVE_EVENTS: Omit<LiveFeedItem, 'id' | 'timeAgo'>[] = [
  {
    customerName: 'Aarav M.',
    location: 'Indiranagar, Bengaluru',
    itemTitle: 'Inferno Double-Crunch Strips (Ghost Fire L5)',
    itemType: 'custom',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '🔥 L5 GHOST FIRE',
    crunchFactor: '135 dB Crunch',
    price: 489,
    linkUrl: '/make-your-chicken',
  },
  {
    customerName: 'Rohan & Squad',
    location: 'Bandra West, Mumbai',
    itemTitle: 'Friends Ultimate Feast Barrel (12 Pcs + 3 Sides)',
    itemType: 'menu',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '⚡ MEDIUM SPICE',
    crunchFactor: '120 dB Crunch',
    price: 1149,
    linkUrl: '/menu#ffc-friends-ultimate-bucket',
  },
  {
    customerName: 'Sneha K.',
    location: 'Cyber Hub, Gurugram',
    itemTitle: 'Honey Heat Blistered Wings + Garlic Herb Dip',
    itemType: 'custom',
    image: 'https://images.unsplash.com/photo-1527477321055-4345dd597c62?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '🍯 HONEY HEAT',
    crunchFactor: '110 dB Crisp',
    price: 389,
    linkUrl: '/make-your-chicken',
  },
  {
    customerName: 'Vikram S.',
    location: 'Koramangala, Bengaluru',
    itemTitle: 'Fire Crunch Double Fillet Burger + Crinkle Fries',
    itemType: 'menu',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '🔥 L4 EXTRA HOT',
    crunchFactor: '125 dB Crunch',
    price: 449,
    linkUrl: '/menu#ffc-fire-crunch-burger',
  },
  {
    customerName: 'Pooja R.',
    location: 'Juhu, Mumbai',
    itemTitle: 'Smoky Peri Tenders + Jalapeno Cream Drizzle',
    itemType: 'custom',
    image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '🌶️ PERI PERI',
    crunchFactor: '115 dB Crisp',
    price: 369,
    linkUrl: '/make-your-chicken',
  },
  {
    customerName: 'Kabir D.',
    location: 'Connaught Place, Delhi',
    itemTitle: 'Blistered Fire Wings Box (8 Pcs)',
    itemType: 'menu',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400&auto=format&fit=crop',
    spiceBadge: '🔥 L4 HOT',
    crunchFactor: '130 dB Crunch',
    price: 379,
    linkUrl: '/menu#ffc-peri-wings-8',
  },
];

export function LiveOrderFeedToast() {
  const [currentToast, setCurrentToast] = useState<LiveFeedItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFryersCount, setActiveFryersCount] = useState(24);
  const [isExpanded, setIsExpanded] = useState(false);

  // Micro-fluctuate active fryer counter to look organically alive
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFryersCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.max(18, Math.min(36, prev + delta));
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const showNextToast = useCallback(() => {
    if (isPaused) return;

    // Pick random item
    const randomEvent = SAMPLE_LIVE_EVENTS[Math.floor(Math.random() * SAMPLE_LIVE_EVENTS.length)];
    const secondsAgo = Math.floor(Math.random() * 25) + 3;

    const newToast: LiveFeedItem = {
      ...randomEvent,
      id: `toast-${Date.now()}`,
      timeAgo: `${secondsAgo}s ago`,
    };

    setCurrentToast(newToast);
    setIsVisible(true);
    soundManager.playNotificationPing();

    // Auto-hide after 5.5s
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 5500);

    return () => clearTimeout(hideTimeout);
  }, [isPaused]);

  useEffect(() => {
    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      showNextToast();
    }, 3500);

    // Repeating interval every 12-18 seconds
    const interval = setInterval(() => {
      showNextToast();
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showNextToast]);

  return (
    <div
      className="fixed bottom-4 left-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 select-none pointer-events-none"
      aria-live="polite"
    >
      {/* 1. Live Kitchen HQ Activity Bar */}
      <div className="mb-2 pointer-events-auto flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-ffc-charcoal/90 backdrop-blur-md border border-ffc-cardBorder shadow-lg text-[10px] font-mono text-ffc-cream/80">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-white">LIVE FRY LABS:</span>
          <span className="text-ffc-gold font-bold">{activeFryersCount} ORDERS SIZZLING</span>
        </div>

        <Link
          href="/admin"
          className="text-ffc-smoke hover:text-ffc-gold transition-colors flex items-center gap-0.5"
          title="Open Kitchen Command Center"
        >
          <Activity className="w-3 h-3 text-ffc-red animate-pulse" />
          <span className="hidden sm:inline">OPS HQ</span>
        </Link>
      </div>

      {/* 2. Automated Live Order Popup Toast */}
      {currentToast && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#181210] to-[#1F1614] border border-ffc-red/40 p-3.5 shadow-[0_10px_35px_rgba(230,57,31,0.28)] backdrop-blur-xl transition-all duration-500 transform ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          {/* Subtle Flame Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-ffc-red/15 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-ffc-smoke hover:text-white hover:bg-white/10 transition-colors z-20"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-3 relative z-10">
            {/* Food Thumbnail */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-ffc-cardBorder shrink-0 bg-black/40">
              <Image
                src={currentToast.image}
                alt={currentToast.itemTitle}
                fill
                className="object-cover"
              />
              {currentToast.itemType === 'custom' && (
                <span className="absolute bottom-0 inset-x-0 bg-ffc-red/90 text-white text-[8px] font-mono font-black text-center py-0.2">
                  CUSTOM LAB
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="font-bold text-white truncate max-w-[120px]">
                  {currentToast.customerName}
                </span>
                <span className="text-ffc-smoke">•</span>
                <span className="text-ffc-gold truncate">{currentToast.location}</span>
              </div>

              <h4 className="text-xs font-black font-display text-white truncate mt-0.5">
                {currentToast.itemTitle}
              </h4>

              {/* Tags & Price Row */}
              <div className="flex items-center gap-2 mt-1.5">
                {currentToast.spiceBadge && (
                  <span className="text-[9px] font-mono font-bold bg-ffc-red/20 text-ffc-red border border-ffc-red/30 px-1.5 py-0.5 rounded">
                    {currentToast.spiceBadge}
                  </span>
                )}
                {currentToast.crunchFactor && (
                  <span className="text-[9px] font-mono text-ffc-gold hidden sm:inline">
                    {currentToast.crunchFactor}
                  </span>
                )}
                <span className="text-[10px] font-mono text-ffc-smoke ml-auto">
                  {currentToast.timeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-ffc-cream/70 text-[10px]">
              {currentToast.itemType === 'custom' ? '⚡ Freshly Dredged & Fried' : '🛵 Out for Delivery'}
            </span>
            <Link
              href={currentToast.linkUrl}
              onClick={() => setIsVisible(false)}
              className="text-ffc-gold hover:text-white font-bold flex items-center gap-0.5 hover:underline"
            >
              <span>{currentToast.itemType === 'custom' ? 'Create Similar' : 'Order Now'}</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
