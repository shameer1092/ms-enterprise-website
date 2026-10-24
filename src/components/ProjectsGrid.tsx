'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Zap, Layers, Globe, ShoppingBag, CheckCircle2, TrendingUp } from 'lucide-react';

export interface FlagshipProject {
  id: string;
  slug: string;
  title: string;
  tag: string;
  category: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  mockupType: 'portal' | 'ecommerce' | 'meta' | 'telemetry';
  liveUrl?: string;
}

const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'apex-industrial',
    slug: 'apex-industrial-portal',
    title: 'Apex Industrial Portal',
    tag: 'NEXT.JS / TS',
    category: 'Enterprise Asset Pipeline',
    outcome: 'Engineered sub-100ms TTFB corporate portal with automated asset ingestion and instant RFQ pricing.',
    metrics: [
      { label: 'TTFB Speed', value: '0.08s' },
      { label: 'Lighthouse', value: '99/100' },
      { label: 'Asset Sync', value: 'Instant' },
    ],
    accentColor: '#D4AF37',
    mockupType: 'portal',
    liveUrl: '/projects/apex-industrial-portal',
  },
  {
    id: 'global-commerce',
    slug: 'nordic-living-store',
    title: 'Global Commerce Engine',
    tag: 'SHOPIFY / HEADLESS',
    category: 'High-Volume Store Architecture',
    outcome: 'Custom headless store with multi-currency checkout, zero catalog latency across 12,000 SKUs, and automated ERP sync.',
    metrics: [
      { label: 'Checkout Lift', value: '+48%' },
      { label: 'Active SKUs', value: '12,000' },
      { label: 'Sync Latency', value: '0.0s' },
    ],
    accentColor: '#10B981',
    mockupType: 'ecommerce',
    liveUrl: '/projects/nordic-living-store',
  },
  {
    id: 'social-matrix',
    slug: 'global-lifestyle-meta',
    title: 'Social Community Growth Matrix',
    tag: 'META ORGANIC',
    category: 'Multi-Country Audience Scale',
    outcome: 'Scaled organic Facebook community by +320% across USA, UK, and European buyer demographics with zero synthetic bots.',
    metrics: [
      { label: 'Organic Growth', value: '+320%' },
      { label: 'Target Geos', value: '4 Countries' },
      { label: 'Authentic Reach', value: '100%' },
    ],
    accentColor: '#3B82F6',
    mockupType: 'meta',
    liveUrl: '/projects/global-lifestyle-meta',
  },
];

