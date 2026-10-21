'use client';

import React, { useEffect, useState } from 'react';
import { MediaItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');

      setMessage({ type: 'success', text: `Uploaded ${file.name} successfully.` });
      fetchMedia();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'File upload failed.' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Media Library
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Upload images, logos, and graphics for usage across services, case studies, and content.
          </p>
        </div>

        <div>
          <label className="spatial-btn-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold">
            <Icon name="Upload" className="h-4 w-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
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

      {/* Media Grid */}
      <div className="spatial-card rounded-2xl p-6 sm:p-8">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading media...</div>
        ) : media.length === 0 ? (
          <div className="py-16 text-center">
            <Icon name="Image" className="mx-auto h-12 w-12 text-slate-600" />
            <p className="mt-3 text-sm font-semibold text-white">No media files uploaded yet</p>
            <p className="mt-1 text-xs text-slate-400">
              Upload company logos, client project screenshots, or service diagrams.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-2 transition-all hover:border-cyan-500/30"
              >
                <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-950">
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="mt-2 space-y-1">
                  <p className="truncate text-[11px] font-medium text-white" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.id, item.url)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/5 py-1.5 text-[10px] font-semibold text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                  >
                    <Icon name="Check" className="h-3 w-3" />
                    <span>{copiedId === item.id ? 'Copied URL!' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
