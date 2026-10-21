'use client';

import React, { useEffect, useState } from 'react';
import { ServiceItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateNew = () => {
    setEditingService({
      title: '',
      slug: '',
      category: 'web',
      badge: 'Core Service',
      iconName: 'Code2',
      summary: '',
      description: '',
      highlights: ['Lifetime live support', 'Low monthly maintenance'],
      published: true,
      showInNav: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;
    setSaveLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service.');

      setMessage({ type: 'success', text: 'Service saved successfully.' });
      setEditingService(null);
      fetchServices();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving service.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the service "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service.');
      fetchServices();
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
            Services Management
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Add, update, or remove services. Published services appear in public navigation and dedicated service URLs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Add New Service</span>
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

      {/* Editing Form Modal / Section */}
      {editingService && (
        <div className="spatial-card rounded-2xl p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingService.id ? 'Edit Service' : 'Create New Service'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Custom Web Development"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  URL Slug (Auto-generated if empty)
                </label>
                <input
                  type="text"
                  value={editingService.slug || ''}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  placeholder="e.g. custom-web-development"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Category
                </label>
                <select
                  value={editingService.category || 'web'}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="web">Web Development</option>
                  <option value="meta">Meta Services</option>
                  <option value="ecommerce">Ecommerce VA Support</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={editingService.badge || ''}
                  onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                  placeholder="e.g. Core Engineering"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Icon (Lucide Icon Name)
                </label>
                <input
                  type="text"
                  value={editingService.iconName || 'Code2'}
                  onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                  placeholder="e.g. Code2, Share2, ShoppingBag"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.published ?? true}
                    onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Published (Live)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.showInNav ?? true}
                    onChange={(e) => setEditingService({ ...editingService, showInNav: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Show in Navbar Menu</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Short Summary (Card preview)
              </label>
              <textarea
                rows={2}
                value={editingService.summary || ''}
                onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                placeholder="Brief summary..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Full Description (Detailed service page content)
              </label>
              <textarea
                rows={4}
                value={editingService.description || ''}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                placeholder="Full description..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Bullet Highlights (One per line)
              </label>
              <textarea
                rows={3}
                value={(editingService.highlights || []).join('\n')}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    highlights: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                  })
                }
                placeholder="One highlight per line..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="spatial-btn-primary rounded-xl px-5 py-2 text-xs font-semibold"
              >
                {saveLoading ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">Service</th>
                  <th className="py-3.5 font-medium">Category</th>
                  <th className="py-3.5 font-medium">Slug</th>
                  <th className="py-3.5 font-medium">Status</th>
                  <th className="py-3.5 font-medium">Navbar</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                          <Icon name={srv.iconName} className="h-4 w-4" />
                        </div>
                        <div>
                          <span>{srv.title}</span>
                          <span className="block text-[11px] font-normal text-slate-400">{srv.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 capitalize text-slate-300">{srv.category}</td>
                    <td className="py-4 font-mono text-cyan-300">/services/{srv.slug}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          srv.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {srv.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block text-[11px] ${
                          srv.showInNav ? 'text-cyan-400 font-medium' : 'text-slate-500'
                        }`}
                      >
                        {srv.showInNav ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingService(srv)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                          title="Edit Service"
                        >
                          <Icon name="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(srv.id, srv.title)}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                          title="Delete Service"
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
