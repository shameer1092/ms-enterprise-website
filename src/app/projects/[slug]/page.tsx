import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | MS Enterprise Projects`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project || !project.published) {
    notFound();
  }

  const settings = getSettings();

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-cyan-400">
            Home
          </Link>
          <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-400" />
          <Link href="/projects" className="hover:text-sky-700 dark:hover:text-cyan-400">
            Projects
          </Link>
          <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sky-700 dark:text-cyan-400 font-semibold">{project.title}</span>
        </div>

        {/* Header */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-500/25 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
              {project.serviceCategory} Project
            </span>
            {project.client && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
                Client: {project.client}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            {project.summary}
          </p>
        </div>

        {/* Grid Content */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="spatial-card rounded-3xl p-8 sm:p-10 shadow-liquid-card dark:shadow-spatial-card">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Scope and Implementation</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {project.description}
              </p>

              {/* Key Outcomes */}
              {project.keyOutcomes && project.keyOutcomes.length > 0 && (
                <div className="mt-8 border-t border-slate-200/60 pt-8 dark:border-white/10">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Operational Outcomes</h3>
                  <div className="mt-4 space-y-3">
                    {project.keyOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Tech Stack & Inquiry */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="spatial-card rounded-3xl p-7 shadow-liquid-card dark:shadow-spatial-card">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Technologies & Platforms
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-mono font-medium text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-200/60 pt-6 dark:border-white/10">
                  <Link
                    href={`/inquiry?project=${encodeURIComponent(project.title)}`}
                    className="spatial-btn-primary block w-full py-3 text-center text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Discuss Similar Project
                  </Link>

                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary mt-3 block w-full py-3 text-center text-xs font-semibold"
                  >
                    Quick Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
