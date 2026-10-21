'use client';

import React, { useEffect, useState } from 'react';
import { CustomPageItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<CustomPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Partial<CustomPageItem> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreateNew = () => {
    setEditingPage({
      title: '',
      slug: '',
      navLabel: '',
      summary: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      showInNav: true,
      published: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title) return;
    setSaveLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save page.');

      setMessage({ type: 'success', text: 'Page and SEO metadata updated successfully.' });
      setEditingPage(null);
      fetchPages();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving page.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/pages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete page.');
      fetchPages();
    } catch (err: any) {
      alert(err.message || 'Delete error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Custom Pages & Legal Content
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Create or edit dynamic pages, legal policies, and adjust SEO tags per page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-xl p-4 text-xs ${
            message.type === 'success'
              ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          <Icon name={message.type === 'success' ? 'CheckCircle2' : 'AlertCircle'} className="h-4 w-4" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Editing Modal / Section */}
      {editingPage && (
        <div className="spatial-card rounded-2xl p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingPage.id ? 'Edit Page' : 'Create New Page'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingPage(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPage.title || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  placeholder="e.g. Terms of Service"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editingPage.slug || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                  placeholder="e.g. terms-of-service"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Navigation Menu Label
                </label>
                <input
                  type="text"
                  value={editingPage.navLabel || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, navLabel: e.target.value })}
                  placeholder="e.g. Terms"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPage.published ?? true}
                    onChange={(e) => setEditingPage({ ...editingPage, published: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Published</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPage.showInNav ?? false}
                    onChange={(e) => setEditingPage({ ...editingPage, showInNav: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Show in Navbar Menu</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Summary / Intro
              </label>
              <textarea
                rows={2}
                value={editingPage.summary || ''}
                onChange={(e) => setEditingPage({ ...editingPage, summary: e.target.value })}
                placeholder="Brief summary..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Page Content (Markdown / Text)
              </label>
              <textarea
                rows={6}
                value={editingPage.content || ''}
                onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                placeholder="Content..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono text-xs"
              />
            </div>

            {/* SEO Fields Section */}
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
              <h3 className="text-xs font-semibold uppercase text-cyan-400">SEO Configuration</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] text-slate-400">SEO Meta Title</label>
                  <input
                    type="text"
                    value={editingPage.metaTitle || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                    placeholder="Page Title | MS Enterprise"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400">SEO Meta Description</label>
                  <input
                    type="text"
                    value={editingPage.metaDescription || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                    placeholder="Meta description for search engines..."
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="spatial-btn-primary rounded-xl px-5 py-2 text-xs font-semibold"
              >
                {saveLoading ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pages Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading pages...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">Page Title</th>
                  <th className="py-3.5 font-medium">Slug</th>
                  <th className="py-3.5 font-medium">Navbar</th>
                  <th className="py-3.5 font-medium">Status</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-semibold text-white">
                      <div>{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{p.summary?.slice(0, 50)}...</div>
                    </td>
                    <td className="py-4 font-mono text-cyan-300">/p/{p.slug}</td>
                    <td className="py-4">
                      <span className={`inline-block text-[11px] ${p.showInNav ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                        {p.showInNav ? 'Active' : 'Off'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          p.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPage(p)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                          title="Edit Page"
                        >
                          <Icon name="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.title)}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                          title="Delete Page"
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
