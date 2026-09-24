'use client';

import React from 'react';
import { Flame } from 'lucide-react';

interface HeatMeterProps {
  level: number; // 0 to 5
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onSelectLevel?: (lvl: 1 | 2 | 3 | 4 | 5) => void;
}

export function HeatMeter({
  level,
  showLabel = true,
  size = 'md',
  interactive = false,
  onSelectLevel,
}: HeatMeterProps) {
  const getLevelLabel = (lvl: number) => {
    switch (lvl) {
      case 0:
        return 'No Spice';
      case 1:
        return 'Mild Heat';
      case 2:
        return 'Warm Tingle';
      case 3:
        return 'Spicy Kick';
      case 4:
        return 'Hot Fire';
      case 5:
        return '🔥 FIRE ZONE';
      default:
        return '';
    }
  };

  const getSegmentColor = (idx: number, currentLevel: number) => {
    if (idx > currentLevel) return 'bg-white/10 border-white/10 text-ffc-smoke/30';
    if (idx === 5) return 'bg-ffc-red text-white border-ffc-red shadow-[0_0_12px_#E6391F] animate-pulse';
    if (idx === 4) return 'bg-ffc-red text-white border-ffc-red shadow-fire';
    if (idx === 3) return 'bg-ffc-orange text-white border-ffc-orange shadow-orange';
    if (idx === 2) return 'bg-ffc-gold text-ffc-black border-ffc-gold';
    return 'bg-amber-400 text-ffc-black border-amber-400';
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((idx) => {
          const isActive = idx <= level;
          const isFireZone = idx === 5 && level === 5;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onSelectLevel && onSelectLevel(idx as 1 | 2 | 3 | 4 | 5)}
              className={`transition-all duration-300 rounded flex items-center justify-center border ${
                size === 'sm' ? 'w-5 h-5 text-[10px]' : size === 'lg' ? 'w-9 h-9 text-sm' : 'w-7 h-7 text-xs'
              } ${getSegmentColor(idx, level)} ${
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
              }`}
              data-cursor={isFireZone ? 'fire' : 'pointer'}
              data-cursor-label={isFireZone ? 'FIRE' : undefined}
            >
              <Flame
                className={`${
                  size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'
                } ${isActive ? 'fill-current' : 'opacity-30'}`}
              />
            </button>
          );
        })}
      </div>
      {showLabel && (
        <span
          className={`font-mono text-xs uppercase font-bold tracking-wider ${
            level === 5
              ? 'text-ffc-red drop-shadow-[0_0_8px_rgba(230,57,31,0.8)]'
              : level >= 3
              ? 'text-ffc-orange'
              : level > 0
              ? 'text-ffc-gold'
              : 'text-ffc-smoke'
          }`}
        >
          {getLevelLabel(level)}
        </span>
      )}
    </div>
  );
}
