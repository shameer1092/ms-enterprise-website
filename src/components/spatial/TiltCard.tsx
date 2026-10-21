'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 6)
  glowColor?: string; // specular spotlight color
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  glowColor = 'rgba(56, 189, 248, 0.15)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary or user prefers reduced motion
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (touchCheck || motionQuery.matches) {
      setIsTouch(true);
    }
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

  return (
    <div
      style={{ perspective: isTouch ? 'none' : '1200px' }}
      className="relative transition-transform duration-200"
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
        className={`relative overflow-hidden ${className}`}
      >
        {/* Dynamic Specular Glare Overlay tracking the cursor */}
        {!isTouch && (
          <div
            className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: glowPos.opacity,
              background: `radial-gradient(circle 320px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`,
            }}
          />
        )}

        {/* Specular Top Edge Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {children}
      </div>
    </div>
  );
};
