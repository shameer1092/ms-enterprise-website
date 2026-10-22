'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 5)
  glowColor?: string; // specular spotlight color
  overflowHidden?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  glowColor,
  overflowHidden = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary or user prefers reduced motion
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (touchCheck || motionQuery.matches) {
      setIsTouch(true);
    }

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    window.addEventListener('theme-changed', checkDark);
    return () => window.removeEventListener('theme-changed', checkDark);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setRotate({ x: 0, y: 0 });
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const defaultGlow = isDark
    ? 'rgba(56, 189, 248, 0.14)'
    : 'rgba(2, 132, 199, 0.08)';
  const activeGlow = glowColor || defaultGlow;

  return (
    <div
      style={{ perspective: isTouch ? 'none' : '1200px' }}
      className="relative h-full transition-transform duration-200"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isTouch
            ? 'none'
            : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(0)`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
        }}
        className={`relative h-full ${overflowHidden ? 'overflow-hidden' : ''} ${className}`}
      >
        {/* Dynamic Specular Glare Overlay tracking cursor */}
        {!isTouch && (
          <div
            className="pointer-events-none absolute -inset-px rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: glowPos.opacity,
              background: `radial-gradient(circle 320px at ${glowPos.x}% ${glowPos.y}%, ${activeGlow}, transparent 70%)`,
            }}
          />
        )}

        {/* Specular Top Edge Light Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-[inherit] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

        {children}
      </div>
    </div>
  );
};
