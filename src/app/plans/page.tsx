import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPlans, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export const metadata: Metadata = {
  title: 'Service Plans & Pricing',
  description: 'Review transparent pricing and service plans for custom web development, Meta organic growth, and ecommerce VA operations.',
};

export default function PlansPage() {
  const plans = getPlans();
  const settings = getSettings();

  const webPlans = plans.filter((p) => p.serviceCategory === 'web');
  const metaPlans = plans.filter((p) => p.serviceCategory === 'meta');
  const ecomPlans = plans.filter((p) => p.serviceCategory === 'ecommerce');

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
            <span>Transparent Pricing</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Service Plans & Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Clear, honest pricing for custom software, targeted organic social growth, and dedicated store operations.
          </p>
        </div>

        {/* 1. Web Development Plans */}
        <div className="mt-20">
          <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-400">
              <Icon name="Code2" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Custom Website Development</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Lifetime live support, bespoke code, and very low monthly maintenance</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {webPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* 2. Meta (Facebook) Plans */}
        <div className="mt-20">
          <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400">
              <Icon name="Share2" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Meta (Facebook) Growth Services</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Targeted organic audience growth from selected countries per client demand</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {metaPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* 3. Ecommerce VA Plans */}
        <div className="mt-20">
          <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              <Icon name="ShoppingBag" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ecommerce Support (Virtual Assistant)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Meticulous store operations across any platform with honest accountability</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ecomPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* Need a Custom Scope? */}
        <div className="spatial-card mt-24 rounded-3xl p-8 text-center sm:p-12 shadow-liquid-card dark:shadow-spatial-card">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Require a Tailored Specification?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
            If your project involves specialized custom APIs, multi-platform migrations, or enterprise store requirements, reach out directly. We formulate a customized proposal with exact milestone pricing.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inquiry?service=custom"
              className="spatial-btn-primary rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
            >
              Request Custom Quote
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spatial-btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              <Icon name="MessageSquare" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Talk to Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: any }) {
  return (
    <TiltCard
      maxTilt={6}
      className={`spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 ${
        plan.isPopular
          ? 'border-sky-500/50 shadow-liquid-elevated ring-2 ring-sky-500/20 dark:border-cyan-500/50 dark:ring-cyan-400/30'
          : ''
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
          {plan.badge}
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{plan.description}</p>

        <div className="mt-6 flex items-baseline gap-2 border-b border-slate-200/60 pb-6 dark:border-white/10">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">/ {plan.billingPeriod}</span>
        </div>

        <ul className="mt-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
          {plan.features.map((feat: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
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
  );
}
