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
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>
          <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-600" />
          <span className="text-cyan-400">{page.title}</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {page.title}
        </h1>

        {page.summary && (
          <p className="mt-4 text-base text-slate-300">
            {page.summary}
          </p>
        )}

        <div className="spatial-card mt-10 rounded-2xl p-8 sm:p-12">
          <div className="space-y-6 text-sm leading-relaxed text-slate-300 whitespace-pre-line">
            {page.content}
          </div>

          {page.sections && page.sections.length > 0 && (
            <div className="mt-10 space-y-8 border-t border-white/10 pt-8">
              {page.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="text-xl font-bold text-white">{sec.heading}</h2>
                  <p className="mt-2 text-sm text-slate-300">{sec.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
