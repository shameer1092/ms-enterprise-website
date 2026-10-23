'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Maximize2 } from 'lucide-react';

interface Inspect3DButtonProps {
  className?: string;
  variant?: 'pill' | 'badge';
}

export const Inspect3DButton: React.FC<Inspect3DButtonProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleOrbitChange = (e: any) => {
      setIsActive(!!e.detail?.active);
    };
    window.addEventListener('toggle-3d-orbit', handleOrbitChange);
    return () => window.removeEventListener('toggle-3d-orbit', handleOrbitChange);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextState = !isActive;
    window.dispatchEvent(new CustomEvent('toggle-3d-orbit', { detail: { active: nextState } }));
  };

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
          isActive
            ? 'bg-[#D4AF37] text-[#121316] border-[#D4AF37] shadow-lg'
            : 'bg-white/90 text-[#121316] border-[#E5E7EB] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#1E2024]/90 dark:border-[#2A2D34] dark:text-white backdrop-blur-md'
        } ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
        </span>
        <span>{isActive ? '✦ Drag to Rotate Core (360°)' : '✦ Inspect 3D Engine Core'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`pointer-events-auto inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-partner-card backdrop-blur-xl ${
        isActive
          ? 'bg-[#D4AF37] text-[#121316] border-[#D4AF37]'
          : 'bg-white/85 text-[#121316] border-[#E5E7EB] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#1E2024]/85 dark:border-[#2A2D34] dark:text-white'
      } ${className}`}
    >
      <Compass className="h-4 w-4 text-[#D4AF37]" />
      <span>{isActive ? '✦ 360° Orbit Active (Drag)' : 'Inspect 3D Core'}</span>
    </button>
  );
};
