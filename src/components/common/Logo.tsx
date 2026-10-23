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
      className={`group relative inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      {/* 3D Metallic Logo Sign Frame */}
      <div className="relative flex items-center justify-center">
        {/* Subtle Brushed Gold Ambient Accent Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-xl bg-[#D4AF37]/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Clean Frame */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-white px-1.5 py-1 shadow-sm transition-colors duration-200 group-hover:border-[#D4AF37] dark:border-[#2A2D34] dark:bg-[#1E2024]">
          {/* Official MS Enterprises Metallic 3D Logo */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="MS Enterprise Official 3D Metallic Logo"
              width={currentSize.imgWidth}
              height={currentSize.imgHeight}
              priority
              className="object-contain drop-shadow-sm transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Brand Wordmark & Partner Tagline */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-extrabold tracking-tight text-[#121316] transition-colors group-hover:text-[#D4AF37] dark:text-white dark:group-hover:text-[#D4AF37] ${currentSize.textMain}`}>
            {companyName}
          </span>
          <span className={`flex items-center gap-1.5 font-bold tracking-wider text-[#6B7280] uppercase dark:text-[#9CA3AF] ${currentSize.textSub}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span>Digital Agency & Growth</span>
          </span>
        </div>
      )}
    </Link>
  );
};
