import React from 'react';
import Link from 'next/link';
import { Home, HelpCircle } from 'lucide-react';
import { TiltCard } from '@/components/spatial/TiltCard';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-16 sm:py-24">
      {/* Soft Ambient Backdrop Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-gradient-to-tr from-sky-400/20 via-cyan-300/15 to-transparent blur-3xl dark:from-cyan-500/15 dark:via-blue-600/10"
      />

      <TiltCard
        maxTilt={4}
        className="spatial-card relative z-10 mx-auto w-full max-w-lg rounded-4xl p-8 text-center sm:p-12 border border-slate-200/80 shadow-liquid-elevated dark:border-white/10 dark:shadow-spatial-elevated"
      >
        {/* Subtle Status Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 dark:bg-cyan-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-400" />
          </span>
          <span>Page Not Found</span>
        </div>

        {/* Prominent, Clean 404 Typography Element */}
        <div className="mt-4 text-7xl font-black tracking-tight sm:text-8xl">
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
            404
          </span>
        </div>

        {/* Clear & Friendly Headline */}
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Looks like you took a wrong turn
        </h1>

        {/* Plain-English, Human-Readable Explanation */}
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The link you clicked might be outdated, mistyped, or the page may have been moved. Don't worry, you can easily get back on track.
        </p>

        {/* Action Buttons: Return to Homepage & Contact Support */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="spatial-btn-primary inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm sm:w-auto"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold sm:w-auto"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Contact Support / Inquiry</span>
          </Link>
        </div>
      </TiltCard>
    </div>
  );
}
