import React from 'react';

export default function Loading() {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-24">
      {/* Ambient Pulsing Radar Aura */}
      <div className="relative flex items-center justify-center">
        {/* Outermost expanding pulse ring */}
        <div className="absolute h-36 w-36 animate-ping rounded-full bg-sky-500/10 opacity-75 dark:bg-cyan-400/10" />

        {/* Middle breathing radar ring */}
        <div className="absolute h-24 w-24 animate-pulse rounded-full border border-sky-500/30 bg-sky-500/5 dark:border-cyan-400/30 dark:bg-cyan-500/5" />

        {/* Central Core Telemetry Orb */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-500/50 bg-white/80 shadow-lg shadow-sky-500/20 backdrop-blur-xl dark:border-cyan-400/40 dark:bg-slate-900/80 dark:shadow-cyan-500/20">
          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Telemetry Status Indicator */}
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-sky-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 dark:bg-cyan-300" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-400" />
          </span>
          <span>SYNCHRONIZING_CORE_SERVICES...</span>
        </div>

        {/* Skeleton Telemetry Bars for Zero CLS Preview */}
        <div className="mt-8 w-full max-w-md space-y-3 px-4">
          <div className="h-3 w-3/4 mx-auto rounded-full bg-slate-200/70 animate-pulse dark:bg-white/10" />
          <div className="h-2.5 w-1/2 mx-auto rounded-full bg-slate-200/50 animate-pulse dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}
