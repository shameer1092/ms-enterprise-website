'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@/components/common/Icon';
import { Logo } from '@/components/common/Logo';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'owner' | 'editor';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    fetch('/api/admin/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400">
          <Icon name="RefreshCw" className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading administrative workspace...</span>
        </div>
      </div>
    );
  }

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'Compass' },
    { href: '/admin/services', label: 'Services', icon: 'Code2' },
    { href: '/admin/projects', label: 'Projects', icon: 'Layers' },
    { href: '/admin/plans', label: 'Plans & Pricing', icon: 'Zap' },
    { href: '/admin/pages', label: 'Custom Pages', icon: 'FileText' },
    { href: '/admin/content', label: 'Front-end Content', icon: 'Edit' },
    { href: '/admin/navigation', label: 'Navigation Menu', icon: 'Sliders' },
    { href: '/admin/inquiries', label: 'Client Inquiries', icon: 'MessageSquare' },
    { href: '/admin/media', label: 'Media Library', icon: 'Image' },
    { href: '/admin/users', label: 'User Accounts', icon: 'User' },
    { href: '/admin/settings', label: 'Site Settings', icon: 'Settings' },
    { href: '/admin/backup', label: 'Backup & Restore', icon: 'Database' },
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#050912] lg:flex-row">
      {/* Mobile Top Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950 px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <Logo showText={false} />
          <span className="text-sm font-bold text-white">Admin Console</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <Icon name={sidebarOpen ? 'X' : 'Menu'} className="h-5 w-5" />
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-slate-950/95 p-5 backdrop-blur-xl transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Logo />
        </div>

        {/* User Role Badge */}
        {user && (
          <div className="mt-4 rounded-xl border border-white/5 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{user.name}</span>
              <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-cyan-400">
                {user.role}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">@{user.username}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="mt-5 space-y-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Icon name="ExternalLink" className="h-4 w-4" />
            <span>Open Public Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
          >
            <Icon name="LogOut" className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
