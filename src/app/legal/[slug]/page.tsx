import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPageBySlug, getPages } from '@/lib/db';
import { Icon } from '@/components/common/Icon';

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pages = getPages(true);
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const page = getPageBySlug(params.slug);
  if (!page) return { title: 'Page Not Found' };

  return {
    title: `${page.metaTitle || page.title} | MS Enterprise`,
    description: page.metaDescription || page.summary,
  };
}

export default function LegalPage({ params }: LegalPageProps) {
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
          <span>Legal</span>
          <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sky-700 dark:text-cyan-400 font-semibold">{page.title}</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {page.title}
        </h1>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Last updated: {new Date(page.updatedAt || page.createdAt).toLocaleDateString()}
        </p>

        <div className="spatial-card mt-10 rounded-3xl p-8 sm:p-12 shadow-liquid-card dark:shadow-spatial-card">
          <div className="prose max-w-none text-slate-700 dark:text-slate-300">
            {page.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="mt-8 text-xl font-bold text-slate-900 first:mt-0 dark:text-white">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="mt-6 text-base font-semibold text-sky-700 dark:text-cyan-300">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={idx} className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
