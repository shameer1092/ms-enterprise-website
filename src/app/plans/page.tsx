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
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <span>Transparent Pricing</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Service Plans & Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Clear, honest pricing for custom software, targeted organic social growth, and dedicated store operations.
          </p>
        </div>

        {/* 1. Web Development Plans */}
        <div className="mt-20">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Icon name="Code2" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Custom Website Development</h2>
              <p className="text-xs text-slate-400">Lifetime live support, bespoke code, and very low monthly maintenance</p>
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
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Icon name="Share2" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Meta (Facebook) Growth Services</h2>
              <p className="text-xs text-slate-400">Targeted organic audience growth from selected countries per client demand</p>
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
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Icon name="ShoppingBag" className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ecommerce Support (Virtual Assistant)</h2>
              <p className="text-xs text-slate-400">Meticulous store operations across any platform with honest accountability</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ecomPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* Need a Custom Scope? */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white">Require a Tailored Specification?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            If your project involves specialized custom APIs, multi-platform migrations, or enterprise store requirements, reach out directly. We formulate a customized proposal with exact milestone pricing.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inquiry?service=custom"
              className="spatial-btn-primary rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Request Custom Quote
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spatial-btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
            >
              <Icon name="MessageSquare" className="h-4 w-4 text-emerald-400" />
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
      glowColor={plan.isPopular ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)'}
      className={`spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 ${
        plan.isPopular
          ? 'border-cyan-500/50 shadow-glow-cyan ring-1 ring-cyan-400/30'
          : ''
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
          {plan.badge}
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">{plan.description}</p>

        <div className="mt-6 flex items-baseline gap-2 border-b border-white/10 pb-6">
          <span className="text-4xl font-extrabold text-white">{plan.price}</span>
          <span className="text-xs text-slate-400">/ {plan.billingPeriod}</span>
        </div>

        <ul className="mt-6 space-y-3 text-xs text-slate-300">
          {plan.features.map((feat: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Icon name="Check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
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
