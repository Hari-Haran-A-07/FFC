'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'food' | 'fire' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestInteractive = target.closest('[data-cursor], button, a, input, select, [role="button"]');
      if (closestInteractive) {
        const customCursorType = closestInteractive.getAttribute('data-cursor');
        const customCursorLabel = closestInteractive.getAttribute('data-cursor-label');

        if (customCursorLabel) {
          setCursorLabel(customCursorLabel);
        } else {
          setCursorLabel('');
        }

        if (customCursorType === 'food') {
          setCursorState('food');
        } else if (customCursorType === 'fire') {
          setCursorState('fire');
        } else {
          setCursorState('pointer');
        }
      } else {
        setCursorState('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trail loop
    let animationFrameId: number;
    const updateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorState !== 'default' || !!cursorLabel;
  const isFire = cursorState === 'fire';

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Glow Ring / Capsule */}
      <div
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`,
        }}
        className={`fixed left-0 top-0 transition-[width,height,background-color,border-color,transform] duration-200 ease-out flex items-center justify-center rounded-full border ${
          isFire
            ? 'w-16 h-16 border-ffc-red bg-ffc-red/20 shadow-fire'
            : isExpanded
            ? 'w-14 h-14 border-ffc-gold bg-ffc-gold/15 backdrop-blur-[1px]'
            : 'w-8 h-8 border-ffc-orange/60 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="text-[9px] font-black uppercase tracking-widest text-ffc-gold font-mono">
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Inner Pinpoint Dot */}
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
        className={`fixed left-0 top-0 rounded-full transition-transform duration-75 ease-out ${
          isFire
            ? 'w-3 h-3 bg-ffc-red shadow-[0_0_12px_#E6391F]'
            : isExpanded
            ? 'w-2 h-2 bg-ffc-gold'
            : 'w-1.5 h-1.5 bg-ffc-red'
        }`}
      />
    </div>
  );
}
