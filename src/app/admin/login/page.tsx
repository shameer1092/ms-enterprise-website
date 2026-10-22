'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center px-4 py-16">
      <div className="absolute top-6 right-6">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Administrative Portal
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Sign in with verified credentials to manage website content and inquiries.
          </p>
        </div>

        <div className="spatial-card mt-8 rounded-3xl p-8 shadow-liquid-elevated dark:shadow-2xl">
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-50 p-3.5 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
              <Icon name="AlertCircle" className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Username
              </label>
              <div className="relative mt-2">
                <Icon
                  name="User"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full rounded-2xl border border-slate-300/80 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative mt-2">
                <Icon
                  name="Lock"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-slate-300/80 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
                />
              </div>
            </div>

            {requires2FA && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                  Two-Factor Security Code
                </label>
                <input
                  type="text"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 2FA security code"
                  className="mt-2 w-full rounded-2xl border border-sky-500/50 bg-white px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:bg-slate-900 dark:text-cyan-300"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="spatial-btn-primary mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold disabled:opacity-50 shadow-sm"
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

          <div className="mt-6 border-t border-slate-200/60 pt-4 text-center dark:border-white/5">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Default development credentials: <span className="text-slate-800 font-mono font-semibold dark:text-slate-300">admin</span> / <span className="text-slate-800 font-mono font-semibold dark:text-slate-300">Admin@12345</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
