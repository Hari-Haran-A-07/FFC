'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'gold' | 'orange' | 'dark' | 'veg' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'red':
        return 'bg-ffc-red/20 text-ffc-red border-ffc-red/40';
      case 'orange':
        return 'bg-ffc-orange/20 text-ffc-orange border-ffc-orange/40';
      case 'dark':
        return 'bg-ffc-card text-ffc-cream border-ffc-cardBorder';
      case 'veg':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40';
      case 'outline':
        return 'bg-transparent text-ffc-cream border-ffc-cardBorder';
      case 'gold':
      default:
        return 'bg-ffc-gold/20 text-ffc-gold border-ffc-gold/40';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider border ${getStyles()} ${className}`}
    >
      {children}
    </span>
  );
}

export function VegIndicator({ isVeg }: { isVeg: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-center w-4 h-4 rounded border ${
        isVeg ? 'border-emerald-500 bg-emerald-950/40' : 'border-ffc-red bg-ffc-red/20'
      }`}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-ffc-red'}`} />
    </div>
  );
}
