'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';

interface DashboardStats {
  counts: {
    services: number;
    projects: number;
    plans: number;
    pages: number;
    inquiries: number;
    unreadInquiries: number;
  };
  recentInquiries: any[];
  recentLogs: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Icon name="RefreshCw" className="h-6 w-6 animate-spin text-sky-600 dark:text-cyan-400" />
      </div>
    );
  }

  const cards = [
    {
      title: 'Unread Inquiries',
      value: stats.counts.unreadInquiries,
      total: `${stats.counts.inquiries} Total`,
      href: '/admin/inquiries',
      color: 'text-amber-700 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-500/10',
      icon: 'MessageSquare',
    },
    {
      title: 'Live Services',
      value: stats.counts.services,
      total: 'Active in menu',
      href: '/admin/services',
      color: 'text-sky-700 dark:text-cyan-400',
      bgColor: 'bg-sky-100 dark:bg-cyan-500/10',
      icon: 'Code2',
    },
    {
      title: 'Active Projects',
      value: stats.counts.projects,
      total: 'Linked dynamically',
      href: '/admin/projects',
      color: 'text-blue-700 dark:text-sky-400',
      bgColor: 'bg-blue-100 dark:bg-sky-500/10',
      icon: 'Layers',
    },
    {
      title: 'Pricing Plans',
      value: stats.counts.plans,
      total: 'Across all services',
      href: '/admin/plans',
      color: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/10',
      icon: 'Zap',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Admin Overview
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Real-time status of MS Enterprise front-end content, database, and client inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/plans"
            className="spatial-btn-primary rounded-full px-4 py-2 text-xs font-semibold shadow-sm"
          >
            + Add New Plan
          </Link>
          <Link
            href="/admin/services"
            className="spatial-btn-secondary rounded-full px-4 py-2 text-xs font-medium"
          >
            + Add Service
          </Link>
        </div>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className="spatial-card block rounded-3xl p-6 transition-all shadow-liquid-card dark:shadow-spatial-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${card.bgColor} ${card.color}`}>
                <Icon name={card.icon} className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{card.value}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{card.total}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries and Audit Logs Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Recent Inquiries (8 cols) */}
        <div className="spatial-card rounded-3xl p-6 lg:col-span-8 shadow-liquid-card dark:shadow-spatial-card">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-white/5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Client Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-sky-700 hover:underline dark:text-cyan-400">
              View All Inquiries →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            {stats.recentInquiries.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">No inquiries received yet.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/60 text-slate-500 dark:border-white/5 dark:text-slate-400">
                    <th className="py-2.5 font-semibold">Client</th>
                    <th className="py-2.5 font-semibold">Service</th>
                    <th className="py-2.5 font-semibold">Status</th>
                    <th className="py-2.5 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-white/5 dark:text-slate-300">
                  {stats.recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-slate-900 dark:text-white">
                        <div>{inq.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{inq.email}</div>
                      </td>
                      <td className="py-3 text-slate-700 dark:text-slate-300">{inq.service}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                            inq.status === 'unread'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400'
                              : inq.status === 'replied'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* System Activity Audit Feed (4 cols) */}
        <div className="spatial-card rounded-3xl p-6 lg:col-span-4 shadow-liquid-card dark:shadow-spatial-card">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-white/5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">System Activity</h2>
            <span className="text-[11px] font-mono text-sky-700 dark:text-cyan-400">Live DB</span>
          </div>

          <div className="mt-4 space-y-3.5">
            {stats.recentLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-xs shadow-xs dark:border-white/5 dark:bg-slate-900/40">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-sky-700 dark:text-cyan-400">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="mt-1 text-slate-700 dark:text-slate-300">{log.details}</p>
                <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">by {log.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
