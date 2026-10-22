'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime drops to console
    console.error('MS Enterprise Core Runtime Exception:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-[75vh] items-center justify-center px-4 py-20">
      {/* Ambient Diagnostic Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-rose-500/15 via-amber-500/10 to-transparent blur-3xl dark:from-rose-500/20 dark:via-orange-500/10"
      />

      <TiltCard
        maxTilt={5}
        className="spatial-card relative z-10 mx-auto max-w-xl rounded-4xl p-8 text-center sm:p-12 shadow-liquid-elevated dark:border-rose-500/30 dark:shadow-spatial-elevated"
      >
        {/* Error Code Telemetry */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span>RUNTIME_FAULT_DETECTED</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Execution Circuit Interrupted
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The runtime engine encountered an unexpected thread anomaly. Microservice states and secure caches have isolated this process to protect data integrity.
        </p>

        {error.digest && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100/70 p-2.5 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
            Digest: {error.digest}
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Icon name="RefreshCw" className="h-4 w-4" />
            <span>Reset State & Retry</span>
          </button>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
          >
            <Icon name="AlertCircle" className="h-4 w-4" />
            <span>Report Incident</span>
          </Link>
        </div>
      </TiltCard>
    </div>
  );
}
