'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { VegIndicator } from '@/components/ui/Badge';
import { HeatMeter } from '@/components/ui/HeatMeter';
import { Plus, Check, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addProduct } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addProduct(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      data-cursor="food"
      data-cursor-label="VIEW"
      className="group relative bg-ffc-card/70 hover:bg-ffc-surface border border-ffc-cardBorder hover:border-ffc-gold/50 rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-card hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      {/* Top Media & Badges */}
      <div>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-ffc-black mb-4 border border-white/5 group-hover:border-ffc-gold/30 transition-colors">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Top Left Badge */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-ffc-red text-white text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full shadow-fire">
              {product.badge}
            </span>
          )}

          {/* Top Right Dietary / Spice Indicator */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            <VegIndicator isVeg={product.isVeg} />
            {product.spiceLevel > 0 && (
              <span className="text-[10px] font-mono text-ffc-gold font-bold">
                🌶️ L{product.spiceLevel}
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase text-ffc-smoke tracking-wider">
              {product.categoryLabel}
            </span>
            {product.serves && (
              <span className="text-[10px] font-mono text-ffc-cream/60">{product.serves}</span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black font-display uppercase tracking-tight text-white group-hover:text-ffc-gold transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-ffc-cream/65 font-sans line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <div>
          <span className="text-base sm:text-lg font-black font-display text-ffc-gold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ffc-smoke line-through ml-1.5 font-mono">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {product.isCustomizable && (
            <Link
              href="/make-your-chicken"
              onClick={(e) => e.stopPropagation()}
              data-cursor="pointer"
              data-cursor-label="LAB"
              className="p-2 rounded-xl bg-ffc-card hover:bg-ffc-cardBorder border border-ffc-cardBorder text-ffc-gold text-xs font-mono transition-colors"
              title="Customize in Fry Lab"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              justAdded
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-ffc-gold hover:bg-ffc-goldLight text-ffc-black shadow-gold'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
