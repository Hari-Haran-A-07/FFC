'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, MealAddon } from '@/types';
import { useCart } from '@/context/CartContext';
import { Modal } from '@/components/ui/Modal';
import { VegIndicator } from '@/components/ui/Badge';
import { HeatMeter } from '@/components/ui/HeatMeter';
import { MEAL_ADDONS } from '@/data/customizer-options';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Plus, Minus, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<MealAddon[]>([]);

  if (!product) return null;

  const mealUpsells = MEAL_ADDONS.slice(0, 4); // Fries, Peri Fries, Coke, Dip

  const toggleAddon = (addon: MealAddon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addProduct(product, quantity, selectedAddons);
    onClose();
    // reset local modal state
    setQuantity(1);
    setSelectedAddons([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6">
        {/* Product Top Visual & Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 relative aspect-square rounded-2xl overflow-hidden bg-ffc-black border border-ffc-cardBorder">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-ffc-red text-white text-[10px] font-mono font-black px-2.5 py-1 rounded-full shadow-fire">
                {product.badge}
              </span>
            )}
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <VegIndicator isVeg={product.isVeg} />
              <span className="text-xs font-mono uppercase text-ffc-smoke tracking-wider">
                {product.categoryLabel}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-display text-ffc-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-ffc-smoke line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-ffc-cream/80 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
              {product.calories && (
                <span className="px-2.5 py-1 rounded-lg bg-ffc-card border border-ffc-cardBorder text-ffc-cream">
                  🔥 {product.calories} kcal
                </span>
              )}
              {product.serves && (
                <span className="px-2.5 py-1 rounded-lg bg-ffc-card border border-ffc-cardBorder text-ffc-cream">
                  👥 {product.serves}
                </span>
              )}
              {product.pieces && (
                <span className="px-2.5 py-1 rounded-lg bg-ffc-card border border-ffc-cardBorder text-ffc-gold">
                  🍗 {product.pieces}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Heat Meter & Ingredients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-ffc-card/60 border border-ffc-cardBorder text-xs">
          <div>
            <span className="text-[10px] font-mono text-ffc-smoke uppercase block mb-1">
              SPICE CALIBRATION
            </span>
            <HeatMeter level={product.spiceLevel} size="sm" />
          </div>

          <div>
            <span className="text-[10px] font-mono text-ffc-smoke uppercase block mb-1">
              ALLERGEN & DIETARY
            </span>
            <span className="text-ffc-cream/80 font-sans">
              {product.allergens?.join(', ') || 'No common allergens specified'}
            </span>
          </div>
        </div>

        {/* MAKE IT A MEAL (Upsell Addons) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-ffc-gold uppercase tracking-wider">
              MAKE IT A FEAST (OPTIONAL ADD-ONS)
            </span>
            <span className="text-[10px] font-mono text-ffc-smoke">Select any pairing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {mealUpsells.map((addon) => {
              const isSelected = selectedAddons.some((a) => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-ffc-gold/15 border-ffc-gold text-white'
                      : 'bg-ffc-card/70 border-ffc-cardBorder hover:border-ffc-gold/40'
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image src={addon.image} alt={addon.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-white block truncate">
                      {addon.name}
                    </span>
                    <span className="text-[10px] font-mono text-ffc-gold">
                      +{formatPrice(addon.price)}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-ffc-gold text-ffc-black flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ffc-cardBorder/60">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2 bg-ffc-card px-2.5 py-1.5 rounded-xl border border-ffc-cardBorder">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-ffc-surface hover:bg-ffc-cardHover flex items-center justify-center text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-mono font-bold text-white w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-ffc-gold text-ffc-black flex items-center justify-center font-bold"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            <div className="text-right sm:text-left">
              <span className="text-[10px] font-mono uppercase text-ffc-smoke block">TOTAL</span>
              <span className="text-xl font-black font-display text-ffc-gold">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {product.isCustomizable && (
              <Link
                href="/make-your-chicken"
                onClick={onClose}
                className="flex-1 sm:flex-initial py-3.5 px-4 rounded-2xl bg-ffc-surface hover:bg-ffc-card border border-ffc-gold/50 text-xs font-mono font-bold text-ffc-gold flex items-center justify-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>OPEN IN FRY LAB</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial py-3.5 px-6 rounded-2xl bg-gradient-to-r from-ffc-red via-ffc-orange to-ffc-gold text-white font-black font-display text-sm uppercase tracking-wider shadow-fire hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 fill-current" />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
