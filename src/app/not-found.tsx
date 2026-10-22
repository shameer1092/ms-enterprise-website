import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center py-20 px-4">
      <TiltCard
        maxTilt={6}
        className="spatial-card mx-auto max-w-xl rounded-4xl p-10 sm:p-12 text-center shadow-liquid-elevated dark:shadow-spatial-elevated"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          <Icon name="AlertCircle" className="h-3.5 w-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The requested spatial view could not be located. It may have been moved, renamed, or temporarily unpublished.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold"
          >
            <span>Contact Support</span>
          </Link>
        </div>
      </TiltCard>
    </div>
  );
}
