'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { soundManager } from '@/lib/sound';

interface AudioContextType {
  isMuted: boolean;
  toggleSound: () => void;
  playCrunch: () => void;
  playSizzle: () => void;
  playFireWhoosh: () => void;
  playSelect: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
  }, []);

  const toggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleSound,
        playCrunch: () => soundManager.playCrunch(),
        playSizzle: () => soundManager.playSizzle(),
        playFireWhoosh: () => soundManager.playFireWhoosh(),
        playSelect: () => soundManager.playSelect(),
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
