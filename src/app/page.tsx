import React from 'react';
import Link from 'next/link';
import { getSettings, getServices } from '@/lib/db';
import { QuickInquiryForm } from '@/components/inquiry/QuickInquiryForm';
import { Inspect3DButton } from '@/components/spatial/Inspect3DButton';
import {
  Code2,
  Share2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Linkedin,
  MapPin,
  MessageSquare,
  Mail,
  Award,
  Clock,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const settings = getSettings();
  const services = getServices();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="relative overflow-x-hidden bg-transparent">
      {/* ---------------- 1. HERO SECTION (SCROLLYTELLING STAGE 0.0 - 3D DOCKED RIGHT) ---------------- */}
      <section
        id="hero"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 pt-20 pb-16 bg-transparent relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 relative z-10">
          {/* Left Column: Heading & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 liquid-glass p-7 sm:p-9 rounded-3xl relative z-10 shadow-partner-card space-y-6">
            {/* Partner Standard Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:bg-[#D4AF37]/15 dark:text-[#E5B238]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>
              <span>The Partner Standard • No Agency Bloat</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl lg:text-[3.25rem] leading-[1.12] dark:text-white">
              We build high-performing web platforms and scale online stores —{' '}
              <span className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-8">
                without agency bloat.
              </span>
            </h1>

            {/* Humanized Subtitle */}
            <p className="max-w-2xl text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
              No non-technical intermediaries. No inflated retainers. You work directly with experienced software architects and growth operators who take full ownership of your project.
            </p>

            {/* Action Buttons: 60-30-10 Gold & Matte Dark */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/inquiry"
                className="spatial-btn-primary group inline-flex items-center gap-2.5"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#web-dev"
                className="spatial-btn-secondary inline-flex items-center gap-2"
              >
                <span>Explore 3D Architecture</span>
                <span className="text-[#D4AF37] font-bold">↓</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-[#E5E7EB] pt-6 dark:border-[#2A2D34]">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  'Direct Architect Access',
                  'Zero Middle Managers',
                  'Lifetime Live Support',
                  'Low Monthly Maintenance',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5E7EB]"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#B8860B] dark:text-[#E5B238]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated 3D Spatial Centerpiece Dock (5 Cols) */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[620px] relative flex flex-col items-center justify-end pb-4 pointer-events-none">
            {/* Quick 360 Orbit Inspect Pill */}
            <Inspect3DButton variant="badge" />
          </div>
        </div>
      </section>

      {/* ---------------- 2. PILLAR 01: CUSTOM WEBSITE DEVELOPMENT (STAGE 0.25 - 3D EXPLODED WIREFRAME LEFT) ---------------- */}
      <section
        id="web-dev"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Spacing: Dedicated 3D Exploded Structural Core Dock (6 Cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 h-[320px] sm:h-[400px] lg:h-[600px] pointer-events-none flex items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Exploded Lattice Structural Core
            </span>
          </div>

          {/* Right Column: Web Dev Content & Glass Panels (6 Cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative z-10">
            <div className="liquid-glass p-7 sm:p-9 rounded-3xl relative z-10 shadow-partner-card space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded bg-[#D4AF37]" />
                <span>Pillar 01 • Core Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Custom Website <br />
                <span className="text-[#D4AF37]">Development & Spatial UI</span>
              </h2>

              <p className="text-[#2B2D33] text-sm sm:text-base leading-relaxed dark:text-[#E5E7EB]">
                Tailored web platforms, custom ecommerce stores, company portals, and competitor-informed redesigns. We eliminate template locks to give you raw performance, pristine codebases, and direct developer communication.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] dark:text-[#E5B238] font-mono text-xs font-bold shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#121316] dark:text-white">
                      No Generic Template Locks
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                      Bespoke spatial design engineered ground-up with Next.js App Router and TypeScript. Modular asset pipelines, sub-second TTFB, and zero technical debt.
                    </p>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#121316]/10 dark:bg-white/10 border border-[#E5E7EB] dark:border-[#2A2D34] flex items-center justify-center text-[#121316] dark:text-white font-mono text-xs font-bold shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#121316] dark:text-white">
                      Competitor-Informed Redesign
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                      We dissect your top 5 competitors, isolate functional bottlenecks, and reconstruct your digital footprint with superior UX and conversion speed.
                    </p>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] dark:text-[#E5B238] font-mono text-xs font-bold shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#121316] dark:text-white">
                      Guaranteed Lifetime Live Support
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                      You deal with the exact software engineers who built the system. Unconditional standby assistance whenever you need updates, security patches, or features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/web-development"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37]"
                >
                  <span>Explore Full Web Engineering Specs</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. PILLAR 02: META SERVICES (STAGE 0.50 - 3D GLOBAL AUDIENCE DOCKED RIGHT) ---------------- */}
      <section
        id="meta-growth"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Meta Services Content (6 Cols) */}
          <div className="lg:col-span-6 relative z-10">
            <div className="liquid-glass p-7 sm:p-9 rounded-3xl relative z-10 shadow-partner-card space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pillar 02 • Organic Growth Ecosystem</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Meta (Facebook) <br />
                <span className="text-[#D4AF37]">Multi-Country Reach</span>
              </h2>

              <p className="text-[#2B2D33] text-sm sm:text-base leading-relaxed dark:text-[#E5E7EB]">
                Organic Facebook page scaling, targeted community nurturing, and multi-country audience traffic synchronized with your business demographics without artificial inflation or bot farming.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="glass-panel p-5 rounded-2xl">
                  <div className="text-2xl font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    100%
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                    Organic & Bot-Free
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    Strict avoidance of synthetic metrics. Real community engagement with actual purchasing power and long-term brand retention.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-2xl">
                  <div className="text-2xl font-mono text-[#D4AF37] font-bold mb-1">
                    Multi-Geo
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                    Target Country Focus
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    Deploy audience routing pipelines tailored to specific regional territories (USA, UK, Gulf, Europe) and language preferences.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#121316] dark:text-[#E5B238] flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
                <span>
                  DIRECT OVERSIGHT: Hands-on community management & real audience growth supervised directly by Moiz Zaffer.
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/meta-services"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37]"
                >
                  <span>Explore Meta Community Strategies</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Spacing: Dedicated 3D Global Audience Node Dock (6 Cols) */}
          <div className="lg:col-span-6 h-[320px] sm:h-[400px] lg:h-[600px] pointer-events-none flex items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Global Audience Satellite Matrix
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- 4. PILLAR 03: ECOMMERCE SUPPORT & VA OPS (STAGE 0.75 - 3D OBSIDIAN VAULT LEFT) ---------------- */}
      <section
        id="ecommerce-ops"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Spacing: Dedicated 3D Obsidian Vault Dock (6 Cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 h-[320px] sm:h-[400px] lg:h-[600px] pointer-events-none flex items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Deep Obsidian Precision Vault
            </span>
          </div>

          {/* Right Column: VA Operations Content & Stat Panels (6 Cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative z-10">
            <div className="liquid-glass p-7 sm:p-9 rounded-3xl relative z-10 shadow-partner-card space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded bg-[#D4AF37]" />
                <span>Pillar 03 • Operations & Virtual Assistance</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Ecommerce Support & <br />
                <span className="text-[#D4AF37]">Dedicated VA Store Ops</span>
              </h2>

              <p className="text-[#2B2D33] text-sm sm:text-base leading-relaxed dark:text-[#E5E7EB]">
                Uninterrupted store management across Shopify, WooCommerce, Amazon, eBay, and bespoke systems. From bulk catalog uploads to supply chain alerts and live dispute handling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-2xl block mb-1">📦</span>
                  <span className="text-xs font-bold text-[#121316] dark:text-white block">
                    Inventory Audits
                  </span>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                    Stock velocity & alerts
                  </span>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-2xl block mb-1">⚡</span>
                  <span className="text-xs font-bold text-[#121316] dark:text-white block">
                    Order Processing
                  </span>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                    Fulfillment & tracking
                  </span>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center">
                  <span className="text-2xl block mb-1">🤝</span>
                  <span className="text-xs font-bold text-[#121316] dark:text-white block">
                    Supplier Sync
                  </span>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                    Disputes & vendor care
                  </span>
                </div>
              </div>

              {/* Full-Time VA Operations Highlight Panel */}
              <div className="glass-panel-elevated p-6 rounded-2xl border-l-4 border-l-[#D4AF37]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] font-bold">
                    Dedicated Full-Time VA Operations
                  </span>
                  <span className="text-xs font-mono font-bold text-[#121316] dark:text-white">
                    $490 / month
                  </span>
                </div>
                <p className="text-xs text-[#2B2D33] dark:text-[#E5E7EB] leading-relaxed">
                  40 hours weekly of full store operations, catalog management, supplier coordination, and direct Slack/WhatsApp channel access.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/ecommerce-support"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37]"
                >
                  <span>Explore Store VA Operations</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. THE PARTNER STANDARD & FOUNDERS (HANDS-ON LEADERSHIP) ---------------- */}
      <section id="about" className="relative py-24 bg-transparent scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#121316] shadow-sm backdrop-blur-md dark:bg-[#1E2024]/80 dark:text-white dark:border-[#D4AF37]/40">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Founded in 2026 • Dera Ghazi Khan (DG Khan), Punjab, Pakistan</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#121316] sm:text-4xl dark:text-white">
              Hands-On Leadership. Direct Accountability.
            </h2>
            <p className="text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
              When you hire MS Enterprise, you don&apos;t get pawned off to junior contractors. You collaborate directly with our two founding leads who bring deep technical discipline and verified track records.
            </p>
          </div>

          {/* 3 Partner Standard Differences */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>01 • Direct Access</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#121316] dark:text-white">
                  Direct Architect Access
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  Talk directly to the software engineers writing your code and managing your campaigns. No non-technical account managers who simply forward emails or lose critical details in translation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <Zap className="h-4 w-4 text-[#D4AF37]" />
                <span>Fast iteration without delays</span>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>02 • Agile Network</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#121316] dark:text-white">
                  Decentralized Network Agility
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  A vetted network of independent specialists supervised by core founding leads. Enterprise quality and rapid turnaround without 4x agency markups or bloated overhead.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <Users className="h-4 w-4 text-[#D4AF37]" />
                <span>Supervised by Rana & Moiz</span>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>03 • Long-Term Value</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#121316] dark:text-white">
                  Lifetime Accountability
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  Guaranteed uptime, direct live support, and low monthly maintenance. We don&apos;t build a platform and disappear; we stay in your corner for the long haul.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                <span>Honest guarantees & stability</span>
              </div>
            </div>
          </div>

          {/* 2 Founders Cards */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Founder 1: Rana ShaMeer */}
            <div className="glass-panel-elevated p-8 sm:p-9 rounded-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Technical Architecture</span>
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-[#121316] dark:text-white">
                    Rana ShaMeer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] mt-0.5">
                    Founder & Technical Systems Architect
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-mono font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                Rana brings <strong>4 years of industry experience</strong> in high-performance full-stack web engineering, cybersecurity, and Next.js systems. He personally reviews every pull request, optimizes page rendering speeds, and guarantees long-term codebase maintainability.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js App Router', 'TypeScript', 'Cybersecurity', 'API Systems'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-white/70 border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316]/70 dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  Direct Engineering Oversight
                </span>
                <a
                  href="https://www.linkedin.com/in/rana-shameer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Founder 2: Moiz Zaffer */}
            <div className="glass-panel-elevated p-8 sm:p-9 rounded-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Growth & Operations</span>
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-[#121316] dark:text-white">
                    Moiz Zaffer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] mt-0.5">
                    Co-Founder & Growth / Operations Director
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-mono font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                Moiz has <strong>4 years of industry experience</strong> driving organic Facebook page audience expansion and overseeing international ecommerce store operations. He manages our virtual assistant team to ensure flawless inventory synchronization and daily fulfillment.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Meta Organic Growth', 'Ecommerce VA', 'Shopify & Amazon', 'Audience Building'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-white/70 border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316]/70 dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  Direct Operations Oversight
                </span>
                <a
                  href="https://www.linkedin.com/in/moizkhan65/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. STANDARDIZED PACKAGES & CONSULTATION INQUIRY (STAGE 1.0 - 3D MONOLITH CENTER) ---------------- */}
      <section
        id="pricing-inquiry"
        className="relative py-24 bg-transparent scroll-mt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B8860B] dark:text-[#E5B238] font-bold">
              Transparent Pricing & Direct Engagement
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white">
              Engineered Packages. Ready for Deployment.
            </h2>
            <p className="text-base text-[#6B7280] dark:text-[#9CA3AF]">
              Select a standardized blueprint or connect with our technical engineers for a custom enterprise audit.
            </p>
          </div>

          {/* 3 Core Packages (Matching Demo HTML & Database) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Essential Web Platform */}
            <div className="glass-panel p-7 rounded-3xl flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-[#B8860B] dark:text-[#E5B238] uppercase">
                  Custom Website Development
                </div>
                <h3 className="text-xl font-bold text-[#121316] dark:text-white">
                  Essential Web Platform
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-extrabold text-[#121316] dark:text-white">
                    $450
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                    / one-time
                  </span>
                </div>
                <ul className="text-xs text-[#2B2D33] dark:text-[#E5E7EB] space-y-2.5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Up to 5 custom designed pages
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Zero generic templates (100% custom code)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Lifetime live technical support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Speed & accessibility optimization
                  </li>
                </ul>
              </div>
              <Link
                href="/inquiry?service=web&plan=Essential+Web+Platform"
                className="mt-8 w-full py-3 rounded-xl text-xs font-mono uppercase font-bold tracking-wider text-center bg-[#FBFBFA] border border-[#E5E7EB] text-[#121316] hover:bg-[#D4AF37] hover:text-[#121316] hover:border-[#D4AF37] transition-all dark:bg-[#121316] dark:border-[#2A2D34] dark:text-white"
              >
                Select Essential Plan
              </Link>
            </div>

            {/* Card 2: Professional Custom / Ecommerce (Most Popular with Gold Highlight) */}
            <div className="glass-panel-elevated p-7 rounded-3xl flex flex-col justify-between border-2 border-[#D4AF37] relative hover:scale-[1.03] transition-transform shadow-xl">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37] text-[#121316] shadow-sm">
                Most Popular
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                  Custom Website Development
                </div>
                <h3 className="text-xl font-bold text-[#121316] dark:text-white">
                  Professional / Ecommerce
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-extrabold text-[#D4AF37]">
                    $950
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                    / one-time
                  </span>
                </div>
                <ul className="text-xs text-[#2B2D33] dark:text-[#E5E7EB] space-y-2.5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Bespoke Spatial UI layout & animations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Full custom ecommerce / business portal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Competitor audit & blueprint redesign
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span> Direct developer live support channel
                  </li>
                </ul>
              </div>
              <Link
                href="/inquiry?service=web&plan=Professional+Custom"
                className="mt-8 w-full py-3 rounded-xl text-xs font-mono uppercase font-bold tracking-wider text-center bg-[#D4AF37] text-[#121316] hover:bg-[#B8860B] hover:text-white transition-all shadow-md"
              >
                Select Professional Plan
              </Link>
            </div>

            {/* Card 3: Meta Multi-Country Stream */}
            <div className="glass-panel p-7 rounded-3xl flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Meta (Facebook) Services
                </div>
                <h3 className="text-xl font-bold text-[#121316] dark:text-white">
                  Multi-Country Stream
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-mono font-extrabold text-[#121316] dark:text-white">
                    $340
                  </span>
                  <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                    / monthly
                  </span>
                </div>
                <ul className="text-xs text-[#2B2D33] dark:text-[#E5E7EB] space-y-2.5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Up to 4 selected target countries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Demographic-specific content flow
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 100% authentic organic growth
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Continuous community outreach
                  </li>
                </ul>
              </div>
              <Link
                href="/inquiry?service=meta&plan=Meta+Multi-Country+Stream"
                className="mt-8 w-full py-3 rounded-xl text-xs font-mono uppercase font-bold tracking-wider text-center bg-[#FBFBFA] border border-[#E5E7EB] text-[#121316] hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all dark:bg-[#121316] dark:border-[#2A2D34] dark:text-white"
              >
                Select Growth Stream
              </Link>
            </div>
          </div>

          {/* Quick Consultation Inquiry Form */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center pt-8">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Let&apos;s Talk</span>
              </span>

              <h3 className="text-3xl font-extrabold tracking-tight text-[#121316] sm:text-4xl dark:text-white">
                Ready to build something fast without agency nonsense?
              </h3>

              <p className="text-base leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                Tell us about what you want to build or scale. We review your specifications, competitor landscape, and provide an honest assessment, fixed quote, and realistic delivery timeline.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-[#D4AF37]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                      WhatsApp Direct Desk
                    </div>
                    <div className="text-sm font-bold text-[#121316] dark:text-white">
                      Instant response during active hours
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-[#D4AF37]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] shadow-sm dark:bg-white dark:text-[#121316]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                      Direct Email Line
                    </div>
                    <div className="text-sm font-bold text-[#121316] dark:text-white">
                      {settings.email}
                    </div>
                  </div>
                </a>

                <div className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#B8860B] shadow-sm dark:text-[#E5B238]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                      Response Commitment
                    </div>
                    <div className="text-sm font-bold text-[#121316] dark:text-white">
                      Guaranteed within 4 to 12 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Lightweight Form */}
            <div className="lg:col-span-7">
              <QuickInquiryForm whatsappNumber={settings.whatsapp} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
