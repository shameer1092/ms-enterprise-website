import React from 'react';
import Link from 'next/link';
import { getSettings, getServices } from '@/lib/db';
import { QuickInquiryForm } from '@/components/inquiry/QuickInquiryForm';
import { Inspect3DButton } from '@/components/spatial/Inspect3DButton';
import { ProjectsGrid } from '@/components/ProjectsGrid';
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
  TrendingUp,
  Cpu,
  Globe,
} from 'lucide-react';

export default function HomePage() {
  const settings = getSettings();
  const services = getServices();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="relative overflow-x-hidden bg-transparent">
      {/* ---------------- 1. HERO SECTION (MOBILE ABOVE-THE-FOLD OPTIMIZED) ---------------- */}
      <section
        id="hero"
        className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 pb-8 sm:pb-16 bg-transparent relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10 relative z-10 my-auto">
          {/* Left Column: Heading & Punchy Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 liquid-glass p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl relative z-10 shadow-partner-card space-y-4 sm:space-y-6">
            {/* Partner Standard Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:bg-[#D4AF37]/15 dark:text-[#E5B238]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>
              <span>The Partner Standard • Direct Code</span>
            </div>

            {/* High-Impact Headline (Quote-Style Punchy Copy) */}
            <h1 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#121316] leading-[1.12] dark:text-white">
              Direct Code.{' '}
              <span className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-4 sm:underline-offset-8">
                Zero Agency Bloat.
              </span>
            </h1>

            {/* Short Punchy Subtitle */}
            <p className="max-w-2xl text-xs sm:text-base lg:text-lg leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB]">
              You talk directly to the software architects building your platform. No account managers. No inflated retainers.
            </p>

            {/* Action Buttons: Primary CTA visible on mobile, Secondary link on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/inquiry"
                className="spatial-btn-primary group inline-flex items-center justify-center gap-2.5 py-3 px-6 text-xs sm:text-sm font-bold min-h-[48px]"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#web-dev"
                className="spatial-btn-secondary hidden sm:inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold min-h-[48px]"
              >
                <span>Explore 3D Architecture</span>
                <span className="text-[#D4AF37] font-bold">↓</span>
              </a>
            </div>

            {/* Trust Indicators (Streamlined for mobile: 2 on mobile, 4 on sm/md) */}
            <div className="border-t border-[#E5E7EB] pt-4 sm:pt-6 dark:border-[#2A2D34]">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
                {[
                  { text: 'Direct Architect Access', core: true },
                  { text: 'Lifetime Live Support', core: true },
                  { text: 'Zero Middle Managers', core: false },
                  { text: 'Low Monthly Maintenance', core: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#121316] dark:text-[#E5E7EB] ${
                      item.core ? 'flex' : 'hidden sm:flex'
                    }`}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#B8860B] dark:text-[#E5B238]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated 3D Spatial Centerpiece Dock (Hidden on mobile to eliminate vertical cutoffs) */}
          <div className="hidden lg:flex lg:col-span-5 h-[620px] relative flex-col items-center justify-end pb-4 pointer-events-none">
            {/* Quick 360 Orbit Inspect Pill */}
            <Inspect3DButton variant="badge" />
          </div>
        </div>
      </section>

      {/* ---------------- 2. PILLAR 01: CUSTOM WEBSITE DEVELOPMENT (STAGE 0.25 - 3D EXPLODED WIREFRAME LEFT) ---------------- */}
      <section
        id="web-dev"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Spacing: Dedicated 3D Exploded Structural Core Dock (6 Cols) */}
          <div className="hidden lg:flex lg:col-span-6 order-2 lg:order-1 h-[600px] pointer-events-none items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Exploded Lattice Structural Core
            </span>
          </div>

          {/* Right Column: Web Dev Content & Punchy Feature Chips (6 Cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative z-10">
            <div className="liquid-glass p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl relative z-10 shadow-partner-card space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded bg-[#D4AF37]" />
                <span>Pillar 01 • Core Engineering</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Custom Website <br />
                <span className="text-[#D4AF37]">Development & Spatial UI</span>
              </h2>

              {/* Quote-Style Punchy Lead */}
              <blockquote className="border-l-2 border-[#D4AF37] pl-3 text-xs sm:text-sm font-semibold text-[#121316] dark:text-[#E5E7EB] italic">
                &ldquo;Clean codebases. Sub-100ms TTFB. Zero template lock-in.&rdquo;
              </blockquote>

              {/* Feature Chips & Verified Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="glass-panel p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold font-mono text-[#121316] dark:text-white">
                      Sub-100ms TTFB
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Next.js 14 App Router, Server Components & ACES Filmic WebGL.
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold font-mono text-[#121316] dark:text-white">
                      100% Clean Code
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Custom TypeScript architecture with zero bloated theme debt.
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold font-mono text-[#121316] dark:text-white">
                      Competitor Redesign
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Reverse-engineering top rivals for maximum conversion speed.
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold font-mono text-[#121316] dark:text-white">
                      Lifetime Live Support
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    Direct engineer standby for ongoing security & feature updates.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/web-development"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37] min-h-[44px]"
                >
                  <span>Explore Web Engineering Specs</span>
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
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Meta Services Content (6 Cols) */}
          <div className="lg:col-span-6 relative z-10">
            <div className="liquid-glass p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl relative z-10 shadow-partner-card space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pillar 02 • Organic Growth Ecosystem</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Meta (Facebook) <br />
                <span className="text-[#D4AF37]">Multi-Country Reach</span>
              </h2>

              {/* Quote-Style Lead */}
              <blockquote className="border-l-2 border-emerald-500 pl-3 text-xs sm:text-sm font-semibold text-[#121316] dark:text-[#E5E7EB] italic">
                &ldquo;High-intent buyer reach on Facebook — zero bot farming, zero synthetic fluff.&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="glass-panel p-4 rounded-2xl">
                  <div className="text-xl font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-0.5">
                    100% Organic
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                    Bot-Free Growth
                  </h3>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    Real community engagement with actual purchasing power.
                  </p>
                </div>

                <div className="glass-panel p-4 rounded-2xl">
                  <div className="text-xl font-mono text-[#D4AF37] font-bold mb-0.5">
                    Multi-Geo
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                    Targeted Countries
                  </h3>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    Audience routing across USA, UK, Gulf, and European markets.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#121316] dark:text-[#E5B238] flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
                <span>
                  DIRECT OVERSIGHT: Hands-on community scaling supervised directly by Moiz Zaffer.
                </span>
              </div>

              <div className="pt-1">
                <Link
                  href="/services/meta-services"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37] min-h-[44px]"
                >
                  <span>Explore Meta Strategies</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Spacing: Dedicated 3D Global Audience Node Dock (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-6 h-[600px] pointer-events-none items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Global Audience Satellite Matrix
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- 4. PILLAR 03: ECOMMERCE SUPPORT & VA OPS (STAGE 0.75 - 3D OBSIDIAN VAULT LEFT) ---------------- */}
      <section
        id="ecommerce-ops"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 bg-transparent scroll-mt-16 relative z-10"
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Spacing: Dedicated 3D Obsidian Vault Dock (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-6 order-2 lg:order-1 h-[600px] pointer-events-none items-end justify-center pb-4">
            <span className="font-mono text-[11px] text-[#6B7280] dark:text-[#9CA3AF] bg-white/70 dark:bg-[#1E2024]/70 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[#2A2D34] backdrop-blur-md">
              ✦ Deep Obsidian Precision Vault
            </span>
          </div>

          {/* Right Column: VA Operations Content & Metric Panels (6 Cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative z-10">
            <div className="liquid-glass p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl relative z-10 shadow-partner-card space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] dark:text-[#E5B238] uppercase tracking-widest font-bold">
                <span className="h-2 w-2 rounded bg-[#D4AF37]" />
                <span>Pillar 03 • Operations & Virtual Assistance</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] dark:text-white leading-[1.15]">
                Ecommerce Support & <br />
                <span className="text-[#D4AF37]">Dedicated VA Store Ops</span>
              </h2>

              {/* Quote-Style Lead */}
              <blockquote className="border-l-2 border-[#D4AF37] pl-3 text-xs sm:text-sm font-semibold text-[#121316] dark:text-[#E5E7EB] italic">
                &ldquo;24/7 autonomous store operations across Shopify, WooCommerce & Amazon.&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                <div className="glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center">
                  <span className="text-lg sm:text-xl block mb-1">📦</span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#121316] dark:text-white block">
                    Inventory Sync
                  </span>
                  <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] hidden sm:block">
                    Real-time stock audits
                  </span>
                </div>
                <div className="glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center">
                  <span className="text-lg sm:text-xl block mb-1">⚡</span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#121316] dark:text-white block">
                    Fast Orders
                  </span>
                  <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] hidden sm:block">
                    Same-day fulfillment
                  </span>
                </div>
                <div className="glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center">
                  <span className="text-lg sm:text-xl block mb-1">🤝</span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#121316] dark:text-white block">
                    Supplier Care
                  </span>
                  <span className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] hidden sm:block">
                    Live dispute handling
                  </span>
                </div>
              </div>

              {/* Full-Time VA Operations Highlight Panel */}
              <div className="glass-panel-elevated p-4 sm:p-5 rounded-2xl border-l-4 border-l-[#D4AF37]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] font-bold">
                    Dedicated Full-Time VA
                  </span>
                  <span className="text-xs font-mono font-bold text-[#121316] dark:text-white">
                    $490 / month
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#2B2D33] dark:text-[#E5E7EB] leading-relaxed">
                  40 hours weekly: catalog management, supplier sync, and direct WhatsApp channel access.
                </p>
              </div>

              <div className="pt-1">
                <Link
                  href="/services/ecommerce-support"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#D4AF37] transition-colors dark:text-white dark:hover:text-[#D4AF37] min-h-[44px]"
                >
                  <span>Explore Store VA Operations</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. DEDICATED PROJECTS & PORTFOLIO GRID ---------------- */}
      <section id="projects" className="relative z-20 py-16 sm:py-24 bg-transparent scroll-mt-16">
        <ProjectsGrid />
      </section>

      {/* ---------------- 6. THE PARTNER STANDARD & FOUNDERS (HANDS-ON LEADERSHIP) ---------------- */}
      <section id="about" className="relative z-20 py-16 sm:py-24 bg-transparent scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-20">
          <div className="mx-auto max-w-3xl text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/80 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#121316] shadow-sm backdrop-blur-md dark:bg-[#1E2024]/80 dark:text-white dark:border-[#D4AF37]/40">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Founded in 2026 • Dera Ghazi Khan (DG Khan), Punjab, Pakistan</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#121316] dark:text-white">
              Hands-On Leadership. Direct Accountability.
            </h2>
            <p className="text-xs sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
              When you hire MS Enterprise, you collaborate directly with two founding leads who write code and scale traffic.
            </p>
          </div>

          {/* 3 Partner Standard Differences */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>01 • Direct Access</span>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-[#121316] dark:text-white">
                  Zero Middle Managers
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  Talk straight to the software engineers building your platform. No non-technical account managers forwarding emails.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <Zap className="h-4 w-4 text-[#D4AF37]" />
                <span>Fast iteration without delay</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>02 • Agile Network</span>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-[#121316] dark:text-white">
                  Decentralized Network Agility
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  A vetted network of independent specialists supervised by founding leads. Enterprise quality without 4x agency markups.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <Users className="h-4 w-4 text-[#D4AF37]" />
                <span>Supervised by Rana & Moiz</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121316]">
                  <span>03 • Long-Term Care</span>
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-[#121316] dark:text-white">
                  Lifetime Accountability
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  Guaranteed uptime, prompt security patches, and direct live support. We stay in your corner for the long haul.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex items-center gap-2 text-xs font-semibold text-[#121316] dark:text-[#E5B238]">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                <span>Honest guarantees & stability</span>
              </div>
            </div>
          </div>

          {/* 2 Founders Cards */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 max-w-5xl mx-auto relative z-20">
            {/* Founder 1: Rana ShaMeer */}
            <div className="glass-panel-elevated p-6 sm:p-9 rounded-3xl relative z-20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Technical Architecture</span>
                  </span>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#121316] dark:text-white">
                    Rana ShaMeer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] mt-0.5">
                    Founder & Technical Systems Architect
                  </p>
                </div>

                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-mono font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <blockquote className="mt-4 border-l-2 border-[#D4AF37] pl-3 text-xs sm:text-sm leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB] italic">
                &ldquo;4 years of engineering high-performance Next.js architectures, reviewing every commit, and guaranteeing sub-second page speeds.&rdquo;
              </blockquote>

              <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                {['Next.js App Router', 'TypeScript', 'Cybersecurity', 'API Systems'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-white/70 border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316]/70 dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  Direct Architect Oversight
                </span>
                <a
                  href="https://www.linkedin.com/in/rana-shameer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold min-h-[44px]"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Founder 2: Moiz Zaffer */}
            <div className="glass-panel-elevated p-6 sm:p-9 rounded-3xl relative z-20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Growth & Operations</span>
                  </span>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#121316] dark:text-white">
                    Moiz Zaffer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238] mt-0.5">
                    Co-Founder & Growth / Operations Director
                  </p>
                </div>

                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-mono font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <blockquote className="mt-4 border-l-2 border-[#D4AF37] pl-3 text-xs sm:text-sm leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB] italic">
                &ldquo;4 years of expanding organic international audiences on Facebook and directing 24/7 ecommerce virtual assistant store operations.&rdquo;
              </blockquote>

              <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                {['Meta Organic Growth', 'Ecommerce VA', 'Shopify & Amazon', 'Audience Building'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-white/70 border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316]/70 dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  Direct Operations Oversight
                </span>
                <a
                  href="https://www.linkedin.com/in/moizkhan65/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold min-h-[44px]"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. DIRECT CONSULTATION & INQUIRY ---------------- */}
      <section
        id="inquiry"
        className="relative z-20 py-20 sm:py-24 bg-transparent scroll-mt-16"
      >
        <div id="pricing-inquiry" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-20">
          {/* Quick Consultation Inquiry Form */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
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
