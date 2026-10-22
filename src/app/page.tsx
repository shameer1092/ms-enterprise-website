import React from 'react';
import Link from 'next/link';
import { getContent, getServices, getPlans, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';
import { HeroVisual } from '@/components/spatial/HeroVisual';

export default function HomePage() {
  const content = getContent();
  const services = getServices();
  const plans = getPlans().filter((p) => p.isPopular || p.order <= 3);
  const settings = getSettings();

  return (
    <div className="relative">
      {/* ---------------- 1. HERO SECTION WITH APPLE LIQUID GLASS PREVIEW ---------------- */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7">
              {/* Liquid Glass Pill Badge with Live 2D Radar Pulse */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="radar-ping absolute inline-flex h-full w-full bg-sky-500 opacity-80 dark:bg-cyan-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-400" />
                </span>
                <span>{content.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] dark:text-white">
                <span>{content.hero.titleLine1}</span>{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300">
                  {content.hero.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                {content.hero.subtitle}
              </p>

              {/* Fluid Pill Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={content.hero.primaryCtaLink}
                  className="spatial-btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold shadow-sm"
                >
                  <span>{content.hero.primaryCtaText}</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
                <Link
                  href={content.hero.secondaryCtaLink}
                  className="spatial-btn-secondary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium"
                >
                  <span>{content.hero.secondaryCtaText}</span>
                  <Icon name="ChevronRight" className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 border-t border-slate-200/70 pt-6 dark:border-white/10">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {content.hero.trustPills.map((pill, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/30">
                        <Icon name="Check" className="h-3.5 w-3.5" />
                      </div>
                      <span>{pill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Apple Liquid Glass Interactive Window */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. SERVICES OVERVIEW (TILT GLASS CARDS) ---------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-300">
              <Icon name="Compass" className="h-3.5 w-3.5" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Specialized Services Built with Accountability
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              High-performance engineering, organic Meta social expansion, and diligent ecommerce store operations tailored to your business goals.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((srv) => (
              <TiltCard
                key={srv.id}
                maxTilt={6}
                className="spatial-card flex h-full flex-col justify-between rounded-3xl p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 shadow-sm dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/30">
                      <Icon name={srv.iconName} className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100/80 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-slate-700 border border-slate-200/80 dark:bg-white/5 dark:text-slate-300 dark:border-white/10">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{srv.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {srv.summary}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-slate-200/60 pt-6 text-xs text-slate-700 dark:border-white/10 dark:text-slate-300">
                    {srv.highlights.slice(0, 4).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 transition-colors hover:text-sky-800 dark:text-cyan-300 dark:hover:text-cyan-200"
                  >
                    <span>Explore Service Details</span>
                    <Icon
                      name="ArrowRight"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 3. WHY CHOOSE US (SEGMENTED MODULAR WIDGETS) ---------------- */}
      <section className="relative py-24 border-y border-slate-200/70 bg-white/40 dark:border-white/10 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
              Our Principles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {content.whyChooseUs.heading}
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              {content.whyChooseUs.subheading}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.whyChooseUs.pillars.map((pillar, idx) => (
              <TiltCard
                key={idx}
                maxTilt={6}
                className="spatial-card rounded-3xl p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 shadow-sm dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/25">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {pillar.description}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. FEATURED PLANS (APPLE LIQUID GLASS PRICING) ---------------- */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                Transparent Pricing
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Featured Service Packages
              </h2>
            </div>
            <Link
              href="/plans"
              className="spatial-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold"
            >
              <span>View All Plans</span>
              <Icon name="ArrowRight" className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Top 3 Primary Packages */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.slice(0, 3).map((plan) => (
              <TiltCard
                key={plan.id}
                maxTilt={6}
                className={`spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 pt-9 ${
                  plan.isPopular
                    ? 'border-sky-500/50 shadow-liquid-elevated ring-2 ring-sky-500/20 dark:border-cyan-500/50 dark:ring-cyan-400/30'
                    : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 right-6 z-20 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md ring-2 ring-white dark:ring-slate-900">
                    {plan.badge}
                  </div>
                )}

                <div className="flex flex-1 flex-col">
                  <div className="min-h-[64px]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                      {plan.serviceTitle}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  </div>

                  <p className="mt-2 min-h-[44px] text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2 border-b border-slate-200/60 pb-6 dark:border-white/10">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">/ {plan.billingPeriod}</span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Icon name="Check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-cyan-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={plan.ctaLink}
                    className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-all ${
                      plan.isPopular ? 'spatial-btn-primary' : 'spatial-btn-secondary'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Centered Specialized Retainers (Row 2: Meta Growth & Ecommerce Support) */}
          {plans.length > 3 && (
            <div className="mt-8 mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {plans.slice(3).map((plan) => (
                <TiltCard
                  key={plan.id}
                  maxTilt={6}
                  className={`spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 pt-9 ${
                    plan.isPopular
                      ? 'border-sky-500/50 shadow-liquid-elevated ring-2 ring-sky-500/20 dark:border-cyan-500/50 dark:ring-cyan-400/30'
                      : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 z-20 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md ring-2 ring-white dark:ring-slate-900">
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex flex-1 flex-col">
                    <div className="min-h-[64px]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                        {plan.serviceTitle}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    </div>

                    <p className="mt-2 min-h-[44px] text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-2 border-b border-slate-200/60 pb-6 dark:border-white/10">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/ {plan.billingPeriod}</span>
                    </div>

                    <ul className="mt-6 flex-1 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Icon name="Check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-cyan-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      href={plan.ctaLink}
                      className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-all ${
                        plan.isPopular ? 'spatial-btn-primary' : 'spatial-btn-secondary'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- 5. INQUIRY SHORTCUT (LIQUID GLASS CALLOUT) ---------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TiltCard
            maxTilt={4}
            className="spatial-card relative overflow-hidden rounded-4xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-liquid-elevated dark:border-cyan-500/30 dark:shadow-spatial-elevated"
          >
            {/* Ambient Multi-Hue Sphere in background */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-sky-400/20 via-cyan-300/15 to-transparent blur-3xl dark:from-blue-600/20 dark:via-cyan-500/15" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
                  <span>Start Your Project</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  Have a Project in Mind or Need Dedicated Support?
                </h2>
                <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed dark:text-slate-300">
                  Connect with our team directly. We review your requirements, examine competitor benchmarks, and construct a transparent execution roadmap with lifetime live support.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/inquiry"
                    className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    <span>Submit Project Inquiry</span>
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold"
                  >
                    <Icon name="MessageSquare" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>WhatsApp Direct Chat</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Direct Verification Lines
                  </h3>
                  <div className="mt-4 space-y-3.5 text-xs">
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-sky-700 dark:text-slate-300 dark:hover:text-cyan-300"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/20">
                        <Icon name="Phone" className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">{settings.phone}</span>
                    </a>
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-sky-700 dark:text-slate-300 dark:hover:text-cyan-300"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/20">
                        <Icon name="Mail" className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">{settings.email}</span>
                    </a>
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
