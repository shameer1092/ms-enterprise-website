'use client';

import React, { useEffect, useState } from 'react';
import { SiteContent } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'why' | 'about' | 'footer'>('hero');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error('Failed to save content.');
      setMessage({ type: 'success', text: 'Front-end content saved successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating content.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
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
            Front-End Content Editor
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Edit text, headings, value propositions, and promises without modifying source code.
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
              <span>Save All Changes</span>
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

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2">
        {[
          { id: 'hero', label: 'Homepage Hero' },
          { id: 'why', label: 'Why Choose Us' },
          { id: 'about', label: 'About & Principles' },
          { id: 'footer', label: 'Footer & Policies' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="spatial-card rounded-2xl p-6 sm:p-8">
        {/* Tab 1: Hero */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase text-cyan-400">Hero Section Configuration</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Headline Line 1
                </label>
                <input
                  type="text"
                  value={content.hero.titleLine1}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, titleLine1: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Headline Highlight (Gradient text)
                </label>
                <input
                  type="text"
                  value={content.hero.titleHighlight}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, titleHighlight: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={content.hero.primaryCtaText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, primaryCtaText: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Hero Subtitle (Instant Clarity Statement)
              </label>
              <textarea
                rows={3}
                value={content.hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Trust Pills (One per line)
              </label>
              <textarea
                rows={4}
                value={content.hero.trustPills.join('\n')}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      trustPills: e.target.value.split('\n').filter(Boolean),
                    },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white font-mono text-xs"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Why Choose Us */}
        {activeTab === 'why' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase text-cyan-400">Why Choose Us Pillars</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.whyChooseUs.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyChooseUs: { ...content.whyChooseUs, heading: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Section Subheading
                </label>
                <input
                  type="text"
                  value={content.whyChooseUs.subheading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      whyChooseUs: { ...content.whyChooseUs, subheading: e.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-semibold uppercase text-slate-400">Pillars</h3>
              {content.whyChooseUs.pillars.map((pillar, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] text-slate-400">Pillar #{idx + 1} Title</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => {
                          const updated = [...content.whyChooseUs.pillars];
                          updated[idx].title = e.target.value;
                          setContent({
                            ...content,
                            whyChooseUs: { ...content.whyChooseUs, pillars: updated },
                          });
                        }}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400">Icon Name</label>
                      <input
                        type="text"
                        value={pillar.icon}
                        onChange={(e) => {
                          const updated = [...content.whyChooseUs.pillars];
                          updated[idx].icon = e.target.value;
                          setContent({
                            ...content,
                            whyChooseUs: { ...content.whyChooseUs, pillars: updated },
                          });
                        }}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs font-mono text-cyan-300"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-[11px] text-slate-400">Pillar Description</label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => {
                        const updated = [...content.whyChooseUs.pillars];
                        updated[idx].description = e.target.value;
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, pillars: updated },
                        });
                      }}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: About Page & Accountability */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase text-cyan-400">About Page & Guarantees</h2>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                About Heading
              </label>
              <input
                type="text"
                value={content.aboutSection.heading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    aboutSection: { ...content.aboutSection, heading: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Company Mission
              </label>
              <textarea
                rows={3}
                value={content.aboutSection.mission}
                onChange={(e) =>
                  setContent({
                    ...content,
                    aboutSection: { ...content.aboutSection, mission: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Working Approach (How We Execute)
              </label>
              <textarea
                rows={4}
                value={content.aboutSection.approach}
                onChange={(e) =>
                  setContent({
                    ...content,
                    aboutSection: { ...content.aboutSection, approach: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Authentic Accountability Promise (Emergency & Delay Compensation Policy)
              </label>
              <textarea
                rows={3}
                value={content.aboutSection.honestPromise}
                onChange={(e) =>
                  setContent({
                    ...content,
                    aboutSection: { ...content.aboutSection, honestPromise: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-sm text-emerald-200"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Footer */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase text-cyan-400">Footer Text</h2>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Footer Brand Summary
              </label>
              <textarea
                rows={3}
                value={content.footer.aboutText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, aboutText: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Copyright Text (Year updates automatically)
              </label>
              <input
                type="text"
                value={content.footer.copyrightText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, copyrightText: e.target.value },
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end border-t border-white/10 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="spatial-btn-primary rounded-xl px-6 py-2.5 text-xs font-semibold"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
