'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from './TiltCard';

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'growth' | 'operations'>('architecture');

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Ambient Multi-Tier Back-Glow Spotlight */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gradient-to-r from-blue-600/25 via-cyan-500/20 to-teal-500/10 blur-3xl opacity-80 animate-pulse-subtle" />

      {/* Main VisionOS Window Frame */}
      <TiltCard
        maxTilt={5}
        glowColor="rgba(56, 189, 248, 0.2)"
        className="spatial-card rounded-3xl p-6 sm:p-7 shadow-spatial-elevated"
      >
        {/* visionOS Capsule Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            {/* Window control pills */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/40" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-sm shadow-amber-500/40" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-sm shadow-emerald-500/40" />
            </div>
            <span className="ml-2 font-mono text-[11px] font-medium tracking-wider text-slate-400">
              visionOS.spatial.core
            </span>
          </div>

          {/* Live System Status Node */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="radar-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Live Telemetry</span>
          </div>
        </div>

        {/* visionOS Segmented Control Tabs */}
        <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-2xl bg-white/[0.03] p-1.5 border border-white/5">
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
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name={tab.icon} className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive 2D Vector Animated Graph Section */}
        <div className="mt-5 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Runtime Benchmark & Uptime
              </span>
              <p className="mt-0.5 text-lg font-extrabold text-white">
                {activeTab === 'architecture' && '0.42s Fast TTFB / 99.98% Uptime'}
                {activeTab === 'growth' && '100% Organic Delivery Rate'}
                {activeTab === 'operations' && '24m Response SLA / Zero Backlog'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400">
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
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Background horizontal grid guides */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Area fill under curve */}
              <path
                d="M 0 100 Q 80 40 160 65 T 320 30 T 500 15 L 500 120 L 0 120 Z"
                fill="url(#areaGradient)"
              />

              {/* Main Animated Vector Stroke Path */}
              <path
                d="M 0 100 Q 80 40 160 65 T 320 30 T 500 15"
                stroke="url(#curveGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="svg-stroke-animated"
              />

              {/* Interactive Data Pulse Points */}
              <g transform="translate(160, 65)">
                <circle r="6" fill="#38BDF8" className="radar-ping opacity-60" />
                <circle r="4" fill="#38BDF8" stroke="#080A0E" strokeWidth="2" />
              </g>

              <g transform="translate(320, 30)">
                <circle r="6" fill="#38BDF8" className="radar-ping opacity-60" />
                <circle r="4" fill="#38BDF8" stroke="#080A0E" strokeWidth="2" />
              </g>

              <g transform="translate(500, 15)">
                <circle r="7" fill="#10B981" className="radar-ping opacity-75" />
                <circle r="4.5" fill="#10B981" stroke="#080A0E" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>

        {/* 3 Floating Modular Data Nodes */}
        <div className="mt-4 space-y-2.5">
          <div
            className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
              activeTab === 'architecture'
                ? 'border-cyan-500/40 bg-white/[0.06] shadow-lg shadow-cyan-500/10'
                : 'border-white/5 bg-slate-950/40 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 text-cyan-400">
                <Icon name="Code2" className="h-5 w-5" />
                <span className="radar-ping absolute -inset-1 bg-cyan-400/20" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Custom Web Architecture</h4>
                <p className="text-[11px] text-slate-400">Lifetime live support & deployment diagnostics</p>
              </div>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
              Active Scope
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
              activeTab === 'growth'
                ? 'border-cyan-500/40 bg-white/[0.06] shadow-lg shadow-cyan-500/10'
                : 'border-white/5 bg-slate-950/40 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                <Icon name="Share2" className="h-5 w-5" />
                <span className="radar-ping absolute -inset-1 bg-sky-400/20" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Targeted Meta (Facebook) Streams</h4>
                <p className="text-[11px] text-slate-400">Multi-country organic audience delivery</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-sky-300">
              Multi-Region
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
              activeTab === 'operations'
                ? 'border-emerald-500/40 bg-white/[0.06] shadow-lg shadow-emerald-500/10'
                : 'border-white/5 bg-slate-950/40 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <Icon name="ShoppingBag" className="h-5 w-5" />
                <span className="radar-ping absolute -inset-1 bg-emerald-400/20" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Ecommerce Virtual Assistant Operations</h4>
                <p className="text-[11px] text-slate-400">Store workflows with emergency compensation</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
              Assigned VA
            </span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
