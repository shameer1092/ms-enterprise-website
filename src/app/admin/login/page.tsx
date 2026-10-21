'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@12345');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
          twoFactorCode: twoFactorCode.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requires2FA) {
          setRequires2FA(true);
        }
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Administrative Portal
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Sign in with verified credentials to manage website content and inquiries.
          </p>
        </div>

        <div className="spatial-card mt-8 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <Icon name="AlertCircle" className="h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Username
              </label>
              <div className="relative mt-2">
                <Icon
                  name="User"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative mt-2">
                <Icon
                  name="Lock"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            {requires2FA && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Two-Factor Security Code
                </label>
                <input
                  type="text"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 2FA security code"
                  className="mt-2 w-full rounded-xl border border-cyan-500/50 bg-slate-900 px-4 py-2.5 text-sm font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="spatial-btn-primary mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Icon name="RefreshCw" className="h-4 w-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <p className="text-[11px] text-slate-500">
              Default development credentials: <span className="text-slate-300 font-mono">admin</span> / <span className="text-slate-300 font-mono">Admin@12345</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
