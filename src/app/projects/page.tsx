import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export const metadata: Metadata = {
  title: 'Client Projects & Case Studies',
  description: 'Review custom web applications, ecommerce stores, and Meta audience campaigns executed by MS Enterprise.',
};

export default function ProjectsIndexPage() {
  const projects = getProjects();

  return (
    <div className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
            <Icon name="Layers" className="h-3.5 w-3.5" />
            <span>Portfolio & Work</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Selected Projects
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Real software builds, store management pipelines, and organic audience campaigns.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((proj) => (
            <TiltCard
              key={proj.id}
              maxTilt={6}
              className="spatial-card flex h-full flex-col justify-between rounded-3xl p-8 shadow-liquid-card dark:shadow-spatial-card"
            >
              <div>
                <span className="rounded-full bg-sky-100 border border-sky-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:bg-cyan-500/15 dark:border-cyan-500/30 dark:text-cyan-300">
                  {proj.serviceCategory}
                </span>

                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{proj.title}</h2>
                {proj.client && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Client: {proj.client}</p>
                )}

                <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {proj.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-200/60 pt-4 dark:border-white/10">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-1 text-[10px] font-mono text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="spatial-btn-primary block w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  View Project Details
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
