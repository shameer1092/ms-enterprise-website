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
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-glow-cyan">
            <Icon name="Compass" className="h-3.5 w-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-base text-slate-300">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25 shadow-glow-cyan">
                    <Icon name={srv.iconName} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    {srv.badge}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-white">{srv.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {srv.summary}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-xs text-slate-300">
                  {srv.highlights.slice(0, 4).map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
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
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
