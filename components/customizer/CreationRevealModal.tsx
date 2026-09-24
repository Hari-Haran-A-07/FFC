'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useCustomizer } from '@/context/CustomizerContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import {
  Sparkles,
  ShoppingBag,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Flame,
  CheckCircle2,
  X,
} from 'lucide-react';

export function CreationRevealModal() {
  const {
    isRevealModalOpen,
    closeRevealModal,
    getCustomizationObject,
    resetCustomizer,
    priceBreakdown,
  } = useCustomizer();

  const { addCustomChicken } = useCart();
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const customization = getCustomizationObject();

  useEffect(() => {
    if (isRevealModalOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E6391F', '#FF6A00', '#FFB000', '#FFF8F0'],
        });
      } catch {
        // Ignore
      }
    }
  }, [isRevealModalOpen]);

  if (!isRevealModalOpen) return null;

  const handleAddToCart = () => {
    addCustomChicken(customization);
    closeRevealModal();
  };

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/make-your-chicken?id=${customization.id}` : '';
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShareWhatsApp = () => {
    const text = `🔥 I just created "${customization.creationName}" at FFC (Friends Fried Chicken)! Try my custom crunch recipe: ${window.location.origin}/make-your-chicken?id=${customization.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Fire Backdrop */}
      <div
        onClick={closeRevealModal}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-fadeIn"
      />

      {/* Main Cinematic Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181210] to-ffc-charcoal border border-ffc-cardBorder rounded-3xl p-6 sm:p-8 z-10 shadow-[0_0_80px_rgba(230,57,31,0.25)] text-center my-8">
        {/* Close button */}
        <button
          onClick={closeRevealModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-ffc-smoke hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ffc-gold/20 border border-ffc-gold/40 text-ffc-gold text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          CREATION COMPLETE
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight">
          YOUR CHICKEN. YOUR CREATION.
        </h2>

        <div className="mt-1">
          <span className="text-lg sm:text-xl font-black font-display text-ffc-gold uppercase">
            &ldquo;{customization.creationName}&rdquo;
          </span>
          <span className="text-xs text-ffc-cream/70 font-mono block mt-0.5">
            Created by you • ID: <strong className="text-white">{customization.id}</strong>
          </span>
        </div>

        {/* Central Visual Showcase */}
        <div className="relative my-6 p-4 rounded-2xl bg-gradient-to-b from-ffc-surface to-ffc-card border border-ffc-cardBorder/80 shadow-inner flex flex-col sm:flex-row items-center gap-6 justify-center">
          {/* Chicken Image with glow */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0">
            <div className="absolute inset-0 bg-ffc-gold/20 rounded-full blur-xl animate-pulse" />
            <Image
              src={customization.chicken.image}
              alt={customization.creationName}
              fill
              className="object-contain drop-shadow-2xl relative z-10"
            />
          </div>

          {/* Key Stats / Tags */}
          <div className="text-left space-y-2 flex-1">
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <div className="p-2 rounded-xl bg-ffc-black/60 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-ffc-smoke block">CUT</span>
                <span className="font-bold text-white truncate block">
                  {customization.chicken.name}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-ffc-black/60 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-ffc-smoke block">CRUNCH</span>
                <span className="font-bold text-white truncate block">
                  {customization.crunch.name}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-ffc-black/60 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-ffc-smoke block">FLAVOUR</span>
                <span className="font-bold text-ffc-orange truncate block">
                  {customization.flavour.name}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-ffc-black/60 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-ffc-smoke block">SPICE</span>
                <span className="font-bold text-ffc-red truncate flex items-center gap-1">
                  L0{customization.spice.level} {customization.spice.name}
                  {customization.spice.level === 5 && <Flame className="w-3 h-3 fill-current" />}
                </span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-ffc-black/60 border border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-ffc-cream/70">
                Sauce: <strong className="text-white">{customization.sauce.name}</strong> ({customization.saucePlacement})
              </span>
              <span className="text-base font-black font-display text-ffc-gold">
                {formatPrice(customization.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-base uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 fill-current" />
            ADD TO CART & CHECKOUT ({formatPrice(customization.totalPrice)})
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-xs font-mono font-bold text-ffc-cream flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">LINK COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-ffc-gold" />
                  <span>COPY RECIPE LINK</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>SHARE WHATSAPP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetCustomizer();
                closeRevealModal();
              }}
              className="py-2.5 px-3 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-xs font-mono font-bold text-ffc-smoke hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CREATE ANOTHER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
