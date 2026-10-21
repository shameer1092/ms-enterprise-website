import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getContent, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export const metadata: Metadata = {
  title: 'About Our Company & Values',
  description: 'Learn about MS Enterprise, our mission, working approach, and our authentic commitment to client satisfaction.',
};

export default function AboutPage() {
  const content = getContent();
  const settings = getSettings();
  const about = content.aboutSection;

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <span>Genuine Engineering & Operations</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {about.heading}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {about.subheading}
          </p>
        </div>

        {/* Mission & Approach Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <TiltCard maxTilt={5} className="spatial-card rounded-3xl p-8 sm:p-10 shadow-spatial-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30 shadow-glow-cyan">
              <Icon name="Compass" className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">Our Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {about.mission}
            </p>
          </TiltCard>

          {/* Working Approach Card */}
          <TiltCard maxTilt={5} className="spatial-card rounded-3xl p-8 sm:p-10 shadow-spatial-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/30">
              <Icon name="Cpu" className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">Working Approach</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {about.approach}
            </p>
          </TiltCard>
        </div>

        {/* Accountability & Authentic Guarantee Section */}
        <TiltCard
          maxTilt={4}
          glowColor="rgba(16, 185, 129, 0.2)"
          className="spatial-card mt-12 rounded-4xl p-8 sm:p-12 border border-emerald-500/30 shadow-spatial-elevated"
        >
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                <Icon name="ShieldCheck" className="h-3.5 w-3.5" />
                <span>Our Unconditional Accountability Promise</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Honest Commitments, Fulfilled
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {about.honestPromise}
              </p>
            </div>
            <Link
              href="/inquiry"
              className="spatial-btn-primary shrink-0 px-6 py-3.5 text-xs font-bold uppercase tracking-wider"
            >
              Start a Conversation
            </Link>
          </div>
        </TiltCard>

        {/* Values Grid */}
        <div className="mt-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Core Principles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white">The Values That Guide Our Work</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {about.values.map((val, idx) => (
              <TiltCard key={idx} maxTilt={6} className="spatial-card rounded-3xl p-7 shadow-spatial-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25">
                  <Icon name="CheckCircle2" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{val.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                  {val.description}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-20 border-t border-white/10 pt-12 text-center">
          <p className="text-sm text-slate-400">
            Have questions about our team or wanting to review our development roadmap?
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <Icon name="Mail" className="h-4 w-4" />
              <span>{settings.email}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <Icon name="Phone" className="h-4 w-4" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
