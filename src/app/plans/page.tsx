import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPlans, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { Check, MessageSquare, ArrowRight, Code2, Share2, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Plans & Transparent Pricing | MS Enterprise',
  description:
    'Review transparent pricing and service plans for custom web development, Meta organic growth, and ecommerce VA operations.',
};

export default function PlansPage() {
  const plans = getPlans();
  const settings = getSettings();
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  const webPlans = plans.filter((p) => p.serviceCategory === 'web');
  const metaPlans = plans.filter((p) => p.serviceCategory === 'meta');
  const ecomPlans = plans.filter((p) => p.serviceCategory === 'ecommerce');

  return (
    <div className="relative py-16 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:text-[#E5B238]">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span>Transparent Pricing • Zero Hidden Markups</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl dark:text-white">
            Service Plans & Pricing
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
            Clear, honest pricing for custom software, targeted organic social growth, and dedicated store operations.
          </p>
        </div>

        {/* 1. Web Development Plans */}
        <div className="mt-16">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4 dark:border-[#2A2D34]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#121316] dark:text-white">
                Custom Website Development
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Lifetime live support, bespoke Next.js code, and low monthly maintenance
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {webPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* 2. Meta (Facebook) Plans */}
        <div className="mt-16">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4 dark:border-[#2A2D34]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#121316] dark:text-white">
                Meta (Facebook) Growth Services
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Targeted organic audience growth from selected countries per client demand
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {metaPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* 3. Ecommerce VA Plans */}
        <div className="mt-16">
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4 dark:border-[#2A2D34]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#121316] dark:text-white">
                Ecommerce Support (Virtual Assistant)
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Meticulous store operations across any platform with honest accountability
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ecomPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>

        {/* Need a Custom Scope? */}
        <div className="partner-card mt-24 rounded-3xl bg-white p-8 text-center sm:p-12 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
          <h2 className="text-2xl font-bold text-[#121316] dark:text-white">
            Require a Tailored Specification?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            If your project involves specialized custom APIs, multi-platform migrations, or enterprise store requirements, reach out directly. We formulate a customized proposal with exact milestone pricing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inquiry?service=custom"
              className="spatial-btn-primary inline-flex items-center gap-2"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spatial-btn-secondary inline-flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
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
    <div
      className={`partner-card relative flex h-full flex-col justify-between rounded-3xl p-8 pt-9 bg-white border ${
        plan.isPopular
          ? 'border-2 border-[#121316] shadow-partner-card dark:border-[#D4AF37]'
          : 'border-[#E5E7EB] dark:border-[#2A2D34]'
      } dark:bg-[#1E2024]`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 right-6 z-20 rounded-full bg-[#D4AF37] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#121316] shadow-sm">
          {plan.badge}
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="min-h-[56px]">
          <h3 className="text-xl font-bold text-[#121316] dark:text-white">{plan.name}</h3>
        </div>
        <p className="mt-1 min-h-[44px] text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
          {plan.description}
        </p>

        <div className="mt-6 flex items-baseline gap-2 border-b border-[#E5E7EB] pb-6 dark:border-[#2A2D34]">
          <span className="text-4xl font-extrabold text-[#121316] dark:text-white">{plan.price}</span>
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">/ {plan.billingPeriod}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3 text-xs text-[#2B2D33] dark:text-[#E5E7EB]">
          {plan.features.map((feat: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4">
        <Link
          href={plan.ctaLink}
          className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider ${
            plan.isPopular ? 'spatial-btn-primary' : 'spatial-btn-secondary'
          }`}
        >
          {plan.ctaText}
        </Link>
      </div>
    </div>
  );
}
