'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { TiltCard } from '@/components/spatial/TiltCard';

export default function PortalGatewayPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      // Successful login routes directly into secure console
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
            <Logo size="lg" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Secure Portal Gateway
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            Internal Operations and System Console
          </p>
        </div>

        <TiltCard
          maxTilt={4}
          className="spatial-card mt-8 rounded-3xl p-8 border border-slate-200/80 shadow-liquid-elevated dark:border-white/10 dark:shadow-spatial-elevated"
        >
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-300">
              <Icon name="AlertCircle" className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Access Identifier
              </label>
              <div className="relative mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="spatial-input w-full rounded-xl pl-10 pr-4 py-2.5 text-xs"
                  placeholder="Enter username"
                />
                <Icon
                  name="User"
                  className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Security Key
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="spatial-input w-full rounded-xl pl-10 pr-4 py-2.5 text-xs"
                  placeholder="Enter security key"
                />
                <Icon
                  name="Lock"
                  className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="spatial-btn-primary mt-2 flex w-full items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Icon name="RefreshCw" className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Icon name="Lock" className="h-3.5 w-3.5" />
                  <span>Authorize Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200/60 pt-4 text-center dark:border-white/10">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              SECURITY_CLEARANCE // ZERO_TRUST_ACTIVE
            </p>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