export const ProjectsGrid: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:bg-[#D4AF37]/15 dark:text-[#E5B238]">
          <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>Flagship Portfolio • Verified Outcomes</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-tight">
          Selected Builds.{' '}
          <span className="text-[#D4AF37]">Engineered for Performance.</span>
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB]">
          Real production systems, custom ecommerce stores, and targeted multi-country organic engines.
        </p>
      </div>

      {/* Flagship Projects Card Grid */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {FLAGSHIP_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 liquid-glass shadow-partner-card border border-white/70 hover:border-[#D4AF37]/60 transition-all duration-300 dark:border-white/10 dark:hover:border-[#D4AF37]/60"
          >
            {/* Top Container: Mockup & Tags */}
            <div className="space-y-5">
              {/* Mockup Container (Interactive Browser Frame) */}
              <div className="relative overflow-hidden rounded-2xl bg-[#121316] border border-[#2A2D34] shadow-inner aspect-[16/10] flex flex-col justify-between p-3.5 sm:p-4 select-none">
                {/* Browser Window Header */}
                <div className="flex items-center justify-between border-b border-[#2A2D34]/80 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                    <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                    <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9CA3AF] bg-[#1E2024] px-2 py-0.5 rounded-md border border-[#2A2D34]">
                    https://{project.slug}.prod
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Inner Mockup Visual Elements by Type */}
                {project.mockupType === 'portal' && (
                  <div className="space-y-2 py-2">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 bg-[#D4AF37]/30 rounded-md animate-pulse" />
                      <div className="h-3 w-12 bg-white/20 rounded-md" />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="p-2 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <div className="text-[9px] text-[#9CA3AF] font-mono">TTFB</div>
                        <div className="text-xs font-mono font-bold text-[#D4AF37]">0.08s</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <div className="text-[9px] text-[#9CA3AF] font-mono">CORE</div>
                        <div className="text-xs font-mono font-bold text-white">Next 14</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <div className="text-[9px] text-[#9CA3AF] font-mono">SCORE</div>
                        <div className="text-xs font-mono font-bold text-emerald-400">99%</div>
                      </div>
                    </div>
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                  </div>
                )}

                {project.mockupType === 'ecommerce' && (
                  <div className="space-y-2 py-2">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-28 bg-emerald-500/30 rounded-md" />
                      <div className="flex gap-1 text-[9px] font-mono text-white/70">
                        <span className="bg-[#1E2024] px-1.5 py-0.5 rounded">$ USD</span>
                        <span className="bg-[#1E2024] px-1.5 py-0.5 rounded">€ EUR</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-[#1E2024] border border-[#2A2D34] flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#9CA3AF]">ERP Sync</span>
                        <span className="text-[10px] font-bold text-emerald-400 font-mono">PASS</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#1E2024] border border-[#2A2D34] flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#9CA3AF]">Checkout</span>
                        <span className="text-[10px] font-bold text-[#D4AF37] font-mono">0.4s</span>
                      </div>
                    </div>
                    <div className="h-2 w-2/3 bg-emerald-500/20 rounded-full" />
                  </div>
                )}

                {project.mockupType === 'meta' && (
                  <div className="space-y-2 py-2">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-32 bg-sky-500/30 rounded-md" />
                      <span className="text-[9px] font-mono text-sky-400">ORGANIC</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="p-1.5 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <span className="text-[9px] text-[#9CA3AF] block font-mono">USA</span>
                        <span className="text-[10px] font-bold text-sky-400 font-mono">+180%</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <span className="text-[9px] text-[#9CA3AF] block font-mono">UK</span>
                        <span className="text-[10px] font-bold text-sky-400 font-mono">+95%</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-[#1E2024] border border-[#2A2D34] text-center">
                        <span className="text-[9px] text-[#9CA3AF] block font-mono">EU</span>
                        <span className="text-[10px] font-bold text-sky-400 font-mono">+45%</span>
                      </div>
                    </div>
                    <div className="h-2 w-4/5 bg-sky-500/20 rounded-full" />
                  </div>
                )}

                {/* Bottom Mockup Metric Strip */}
                <div className="flex items-center justify-between pt-1 border-t border-[#2A2D34]/60 text-[9px] font-mono text-[#9CA3AF]">
                  <span>DEPLOYMENT: VERIFIED</span>
                  <span className="text-white">60 FPS</span>
                </div>
              </div>

              {/* Tag Pill & Category */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] border border-[#D4AF37]/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {project.tag}
                </span>
                <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#9CA3AF]">
                  {project.category}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold tracking-tight text-[#121316] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                {project.title}
              </h3>

              {/* Single-Sentence High-Impact Outcome */}
              <p className="text-xs sm:text-sm leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB]">
                {project.outcome}
              </p>

              {/* Verified Metric Counters */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-2 rounded-xl bg-white/60 dark:bg-[#1E2024]/60">
                    <span className="text-xs sm:text-sm font-mono font-extrabold text-[#121316] dark:text-[#D4AF37] block">
                      {metric.value}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B7280] dark:text-[#9CA3AF] block truncate">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action: View Case Study Trigger */}
            <div className="pt-6 mt-6 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
              <Link
                href={project.liveUrl || `/projects/${project.slug}`}
                className="group/btn inline-flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#FBFBFA] border border-[#E5E7EB] text-[#121316] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121316] transition-all dark:bg-[#1E2024] dark:border-[#2A2D34] dark:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#121316] min-h-[44px]"
              >
                <span>View Case Study</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
