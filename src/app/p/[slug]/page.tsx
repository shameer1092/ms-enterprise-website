import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPageBySlug, getPages } from '@/lib/db';
import { Icon } from '@/components/common/Icon';

interface CustomPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pages = getPages(true);
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const page = getPageBySlug(params.slug);
  if (!page) return { title: 'Page Not Found' };

  return {
    title: `${page.metaTitle || page.title} | MS Enterprise`,
    description: page.metaDescription || page.summary,
  };
}

export default function CustomDynamicPage({ params }: CustomPageProps) {
  const page = getPageBySlug(params.slug);
  if (!page || !page.published) {
    notFound();
  }

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-cyan-400">
            Home
          </Link>
          <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sky-700 dark:text-cyan-400 font-semibold">{page.title}</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {page.title}
        </h1>

        {page.summary && (
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            {page.summary}
          </p>
        )}

        <div className="spatial-card mt-10 rounded-3xl p-8 sm:p-12 shadow-liquid-card dark:shadow-spatial-card">
          <div className="space-y-6 text-sm leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">
            {page.content}
          </div>

          {page.sections && page.sections.length > 0 && (
            <div className="mt-10 space-y-8 border-t border-slate-200/60 pt-8 dark:border-white/10">
              {page.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{sec.heading}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
