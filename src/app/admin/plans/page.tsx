'use client';

import React, { useEffect, useState } from 'react';
import { PlanItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<Partial<PlanItem> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/admin/plans');
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreateNew = () => {
    setEditingPlan({
      name: '',
      serviceCategory: 'web',
      serviceTitle: 'Custom Website Development',
      price: '$450',
      billingPeriod: 'one-time',
      description: '',
      badge: '',
      isPopular: false,
      features: ['Lifetime live support', 'Low monthly maintenance'],
      ctaText: 'Select Plan',
      ctaLink: '/inquiry',
      published: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan?.name || !editingPlan?.price) return;
    setSaveLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlan),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save plan.');

      setMessage({ type: 'success', text: 'Plan saved successfully.' });
      setEditingPlan(null);
      fetchPlans();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving plan.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the plan "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/plans?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete plan.');
      fetchPlans();
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
            Plans & Pricing Management
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Control service packages, pricing tags, and features displayed on public plan tables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Add New Plan</span>
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

      {/* Editing Form */}
      {editingPlan && (
        <div className="spatial-card rounded-2xl p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingPlan.id ? 'Edit Plan' : 'Create New Plan'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingPlan.name || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  placeholder="e.g. Essential Web Platform"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Service Category *
                </label>
                <select
                  value={editingPlan.serviceCategory || 'web'}
                  onChange={(e) => {
                    const cat = e.target.value as any;
                    let title = 'Custom Website Development';
                    if (cat === 'meta') title = 'Meta (Facebook) Services';
                    if (cat === 'ecommerce') title = 'Ecommerce Support (VA Services)';
                    setEditingPlan({
                      ...editingPlan,
                      serviceCategory: cat,
                      serviceTitle: title,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="web">Custom Web Development</option>
                  <option value="meta">Meta (Facebook) Services</option>
                  <option value="ecommerce">Ecommerce Support (VA Services)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Display Price *
                </label>
                <input
                  type="text"
                  required
                  value={editingPlan.price || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                  placeholder="e.g. $450 or $190/mo"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-semibold text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Billing Period
                </label>
                <input
                  type="text"
                  value={editingPlan.billingPeriod || 'one-time'}
                  onChange={(e) => setEditingPlan({ ...editingPlan, billingPeriod: e.target.value })}
                  placeholder="e.g. one-time or per month"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Badge Label (e.g. Most Popular)
                </label>
                <input
                  type="text"
                  value={editingPlan.badge || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                  placeholder="e.g. Most Popular"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Button CTA Link
                </label>
                <input
                  type="text"
                  value={editingPlan.ctaLink || '/inquiry'}
                  onChange={(e) => setEditingPlan({ ...editingPlan, ctaLink: e.target.value })}
                  placeholder="/inquiry?service=..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-6 sm:col-span-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.isPopular ?? false}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Highlight as Popular (Cyan Border)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.published ?? true}
                    onChange={(e) => setEditingPlan({ ...editingPlan, published: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Published</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Plan Description
              </label>
              <textarea
                rows={2}
                value={editingPlan.description || ''}
                onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                placeholder="Brief plan description..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Plan Features List (One per line)
              </label>
              <textarea
                rows={4}
                value={(editingPlan.features || []).join('\n')}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    features: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                  })
                }
                placeholder="One feature per line..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="spatial-btn-primary rounded-xl px-5 py-2 text-xs font-semibold"
              >
                {saveLoading ? 'Saving...' : 'Save Plan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans List Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading plans...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">Plan Name</th>
                  <th className="py-3.5 font-medium">Service</th>
                  <th className="py-3.5 font-medium">Price</th>
                  <th className="py-3.5 font-medium">Period</th>
                  <th className="py-3.5 font-medium">Status</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-semibold text-white">
                      <div>{plan.name}</div>
                      {plan.badge && <span className="text-[10px] text-cyan-400 font-normal">{plan.badge}</span>}
                    </td>
                    <td className="py-4 text-slate-300">{plan.serviceTitle}</td>
                    <td className="py-4 font-bold text-white">{plan.price}</td>
                    <td className="py-4 text-slate-400">{plan.billingPeriod}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          plan.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {plan.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPlan(plan)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                          title="Edit Plan"
                        >
                          <Icon name="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(plan.id, plan.name)}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                          title="Delete Plan"
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
