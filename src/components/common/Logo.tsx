import React from 'react';
import Link from 'next/link';

interface LogoProps {
  companyName?: string;
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  companyName = 'MS Enterprise',
  className = '',
  showText = true,
}) => {
  return (
    <Link
      href="/"
      aria-label="MS Enterprise Home"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-900 p-0.5 shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/90 backdrop-blur-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-cyan-400"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Architectural M & S geometry */}
            <path d="M4 18V6l4 5 4-5v12" />
            <path d="M16 9.5c0-1.5 1.2-2.5 3-2.5s3 1 3 2.5c0 2-3 2.5-3 4s1.2 2.5 3 2.5" />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
            {companyName}
          </span>
          <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
            Technology & Growth
          </span>
        </div>
      )}
    </Link>
  );
};
