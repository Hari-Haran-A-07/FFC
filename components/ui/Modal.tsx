'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case '2xl':
        return 'max-w-2xl';
      case '4xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-6xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${getMaxWidthClass()} bg-ffc-surface border border-ffc-cardBorder rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 transform transition-all duration-300 text-ffc-warmWhite max-h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-ffc-cardBorder/60 mb-6 shrink-0">
          <div>
            {title && (
              <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-ffc-cream/70 font-sans mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-ffc-card hover:bg-ffc-cardHover border border-ffc-cardBorder text-ffc-smoke hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="overflow-y-auto pr-1 flex-1 custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}
