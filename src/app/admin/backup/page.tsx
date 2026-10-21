'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';

export default function AdminBackupPage() {
  const [backups, setBackups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchBackups = async () => {
    try {
      const res = await fetch('/api/admin/backups');
      const data = await res.json();
      setBackups(data.backups || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Backup creation failed.');

      setMessage({ type: 'success', text: `Backup created successfully: ${data.filename}` });
      fetchBackups();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error creating backup.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm(`Warning: Restoring "${file.name}" will overwrite the active database. A safety backup will be created automatically before restoring. Continue?`)) {
      e.target.value = '';
      return;
    }

    setActionLoading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const res = await fetch('/api/admin/backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore', data: parsed }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed.');

      setMessage({ type: 'success', text: 'Database restored successfully! All services, content, and pages updated.' });
      fetchBackups();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Invalid backup JSON file.' });
    } finally {
      setActionLoading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Backup & Database Recovery
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Create full-system snapshots, download JSON database archives, or restore past backups safely.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="spatial-btn-secondary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold">
            <Icon name="Upload" className="h-4 w-4" />
            <span>Restore from File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFile}
              disabled={actionLoading}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleCreateBackup}
            disabled={actionLoading}
            className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            <Icon name="Database" className="h-4 w-4" />
            <span>{actionLoading ? 'Processing...' : 'Create Backup Now'}</span>
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

      {/* Safety info card */}
      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 text-xs text-slate-300">
        <h2 className="font-bold text-white text-sm flex items-center gap-2">
          <Icon name="ShieldCheck" className="h-4 w-4 text-cyan-400" />
          Safety Rotation Guarantee
        </h2>
        <p className="mt-2 text-slate-400 leading-relaxed">
          Before any restore action is executed, the system automatically takes an immutable safety snapshot of your current database. You can download and store backups externally at any time.
        </p>
      </div>

      {/* Available Backups Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-sm font-bold text-white">Archived Database Backups</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading backups...</div>
        ) : backups.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No manual backup archives created yet. Click &quot;Create Backup Now&quot; to generate a snapshot.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">Backup Filename</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {backups.map((filename) => (
                  <tr key={filename} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-mono text-cyan-300">{filename}</td>
                    <td className="py-4 pr-6 text-right">
                      <a
                        href={`/api/admin/backups?download=${encodeURIComponent(filename)}`}
                        download={filename}
                        className="spatial-btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-white"
                      >
                        <Icon name="Download" className="h-3.5 w-3.5" />
                        <span>Download JSON</span>
                      </a>
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
