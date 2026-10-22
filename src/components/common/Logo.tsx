'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  companyName?: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  companyName = 'MS Enterprise',
  className = '',
  showText = true,
  size = 'md',
}) => {
  const sizeMap = {
    sm: {
      imgWidth: 42,
      imgHeight: 28,
      containerH: 'h-8',
      textMain: 'text-base',
      textSub: 'text-[9px]',
    },
    md: {
      imgWidth: 51,
      imgHeight: 34,
      containerH: 'h-10',
      textMain: 'text-lg',
      textSub: 'text-[10px]',
    },
    lg: {
      imgWidth: 66,
      imgHeight: 44,
      containerH: 'h-12',
      textMain: 'text-xl',
      textSub: 'text-[11px]',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <Link
      href="/"
      aria-label="MS Enterprise Home"
      className={`group relative inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      {/* Animated Logo Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Radiant Glow Aura (Pulses gently and expands on hover) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-cyan-400/25 opacity-70 blur-md transition-all duration-500 group-hover:scale-125 group-hover:opacity-100 dark:from-amber-400/20 dark:via-cyan-400/20 dark:to-blue-600/25"
        />

        {/* Outer Spatial Shield Frame */}
        <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-amber-500/20 bg-slate-900/5 px-1.5 py-1 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-amber-500/40 group-hover:shadow-md dark:border-amber-400/30 dark:bg-slate-950/60 dark:shadow-cyan-950/40`}>
          {/* Official MS Enterprises Metallic 3D Logo */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="MS Enterprise Official Logo"
              width={currentSize.imgWidth}
              height={currentSize.imgHeight}
              priority
              className="object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Specular Light Shimmer Sweep Animation on Hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full dark:via-white/30"
            />
          </div>
        </div>
      </div>

      {/* Brand Wordmark & Live Telemetry Tagline */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-cyan-300 ${currentSize.textMain}`}>
            {companyName}
          </span>
          <span className={`flex items-center gap-1.5 font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400 ${currentSize.textSub}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>Technology & Operations</span>
          </span>
        </div>
      )}
    </Link>
  );
};
