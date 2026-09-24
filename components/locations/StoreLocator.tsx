'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { STORES } from '@/data/stores';
import { StoreLocation } from '@/types';
import { useCart } from '@/context/CartContext';
import { MapPin, Search, Navigation, Phone, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function StoreLocator() {
  const { setDeliveryPincode, setOrderType } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORES[0]);
  const [locating, setLocating] = useState(false);

  const filteredStores = STORES.filter((store) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      store.name.toLowerCase().includes(q) ||
      store.city.toLowerCase().includes(q) ||
      store.area.toLowerCase().includes(q) ||
      store.pincode.includes(q)
    );
  });

  const handleUseLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setSelectedStore(STORES[0]);
      setDeliveryPincode(STORES[0].pincode);
      setLocating(false);
    }, 800);
  };

  const handleSelectStore = (store: StoreLocation) => {
    setSelectedStore(store);
    setDeliveryPincode(store.pincode);
  };

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-ffc-cardBorder/60">
        <div>
          <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black">
            FLAGSHIP FRY LABS & HUBS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight mt-1">
            FIND YOUR FFC
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans max-w-md">
          Visit our experiential food-tech arenas or order rapid delivery from our cloud kitchen network.
        </p>
      </div>

      {/* Search & Geo Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ffc-smoke" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city (e.g. Bengaluru, Mumbai, Gurugram) or pincode..."
            className="w-full bg-ffc-card border border-ffc-cardBorder rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-ffc-gold"
          />
        </div>

        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locating}
          className="px-5 py-3.5 rounded-2xl bg-ffc-surface hover:bg-ffc-card border border-ffc-cardBorder hover:border-ffc-gold text-xs font-mono font-bold text-ffc-gold flex items-center justify-center gap-2 shrink-0 transition-colors"
        >
          <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
          <span>{locating ? 'LOCATING...' : 'USE CURRENT GPS'}</span>
        </button>
      </div>

      {/* Stores Grid & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stores List (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => {
              const isSelected = selectedStore?.id === store.id;

              return (
                <div
                  key={store.id}
                  onClick={() => handleSelectStore(store)}
                  className={`p-5 rounded-3xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-ffc-surface border-ffc-gold shadow-gold ring-1 ring-ffc-gold/60'
                      : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        {store.isFlagship && (
                          <span className="text-[9px] font-mono font-black uppercase bg-ffc-red text-white px-2 py-0.5 rounded shadow-sm inline-block mb-1">
                            FLAGSHIP LAB
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-black font-display uppercase tracking-tight text-white">
                          {store.name}
                        </h3>
                        <span className="text-xs text-ffc-gold font-mono block">
                          {store.area}, {store.city} — {store.pincode}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-ffc-smoke bg-ffc-black/60 px-2.5 py-1 rounded-xl border border-white/5 shrink-0">
                        {store.distanceKm} km away
                      </span>
                    </div>

                    <p className="text-xs text-ffc-cream/70 font-sans leading-relaxed mt-2">
                      {store.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-ffc-cream/80">
                      <Clock className="w-3.5 h-3.5 text-ffc-gold" />
                      <span>{store.hours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400 font-bold">
                        ✓ Delivery & Pickup Active
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-ffc-card/40 border border-ffc-cardBorder rounded-3xl text-ffc-smoke text-xs font-mono">
              No stores matching &ldquo;{searchQuery}&rdquo;. Try another pincode.
            </div>
          )}
        </div>

        {/* Store Active Feature Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-ffc-card to-ffc-surface border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 sticky top-24">
          <div>
            <span className="text-[10px] font-mono text-ffc-gold uppercase tracking-widest block font-bold">
              SELECTED HUB SPECS
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight mt-1">
              {selectedStore.name}
            </h3>
            <p className="text-xs text-ffc-cream/80 font-sans mt-2">{selectedStore.address}</p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-ffc-cream">
              <Phone className="w-4 h-4 text-ffc-gold shrink-0" />
              <span>{selectedStore.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-ffc-cream">
              <Clock className="w-4 h-4 text-ffc-orange shrink-0" />
              <span>{selectedStore.hours}</span>
            </div>
            <div className="flex items-center gap-2 text-ffc-cream">
              <MapPin className="w-4 h-4 text-ffc-red shrink-0" />
              <span>Lat: {selectedStore.latitude}, Lng: {selectedStore.longitude}</span>
            </div>
          </div>

          {/* Interactive Delivery Status */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ffc-smoke">Estimated Delivery:</span>
              <span className="text-emerald-400 font-bold">25–35 Mins</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-ffc-smoke">Express Pickup:</span>
              <span className="text-ffc-gold font-bold">Ready in 12 Mins</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Link
              href="/menu"
              onClick={() => {
                setDeliveryPincode(selectedStore.pincode);
                setOrderType('delivery');
              }}
              className="w-full py-3.5 rounded-2xl bg-ffc-red hover:bg-ffc-redDark text-white font-black font-display text-xs uppercase tracking-wider text-center block shadow-fire active:scale-95 transition-all"
            >
              ORDER DELIVERY FROM HERE
            </Link>
            <Link
              href="/menu"
              onClick={() => {
                setDeliveryPincode(selectedStore.pincode);
                setOrderType('pickup');
              }}
              className="w-full py-3 rounded-2xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-ffc-cream font-mono text-xs font-bold uppercase tracking-wider text-center block transition-colors"
            >
              ORDER STORE PICKUP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
