'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/products';

interface QuickOrderCategoriesProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function QuickOrderCategories({
  activeCategory = 'all',
  onSelectCategory,
}: QuickOrderCategoriesProps) {
  return (
    <div id="quick-order" className="w-full py-6">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 custom-scrollbar no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          if (onSelectCategory) {
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-all duration-200 border ${
                  isActive
                    ? 'bg-ffc-red text-white border-ffc-red shadow-fire scale-105'
                    : 'bg-ffc-card/80 hover:bg-ffc-card border-ffc-cardBorder text-ffc-cream/80 hover:text-white hover:border-ffc-gold/40'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-all duration-200 border bg-ffc-card/80 hover:bg-ffc-card border-ffc-cardBorder text-ffc-cream/80 hover:text-white hover:border-ffc-gold/40"
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
