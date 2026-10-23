import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | MS Enterprise',
  description:
    'Explore custom website development, Meta growth services, and ecommerce virtual assistant store operations by MS Enterprise.',
};

export default function ServicesIndexPage() {
  const services = getServices();

  return (
    <div className="relative py-16 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:text-[#E5B238]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Core Capabilities</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl dark:text-white">
            Our Services
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
            High-speed engineering, organic social expansion, and diligent ecommerce store operations tailored to your business goals.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="partner-card flex h-full flex-col justify-between rounded-3xl p-8 bg-white border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
                    <Icon name={srv.iconName} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#FBFBFA] border border-[#E5E7EB] px-3 py-1 text-xs font-bold text-[#121316] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-white">
                    {srv.badge}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#121316] dark:text-white">
                  {srv.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                  {srv.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[#E5E7EB] pt-6 text-xs text-[#2B2D33] dark:border-[#2A2D34] dark:text-[#E5E7EB]">
                  {srv.highlights.slice(0, 4).map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={`/services/${srv.slug}`}
                  className="spatial-btn-primary block w-full py-3 text-center text-xs font-bold uppercase tracking-wider"
                >
                  Explore {srv.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
