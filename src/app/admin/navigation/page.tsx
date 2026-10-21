'use client';

import React, { useEffect, useState } from 'react';
import { NavItemConfig } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavItemConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchNavigation = async () => {
    try {
      const res = await fetch('/api/admin/navigation');
      const data = await res.json();
      setNavItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  const handleResync = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resync' }),
      });
      const data = await res.json();
      setNavItems(data.navigation);
      setMessage({
        type: 'success',
        text: 'Dynamic navigation tree successfully resynced with all published services, projects, and pages.',
      });
    } catch (err) {
      setMessage({ type: 'error', text: 'Resync failed.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: navItems }),
      });
      const data = await res.json();
      setNavItems(data.navigation);
      setMessage({ type: 'success', text: 'Navigation hierarchy saved.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Save failed.' });
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (idx: number) => {
    const updated = [...navItems];
    updated[idx].visible = !updated[idx].visible;
    setNavItems(updated);
  };

  const toggleChildVisibility = (parentIdx: number, childIdx: number) => {
    const updated = [...navItems];
    if (updated[parentIdx].children) {
      updated[parentIdx].children![childIdx].visible = !updated[parentIdx].children![childIdx].visible;
      setNavItems(updated);
    }
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...navItems];
    const temp = updated[idx - 1];
    updated[idx - 1] = updated[idx];
    updated[idx] = temp;
    // Update order
    updated.forEach((item, i) => (item.order = i + 1));
    setNavItems(updated);
  };

  const moveDown = (idx: number) => {
    if (idx === navItems.length - 1) return;
    const updated = [...navItems];
    const temp = updated[idx + 1];
    updated[idx + 1] = updated[idx];
    updated[idx] = temp;
    updated.forEach((item, i) => (item.order = i + 1));
    setNavItems(updated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Navigation Menu Builder
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Control the order, labels, and visibility of main navbar buttons and dropdown sub-items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResync}
            disabled={saving}
            className="spatial-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
            title="Automatically detect new services/projects and re-attach them to navigation"
          >
            <Icon name="RefreshCw" className="h-4 w-4" />
            <span>Resync Dynamic Items</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold"
          >
            <Icon name="Check" className="h-4 w-4" />
            <span>Save Order</span>
          </button>
        </div>
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

      {/* Nav Hierarchy List */}
      <div className="spatial-card rounded-2xl p-6 sm:p-8">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading navigation tree...</div>
        ) : (
          <div className="space-y-4">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-all"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-white/5 font-mono text-xs text-slate-400">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const updated = [...navItems];
                        updated[idx].label = e.target.value;
                        setNavItems(updated);
                      }}
                      className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <span className="font-mono text-xs text-slate-400">{item.href}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Visibility */}
                    <button
                      type="button"
                      onClick={() => toggleVisibility(idx)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        item.visible
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {item.visible ? 'Visible' : 'Hidden'}
                    </button>

                    {/* Move Up / Down */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveUp(idx)}
                      className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      <Icon name="ChevronDown" className="h-4 w-4 rotate-180" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === navItems.length - 1}
                      onClick={() => moveDown(idx)}
                      className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      <Icon name="ChevronDown" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-items list if any */}
                {item.children && item.children.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-white/5 pl-8 pt-3">
                    <span className="text-[10px] font-semibold uppercase text-slate-500">
                      Dropdown Sub-Items:
                    </span>
                    {item.children.map((child, cIdx) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="ChevronRight" className="h-3 w-3 text-cyan-400" />
                          <span className="text-xs text-slate-200">{child.label}</span>
                          <span className="font-mono text-[11px] text-slate-500">{child.href}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleChildVisibility(idx, cIdx)}
                          className={`rounded px-2 py-0.5 text-[10px] ${
                            child.visible
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {child.visible ? 'Show' : 'Hide'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
