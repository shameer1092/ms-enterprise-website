import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-20">
      {/* Ambient Glowing Backdrop Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/20 to-transparent blur-3xl dark:from-cyan-500/20 dark:via-blue-600/15"
      />

      <TiltCard
        maxTilt={5}
        className="spatial-card relative z-10 mx-auto max-w-2xl rounded-4xl p-8 text-center sm:p-12 shadow-liquid-elevated dark:border-cyan-500/30 dark:shadow-spatial-elevated"
      >
        {/* Telemetry Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-sky-700 dark:border-cyan-500/40 dark:bg-cyan-500/15 dark:text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span>STATUS: 404_RESOURCE_NOT_FOUND</span>
        </div>

        {/* Technical Coordinate Headline */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Coordinate Out of Bounds
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Page Not Found / Routing Exception
        </p>

        {/* Technical Explanatory Copy */}
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The requested spatial node could not be resolved within the MS Enterprise production mesh. The coordinate has either been migrated, purged during a security audit, or does not exist in the routing table.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Icon name="Compass" className="h-4 w-4" />
            <span>Return to Console</span>
          </Link>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
          >
            <Icon name="Send" className="h-4 w-4" />
            <span>Submit Project Inquiry</span>
          </Link>
        </div>

        {/* Quick Fallback Routes Grid */}
        <div className="mt-10 border-t border-slate-200/60 pt-8 dark:border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Available Production Endpoints
          </span>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              href="/services"
              className="rounded-xl border border-slate-200/80 bg-white/50 p-3 text-xs font-medium text-slate-700 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              Services
            </Link>
            <Link
              href="/plans"
              className="rounded-xl border border-slate-200/80 bg-white/50 p-3 text-xs font-medium text-slate-700 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              Pricing Plans
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-slate-200/80 bg-white/50 p-3 text-xs font-medium text-slate-700 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              About Team
            </Link>
            <Link
              href="/faq"
              className="rounded-xl border border-slate-200/80 bg-white/50 p-3 text-xs font-medium text-slate-700 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              System FAQ
            </Link>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
