import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';
import { FeedbackForum } from '@/components/FeedbackForum';

export const metadata: Metadata = {
  title: 'About MS Enterprise | Decentralized Precision & Enterprise Execution',
  description:
    'Founded in 2026 in Dera Ghazi Khan, Pakistan. Discover how MS Enterprise eliminates agency bloat through centralized architectural control and lifetime live support.',
};

export default function AboutPage() {
  return (
    <div className="relative py-20 md:py-28">
      {/* ---------------- 1. HERO & MISSION PROTOCOL ---------------- */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 dark:bg-cyan-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-400" />
            </span>
            <span className="font-mono">EST. 2026 // DERA GHAZI KHAN TO GLOBAL MARKETS</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Decentralized Precision.{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
              Enterprise Execution.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            MS Enterprise was engineered to dismantle traditional digital agency bloat, rigid retainer models, and unmanaged freelance volatility. Through an agile decentralized execution engine overseen by veteran technical leadership, we deliver custom web engineering, targeted organic Meta expansion, and end-to-end ecommerce operations with guaranteed lifetime live support.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inquiry"
              className="spatial-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <span>Initialize Project Inquiry</span>
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>

            <a
              href="#operating-model"
              className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
            >
              <span>Explore Architecture</span>
              <Icon name="ChevronDown" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- 2. THE ORIGIN STORY (WHY WE STARTED) ---------------- */}
      <section className="relative mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TiltCard
            maxTilt={3}
            className="spatial-card rounded-4xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-liquid-elevated dark:border-white/10 dark:shadow-spatial-elevated"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Icon name="Compass" className="h-3.5 w-3.5" />
                  <span>The Catalyst // Why We Started</span>
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  Founded in 2026 to Eliminate Agency Bloat
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <p>
                    Rooted in Dera Ghazi Khan (DG Khan), Punjab, Pakistan, MS Enterprise emerged directly from observing a deep structural failure in how commercial software and digital growth are sold globally.
                  </p>
                  <p>
                    Traditional agencies inflate invoices by 300% to subsidize commercial office leases and layers of non-technical account managers who simply relay emails. Meanwhile, unmanaged freelance marketplaces expose businesses to erratic quality, security flaws, zero accountability, and complete abandonment the moment a final invoice clears.
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Our solution is an authentic hybrid model: Every line of code, cloud deployment, and growth strategy is architected under strict technical oversight by our core founders, combined with the rapid flexibility of vetted independent specialists.
                  </p>
                </div>
              </div>

              {/* Stat Telemetry Box (Equal visual weight) */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200/90 bg-white/70 p-6 sm:p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                    Operational Benchmark
                  </span>
                  <div className="mt-4 space-y-6">
                    <div className="border-b border-slate-200/60 pb-4 dark:border-white/10">
                      <div className="text-3xl font-black text-slate-900 dark:text-white">0%</div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Zero Middlemen Markup
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Clients communicate directly with system builders, not salespeople.
                      </p>
                    </div>

                    <div className="border-b border-slate-200/60 pb-4 dark:border-white/10">
                      <div className="text-3xl font-black text-slate-900 dark:text-white">100%</div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Lifetime Live Support
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Guaranteed direct engineer contact and ultra-low ongoing maintenance fees.
                      </p>
                    </div>

                    <div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">Global</div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        International Delivery Scope
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Serving partners across North America, Europe, the Middle East, and Asia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ---------------- 3. DECENTRALIZED OPERATING ARCHITECTURE ---------------- */}
      <section className="relative mt-24 px-4 sm:px-6 lg:px-8" id="operating-model">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
              Execution Engine
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Decentralized Operating Architecture
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Our 3-pillar framework combines elite craftsmanship with lean execution, ensuring total accountability without bloated agency fees.
            </p>
          </div>

          {/* 3 Pillars Grid with Equal Heights */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Pillar 01 */}
            <TiltCard
              maxTilt={5}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 shadow-sm dark:bg-cyan-500/15 dark:text-cyan-400">
                    <Icon name="Cpu" className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    PILLAR 01
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  Centralized Architecture & QA
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Every codebase, cloud infrastructure, and growth matrix is architected and audited directly by the core founders. Strict code reviews, WCAG AA compliance, and performance profiling are enforced before any release.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-200/60 pt-4 dark:border-white/10">
                <span className="font-mono text-[11px] font-semibold text-sky-700 dark:text-cyan-400">
                  Rigorous Foundational Auditing
                </span>
              </div>
            </TiltCard>

            {/* Pillar 02 */}
            <TiltCard
              maxTilt={5}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 ring-1 ring-teal-500/20 shadow-sm dark:bg-sky-500/15 dark:text-sky-400">
                    <Icon name="Compass" className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    PILLAR 02
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  Specialized Talent Nodes
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Instead of billing clients for dormant full-time staff, we deploy vetted independent specialists precisely matched to your project scope. You receive senior-tier execution without permanent overhead markup.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-200/60 pt-4 dark:border-white/10">
                <span className="font-mono text-[11px] font-semibold text-teal-700 dark:text-sky-400">
                  Precision Talent Allocation
                </span>
              </div>
            </TiltCard>

            {/* Pillar 03 */}
            <TiltCard
              maxTilt={5}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500/20 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Icon name="ShieldCheck" className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    PILLAR 03
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                  Lifetime Operational Support
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Projects do not conclude upon launch. We supply lifetime live support, direct developer communication, and low monthly maintenance. Deployment issues are diagnosed and solved promptly by our technical team.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-200/60 pt-4 dark:border-white/10">
                <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  Permanent Post-Launch SLA
                </span>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ---------------- 4. WHERE WE DIFFER (COMPARATIVE ARCHITECTURE GRID) ---------------- */}
      <section className="relative mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
              Honest Benchmarks
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Where We Differ: The Industry Contrast
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Compare how MS Enterprise stacks up against traditional agencies and unmanaged freelance platforms.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Traditional Agencies */}
            <TiltCard
              maxTilt={4}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 border-rose-500/20"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                  <Icon name="X" className="h-3 w-3" />
                  <span>Traditional Agencies</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  High Overhead & Bureaucracy
                </h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">x</span>
                    <span>Inflated invoices (3x to 4x markup) to pay for expensive physical offices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">x</span>
                    <span>Non-technical account managers who slow communication and misinterpret requirements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold">x</span>
                    <span>Rigid retainers with expensive change orders for small updates.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-200/60 pt-4 text-[11px] text-slate-500 dark:border-white/10">
                Outcome: Slow velocity and exorbitant costs.
              </div>
            </TiltCard>

            {/* Unmanaged Freelancers */}
            <TiltCard
              maxTilt={4}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 border-amber-500/20"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  <Icon name="AlertCircle" className="h-3 w-3" />
                  <span>Unmanaged Freelancers</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  Volatility & Missing Accountability
                </h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>Variable code quality with minimal security or performance testing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>Sudden ghosting or abandonment when unexpected complexity arises.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>Zero post-launch warranty or support once the contract closes.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-200/60 pt-4 text-[11px] text-slate-500 dark:border-white/10">
                Outcome: High risk and unpredictable timelines.
              </div>
            </TiltCard>

            {/* MS Enterprise Standard */}
            <TiltCard
              maxTilt={5}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 border-sky-500/50 shadow-liquid-elevated ring-2 ring-sky-500/20 dark:border-cyan-500/50 dark:ring-cyan-400/30"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                  <Icon name="Check" className="h-3 w-3" />
                  <span>The MS Enterprise Standard</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  Decentralized Engineering Rigor
                </h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-700 dark:text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Icon name="CheckCircle2" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Direct founder access: talk directly to system architects, not sales intermediaries.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="CheckCircle2" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Audited security, bespoke design (no generic templates), and low maintenance fees.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="CheckCircle2" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Guaranteed lifetime live support and authentic accountability on every commitment.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-sky-500/20 pt-4 text-[11px] font-semibold text-sky-700 dark:text-cyan-400">
                Outcome: High velocity, transparent execution, lasting peace of mind.
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ---------------- 5. LEADERSHIP & SYSTEM ARCHITECTS ---------------- */}
      <section className="relative mt-24 px-4 sm:px-6 lg:px-8" id="leadership">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
              Founders & Architects
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Leadership & System Architects
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Hands-on practitioners leading every client engagement with deep technical domain expertise.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Founder 1: Rana ShaMeer */}
            <TiltCard
              maxTilt={4}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-liquid-elevated dark:border-white/10 dark:shadow-spatial-elevated"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-md">
                    <Icon name="Code2" className="h-7 w-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                    <span>4 YEARS EXPERIENCE</span>
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Rana ShaMeer
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                  Founder & Technical Systems Architect
                </p>

                <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Rana brings 4 years of hands-on industry experience specializing in cybersecurity, full-stack systems architecture, and robust web engineering. He personally architects codebases, reviews every pull request, and enforces performance and security standards across all custom client builds.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Systems Architecture
                  </span>
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Cybersecurity
                  </span>
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Full-Stack Next.js
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200/60 pt-5 flex items-center justify-between dark:border-white/10">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  DG Khan, Pakistan to Global
                </span>
                <a
                  href="https://www.linkedin.com/in/rana-shameer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold"
                >
                  <span>LinkedIn Profile</span>
                  <Icon name="ExternalLink" className="h-3 w-3" />
                </a>
              </div>
            </TiltCard>

            {/* Founder 2: Moiz Zaffer */}
            <TiltCard
              maxTilt={4}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-liquid-elevated dark:border-white/10 dark:shadow-spatial-elevated"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-md">
                    <Icon name="Share2" className="h-7 w-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    <span>4 YEARS EXPERIENCE</span>
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Moiz Zaffer
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Co-Founder & Growth / Operations Director
                </p>

                <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Moiz brings 4 years of hands-on industry experience specializing in organic Meta expansion strategies, digital audience growth, and end-to-end ecommerce store operations. He directs social distribution frameworks and supervises dedicated virtual assistant store workflows.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Organic Meta Expansion
                  </span>
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Ecommerce Store Ops
                  </span>
                  <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Audience Scaling
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200/60 pt-5 flex items-center justify-between dark:border-white/10">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  DG Khan, Pakistan to Global
                </span>
                <a
                  href="https://www.linkedin.com/in/moizkhan65/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold"
                >
                  <span>LinkedIn Profile</span>
                  <Icon name="ExternalLink" className="h-3 w-3" />
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Regional Roots Badge */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <Icon name="MapPin" className="h-3.5 w-3.5 text-emerald-500" />
              <span>Rooted in Dera Ghazi Khan, Punjab, Pakistan / Delivering to international partners worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CLIENT FEEDBACK FORUM ---------------- */}
      <FeedbackForum />

      {/* ---------------- 6. DIRECT DISPATCH CTA SECTION ---------------- */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TiltCard
            maxTilt={3}
            className="spatial-card relative overflow-hidden rounded-4xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-liquid-elevated dark:border-cyan-500/30 dark:shadow-spatial-elevated"
          >
            {/* Ambient Background Sphere */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-sky-400/20 via-cyan-300/15 to-transparent blur-3xl dark:from-blue-600/20 dark:via-cyan-500/15" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                {/* Terminal Header */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
                  <Icon name="Terminal" className="h-3.5 w-3.5" />
                  <span>DISPATCH_PROTOCOL // INITIALIZE_PROJECT</span>
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  Ready to Build Without Agency Overhead?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Connect directly with Rana ShaMeer and Moiz Zaffer. We will analyze your operational realities, validate competitor benchmarks, and construct a tailored blueprint for your custom web platform, Meta community, or store operations.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/inquiry"
                    className="spatial-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    <span>Submit Project Inquiry</span>
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>

                  <a
                    href="https://wa.me/15550192834"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
                  >
                    <Icon name="MessageSquare" className="h-4 w-4 text-emerald-500" />
                    <span>Direct WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              {/* Terminal Preview Card */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-5 font-mono text-xs text-slate-200 shadow-xl dark:border-white/10 dark:bg-black/80">
                  <div className="flex items-center gap-1.5 border-b border-slate-700/60 pb-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-[10px] text-slate-400">ms-enterprise // dispatch.sh</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-[11px] text-slate-300">
                    <p className="text-emerald-400">$ ms-dispatch --target global</p>
                    <p className="text-slate-400">&gt; Node: DG Khan (Punjab, PK)</p>
                    <p className="text-slate-400">&gt; Status: FOUNDERS_AVAILABLE</p>
                    <p className="text-slate-400">&gt; Response SLA: &lt; 24 Hours</p>
                    <p className="text-cyan-400">&gt; Lifetime Live Support: ACTIVE</p>
                    <p className="text-sky-300 animate-pulse">&gt; Ready for telemetry handshake_</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
}
