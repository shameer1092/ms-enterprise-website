import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export const metadata: Metadata = {
  title: 'Company Services',
  description: 'Explore custom website development, Meta growth services, and ecommerce virtual assistant store operations by MS Enterprise.',
};

export default function ServicesIndexPage() {
  const services = getServices();

  return (
    <div className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
            <Icon name="Compass" className="h-3.5 w-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Our Services
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Precision engineering, organic social expansion, and diligent ecommerce store operations tailored to your business goals.
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-500/20 shadow-sm dark:bg-cyan-500/15 dark:text-cyan-400 dark:ring-cyan-500/25">
                    <Icon name={srv.iconName} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-100/80 border border-slate-200/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300">
                    {srv.badge}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{srv.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {srv.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-slate-200/60 pt-6 text-xs text-slate-700 dark:border-white/10 dark:text-slate-300">
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
                  className="spatial-btn-primary block w-full py-3 text-center text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Explore {srv.title}
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
