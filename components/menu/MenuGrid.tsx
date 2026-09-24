'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { QuickOrderCategories } from './QuickOrderCategories';
import { Search, Flame, Sparkles, Filter, Leaf } from 'lucide-react';

interface MenuGridProps {
  initialCategory?: string;
  showTitle?: boolean;
  limit?: number;
}

export function MenuGrid({
  initialCategory = 'all',
  showTitle = true,
  limit,
}: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [fireOnly, setFireOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products
  let filtered = PRODUCTS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    if (vegOnly && !item.isVeg) {
      return false;
    }
    if (fireOnly && item.spiceLevel < 4) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="w-full space-y-6">
      {showTitle && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-ffc-cardBorder/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-ffc-gold uppercase tracking-widest font-black">
                CHEF SIGNATURE SELECTIONS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white uppercase tracking-tight mt-1">
              EXPLORE OUR MENU
            </h2>
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                vegOnly
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500 shadow-sm'
                  : 'bg-ffc-card border-ffc-cardBorder text-ffc-cream/70 hover:border-emerald-500/50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>VEG ONLY</span>
            </button>

            <button
              type="button"
              onClick={() => setFireOnly(!fireOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                fireOnly
                  ? 'bg-ffc-red text-white border-ffc-red shadow-fire'
                  : 'bg-ffc-card border-ffc-cardBorder text-ffc-cream/70 hover:border-ffc-red/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>FIRE ZONE ONLY</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Pills Bar */}
      <QuickOrderCategories
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
      />

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-ffc-card/40 border border-ffc-cardBorder rounded-3xl space-y-3">
          <span className="text-4xl">🍗</span>
          <h3 className="text-xl font-black font-display text-white uppercase">
            NO CRISPY BITES FOUND
          </h3>
          <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans max-w-sm mx-auto">
            Try resetting your filters or search query to see our signature fried chicken and box meals.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setVegOnly(false);
              setFireOnly(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-ffc-gold text-ffc-black font-mono text-xs font-bold uppercase shadow-gold"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
