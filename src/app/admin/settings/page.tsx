'use client';

import React, { useEffect, useState } from 'react';
import { SiteSettings } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to update settings.');
      setMessage({ type: 'success', text: 'Site settings and contact info saved.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Icon name="RefreshCw" className="h-6 w-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Site Settings & Contact Configuration
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Control brand identity, official phone/email channels, social handles, and SMTP inquiry notifications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold"
        >
          {saving ? (
            <>
              <Icon name="RefreshCw" className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Icon name="Check" className="h-4 w-4" />
              <span>Save Settings</span>
            </>
          )}
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* Company Identity */}
        <div className="spatial-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase text-cyan-400">Company Identity & Branding</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Logo Text</label>
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300">Tagline / Mission</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300">Company Description</label>
              <textarea
                rows={2}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Direct Contact Channels */}
        <div className="spatial-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase text-cyan-400">Direct Contact Information</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Official Phone Number (Clickable tel:)
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Official Email Address (Clickable mailto:)
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300">Office Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.floatingWhatsappEnabled}
                  onChange={(e) => setSettings({ ...settings, floatingWhatsappEnabled: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-xs font-medium text-slate-200">
                  Enable Floating WhatsApp Live Chat Button
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="spatial-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase text-cyan-400">Social Media Handles</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Facebook Page URL</label>
              <input
                type="text"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Twitter / X URL</label>
              <input
                type="text"
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">LinkedIn Company URL</label>
              <input
                type="text"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Instagram Handle URL</label>
              <input
                type="text"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="spatial-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase text-cyan-400">Global SEO Defaults</h2>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Default Title Tag</label>
              <input
                type="text"
                value={settings.seoDefaults.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, title: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.seoDefaults.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, description: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="spatial-btn-primary rounded-xl px-6 py-3 text-xs font-semibold"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
