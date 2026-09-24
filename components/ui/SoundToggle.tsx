'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export function SoundToggle({ className = '' }: { className?: string }) {
  const { isMuted, toggleSound } = useAudio();

  return (
    <button
      onClick={toggleSound}
      type="button"
      aria-label={isMuted ? 'Unmute crunch & fire sound effects' : 'Mute sound effects'}
      className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-full border border-ffc-cardBorder bg-ffc-surface/80 hover:border-ffc-gold/60 text-xs font-mono transition-all duration-300 text-ffc-cream hover:text-white ${className}`}
      data-cursor="pointer"
      data-cursor-label="AUDIO"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-ffc-smoke group-hover:text-ffc-gold" />
          <span className="hidden sm:inline text-[11px] text-ffc-smoke group-hover:text-white">SFX OFF</span>
        </>
      ) : (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ffc-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ffc-gold"></span>
          </span>
          <Volume2 className="w-3.5 h-3.5 text-ffc-gold" />
          <span className="hidden sm:inline text-[11px] text-ffc-gold font-bold">SFX ON</span>
        </>
      )}
    </button>
  );
}
