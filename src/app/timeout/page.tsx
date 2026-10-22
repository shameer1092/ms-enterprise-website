'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export default function TimeoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(10);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  useEffect(() => {
    if (countdown <= 0) {
      handleReconnect();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleReconnect = () => {
    setIsReconnecting(true);
    // Refresh page / reconnect
    window.location.reload();
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-20">
      {/* Ambient Pulsing Glow Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-amber-500/20 via-sky-500/15 to-transparent blur-3xl dark:from-amber-400/15 dark:via-cyan-500/15"
      />

      <TiltCard
        maxTilt={5}
        className="spatial-card relative z-10 mx-auto max-w-xl rounded-4xl p-8 text-center sm:p-12 shadow-liquid-elevated dark:border-amber-500/30 dark:shadow-spatial-elevated"
      >
        {/* Telemetry Diagnostic Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span>GATEWAY_LATENCY_TIMEOUT // 504</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Upstream Response Timeout
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The edge network experienced high socket latency waiting for upstream service fulfillment. Traffic routes are actively re-negotiating the fastest operational route.
        </p>

        {/* Dynamic Countdown Circle */}
        <div className="my-8 flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10">
            <span className="font-mono text-3xl font-black text-slate-900 dark:text-white">
              {countdown}s
            </span>
          </div>
          <span className="mt-3 font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
            {isReconnecting ? 'Initiating reconnect socket...' : 'Automatic network re-dispatch in progress'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleReconnect}
            disabled={isReconnecting}
            className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm disabled:opacity-50"
          >
            <Icon name="RefreshCw" className={`h-4 w-4 ${isReconnecting ? 'animate-spin' : ''}`} />
            <span>Force Reconnect Now</span>
          </button>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
          >
            <Icon name="Send" className="h-4 w-4" />
            <span>Fallback to Direct Inquiry</span>
          </Link>
        </div>
      </TiltCard>
    </div>
  );
}
