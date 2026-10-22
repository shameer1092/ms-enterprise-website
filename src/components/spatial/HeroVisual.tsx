'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from './TiltCard';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'growth' | 'operations'>('architecture');

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Ambient Multi-Tier Back-Glow Spotlight (Light Cool Blue / Soft Teal) */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-r from-sky-300/30 via-cyan-200/25 to-teal-100/20 blur-3xl opacity-90 dark:from-blue-600/20 dark:via-cyan-500/15 dark:to-teal-500/10" />

      {/* Main Apple Liquid Glass Window Frame */}
      <TiltCard
        maxTilt={5}
        className="spatial-card rounded-3xl p-6 sm:p-7 shadow-liquid-elevated dark:shadow-spatial-elevated"
      >
        {/* Capsule Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            {/* Window control pills */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400 shadow-sm shadow-red-500/20" />
              <span className="h-3 w-3 rounded-full bg-amber-400 shadow-sm shadow-amber-500/20" />
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/20" />
            </div>
            <span className="ml-2 font-mono text-[11px] font-medium tracking-wider text-slate-500 dark:text-slate-400">
              liquid.spatial.engine
            </span>
          </div>

          {/* Live System Status Node */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="radar-ping absolute inline-flex h-full w-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Live Telemetry</span>
          </div>
        </div>

        {/* Liquid Glass Segmented Control Tabs */}
        <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-2xl border border-slate-200/60 bg-slate-100/60 p-1.5 dark:border-white/5 dark:bg-white/[0.03]">
          {[
            { id: 'architecture', label: 'Web Engine', icon: 'Code2' },
            { id: 'growth', label: 'Meta Traffic', icon: 'Share2' },
            { id: 'operations', label: 'Store VA', icon: 'ShoppingBag' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-sky-700 shadow-sm ring-1 ring-slate-900/5 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 dark:text-white dark:shadow-md dark:ring-white/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5'
              }`}
            >
              <Icon name={tab.icon} className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive 2D Vector Animated Graph Section */}
        <div className="mt-5 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60 dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Runtime Benchmark & Uptime
              </span>
              <p className="mt-0.5 text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {activeTab === 'architecture' && '0.42s Fast TTFB / 99.98% Uptime'}
                {activeTab === 'growth' && '100% Organic Delivery Rate'}
                {activeTab === 'operations' && '24m Response SLA / Zero Backlog'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-600 dark:text-cyan-400">
              <Icon name="Zap" className="h-4 w-4" />
              <span>Real-Time</span>
            </div>
          </div>

          {/* 2D SVG Line Curve Animation */}
          <div className="relative mt-4 h-28 w-full overflow-hidden">
            <svg
              viewBox="0 0 500 120"
              fill="none"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
                <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path
                d="M 0 120 L 0 85 C 60 70, 110 95, 170 50 C 230 15, 280 65, 340 30 C 400 5, 450 40, 500 15 L 500 120 Z"
                fill="url(#curveFill)"
              />

              {/* Animated 2D Stroke */}
              <path
                d="M 0 85 C 60 70, 110 95, 170 50 C 230 15, 280 65, 340 30 C 400 5, 450 40, 500 15"
                stroke="url(#curveGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="svg-stroke-animated"
              />

              {/* Interactive Telemetry Data Nodes */}
              <g className="cursor-pointer">
                <circle cx="170" cy="50" r="4.5" className="fill-sky-500 ring-2 ring-white" />
                <circle cx="340" cy="30" r="4.5" className="fill-cyan-500 ring-2 ring-white" />
                <circle cx="500" cy="15" r="5" className="fill-teal-500 ring-2 ring-white" />
              </g>
            </svg>
          </div>
        </div>

        {/* 3 Interactive Liquid Glass Metric Tiles */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Support
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Lifetime</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-cyan-400">Active</span>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Maintenance
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Minimal</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Optimized</span>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Integrations
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Multi-OS</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-cyan-400">Verified</span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
