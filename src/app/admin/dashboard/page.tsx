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
        <Icon name="RefreshCw" className="h-6 w-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  const cards = [
    {
      title: 'Unread Inquiries',
      value: stats.counts.unreadInquiries,
      total: `${stats.counts.inquiries} Total`,
      href: '/admin/inquiries',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      icon: 'MessageSquare',
    },
    {
      title: 'Live Services',
      value: stats.counts.services,
      total: 'Active in menu',
      href: '/admin/services',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      icon: 'Code2',
    },
    {
      title: 'Active Projects',
      value: stats.counts.projects,
      total: 'Linked dynamically',
      href: '/admin/projects',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      icon: 'Layers',
    },
    {
      title: 'Pricing Plans',
      value: stats.counts.plans,
      total: 'Across all services',
      href: '/admin/plans',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      icon: 'Zap',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin Overview
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Real-time status of MS Enterprise front-end content, database, and client inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/plans"
            className="spatial-btn-primary rounded-xl px-4 py-2 text-xs font-semibold"
          >
            + Add New Plan
          </Link>
          <Link
            href="/admin/services"
            className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-medium"
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
            className="spatial-card block rounded-2xl p-6 transition-all hover:border-cyan-500/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bgColor} ${card.color}`}>
                <Icon name={card.icon} className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{card.value}</span>
              <span className="text-xs text-slate-400">{card.total}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries and Audit Logs Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Recent Inquiries (8 cols) */}
        <div className="spatial-card rounded-2xl p-6 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-base font-bold text-white">Recent Client Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-cyan-400 hover:underline">
              View All Inquiries →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            {stats.recentInquiries.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">No inquiries received yet.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-slate-400">
                    <th className="py-2.5 font-medium">Client</th>
                    <th className="py-2.5 font-medium">Service</th>
                    <th className="py-2.5 font-medium">Status</th>
                    <th className="py-2.5 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {stats.recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-white">
                        <div>{inq.name}</div>
                        <div className="text-[11px] text-slate-400">{inq.email}</div>
                      </td>
                      <td className="py-3 text-slate-300">{inq.service}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            inq.status === 'unread'
                              ? 'bg-amber-500/10 text-amber-400'
                              : inq.status === 'replied'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">
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
        <div className="spatial-card rounded-2xl p-6 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-base font-bold text-white">System Activity</h2>
            <span className="text-[11px] font-mono text-cyan-400">Live DB</span>
          </div>

          <div className="mt-4 space-y-3.5">
            {stats.recentLogs.map((log) => (
              <div key={log.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-3 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-cyan-400">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="mt-1 text-slate-300">{log.details}</p>
                <span className="mt-1 block text-[10px] text-slate-500">by {log.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
