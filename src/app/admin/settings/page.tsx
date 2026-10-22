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
      // Ensure themeConfig exists
      if (!data.themeConfig) {
        data.themeConfig = {
          defaultTheme: 'light',
          accentColor: '#0284C7',
          glassIntensity: 'default',
        };
      }
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
      setMessage({ type: 'success', text: 'Site settings and theme configuration saved.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Icon name="RefreshCw" className="h-6 w-6 animate-spin text-sky-600 dark:text-cyan-400" />
      </div>
    );
  }

  const themeConfig = settings.themeConfig || {
    defaultTheme: 'light',
    accentColor: '#0284C7',
    glassIntensity: 'default',
  };

  const updateThemeConfig = (field: string, val: any) => {
    setSettings({
      ...settings,
      themeConfig: {
        ...themeConfig,
        [field]: val,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Site Settings & Contact Configuration
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Control brand identity, official contact channels, Apple Liquid Glass theme preferences, and SEO defaults.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold shadow-sm"
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
          className={`flex items-center gap-2 rounded-2xl p-4 text-xs ${
            message.type === 'success'
              ? 'border border-emerald-500/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300'
              : 'border border-red-500/30 bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-300'
          }`}
        >
          <Icon name={message.type === 'success' ? 'CheckCircle2' : 'AlertCircle'} className="h-4 w-4" />
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Apple Liquid Glass Theme Configuration */}
        <div className="spatial-card rounded-3xl p-6 sm:p-8 shadow-liquid-card dark:shadow-spatial-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase text-sky-700 dark:text-cyan-400">
                Apple Liquid Glass & Spatial Theme Configuration
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Customize the default visitor experience, brand accent color, and glass refraction level site-wide.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-400">
              <Icon name="Sliders" className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Default Theme */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Default Visitor Theme
              </label>
              <select
                value={themeConfig.defaultTheme}
                onChange={(e) => updateThemeConfig('defaultTheme', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option value="light">Light (White Liquid Glass - Recommended)</option>
                <option value="dark">Dark (Obsidian Glass)</option>
                <option value="system">System (Matches Visitor OS)</option>
              </select>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Brand Accent Color
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="color"
                  value={themeConfig.accentColor}
                  onChange={(e) => updateThemeConfig('accentColor', e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-xl border border-slate-300/80 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={themeConfig.accentColor}
                  onChange={(e) => updateThemeConfig('accentColor', e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="mt-2 flex gap-1.5">
                {[
                  { name: 'Sky', hex: '#0284C7' },
                  { name: 'Cobalt', hex: '#1D4ED8' },
                  { name: 'Teal', hex: '#0D9488' },
                  { name: 'Slate', hex: '#334155' },
                ].map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => updateThemeConfig('accentColor', preset.hex)}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs"
                    style={{ backgroundColor: preset.hex }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Intensity */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Glass Blur & Intensity
              </label>
              <select
                value={themeConfig.glassIntensity}
                onChange={(e) => updateThemeConfig('glassIntensity', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                <option value="subtle">Subtle (18px blur, light tint)</option>
                <option value="default">Default (24px blur, balanced refraction)</option>
                <option value="strong">Strong (30px blur, deep diffusion)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company Identity */}
        <div className="spatial-card rounded-3xl p-6 sm:p-8 shadow-liquid-card dark:shadow-spatial-card">
          <h2 className="text-sm font-semibold uppercase text-sky-700 dark:text-cyan-400">Company Identity & Branding</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Logo Text</label>
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Tagline / Mission</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Company Description</label>
              <textarea
                rows={2}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 p-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Direct Contact Channels */}
        <div className="spatial-card rounded-3xl p-6 sm:p-8 shadow-liquid-card dark:shadow-spatial-card">
          <h2 className="text-sm font-semibold uppercase text-sky-700 dark:text-cyan-400">Direct Contact Information</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Official Phone Number (Clickable tel:)
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Official Email Address (Clickable mailto:)
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Office Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.floatingWhatsappEnabled}
                  onChange={(e) => setSettings({ ...settings, floatingWhatsappEnabled: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 bg-white text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Enable Floating WhatsApp Live Chat Button
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="spatial-card rounded-3xl p-6 sm:p-8 shadow-liquid-card dark:shadow-spatial-card">
          <h2 className="text-sm font-semibold uppercase text-sky-700 dark:text-cyan-400">Social Media Handles</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Facebook Page URL</label>
              <input
                type="text"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Twitter / X URL</label>
              <input
                type="text"
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">LinkedIn Company URL</label>
              <input
                type="text"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Instagram Handle URL</label>
              <input
                type="text"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="spatial-card rounded-3xl p-6 sm:p-8 shadow-liquid-card dark:shadow-spatial-card">
          <h2 className="text-sm font-semibold uppercase text-sky-700 dark:text-cyan-400">Global SEO Defaults</h2>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Default Title Tag</label>
              <input
                type="text"
                value={settings.seoDefaults.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, title: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.seoDefaults.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, description: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 p-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="spatial-btn-primary rounded-full px-6 py-3 text-xs font-semibold shadow-sm"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
