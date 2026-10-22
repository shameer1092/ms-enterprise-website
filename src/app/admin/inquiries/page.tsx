'use client';

import React, { useEffect, useState } from 'react';
import { InquiryItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenDetails = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setAdminNotes(inq.adminNotes || '');

    // If unread, automatically mark as read
    if (inq.status === 'unread') {
      updateStatus(inq.id, 'read');
    }
  };

  const updateStatus = async (id: string, newStatus: InquiryItem['status'], notes?: string) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: newStatus,
          adminNotes: notes !== undefined ? notes : adminNotes,
        }),
      });

      if (!res.ok) throw new Error('Status update failed');

      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus, adminNotes: notes || adminNotes } : i))
      );

      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus, adminNotes: notes || adminNotes });
      }
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filterStatus === 'all' || inq.status === filterStatus;
    const query = search.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.service.toLowerCase().includes(query) ||
      inq.message.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Export Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Client Inquiries
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            View, triage, mark replies, and export submitted inquiries from the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/inquiries/export"
            className="spatial-btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm"
          >
            <Icon name="Download" className="h-4 w-4" />
            <span>Export to CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="Search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by client, email, service..."
            className="w-full rounded-2xl border border-slate-300/80 bg-white/80 py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-xl focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-all ${
                filterStatus === status
                  ? 'bg-sky-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950'
                  : 'bg-white/70 border border-slate-200/80 text-slate-700 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="spatial-card overflow-hidden rounded-3xl shadow-liquid-card dark:shadow-spatial-card">
        {loading ? (
          <div className="p-12 text-center text-sky-600 dark:text-cyan-400">Loading inquiries...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 dark:text-slate-400">
            No inquiries matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/70 bg-slate-50/50 text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400">
                  <th className="py-3.5 pl-6 font-semibold">Client Info</th>
                  <th className="py-3.5 font-semibold">Service</th>
                  <th className="py-3.5 font-semibold">Budget / Timeline</th>
                  <th className="py-3.5 font-semibold">Status</th>
                  <th className="py-3.5 font-semibold">Date</th>
                  <th className="py-3.5 pr-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-white/5 dark:text-slate-300">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => handleOpenDetails(inq)}
                    className="cursor-pointer hover:bg-slate-50/70 transition-colors dark:hover:bg-white/[0.02]"
                  >
                    <td className="py-4 pl-6 font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        {inq.status === 'unread' && (
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                        )}
                        <span>{inq.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{inq.email}</div>
                    </td>
                    <td className="py-4 text-slate-700 dark:text-slate-300">{inq.service}</td>
                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      {inq.budget || 'Open'} / {inq.timeline || 'Flexible'}
                    </td>
                    <td className="py-4">
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
                    <td className="py-4 text-slate-500 dark:text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inq.id);
                        }}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        title="Delete inquiry"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm dark:bg-black/80">
          <div className="spatial-elevated w-full max-w-2xl rounded-3xl p-6 shadow-liquid-elevated sm:p-8 dark:shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200/70 pb-4 dark:border-white/10">
              <div>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                    selectedInquiry.status === 'unread'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400'
                      : selectedInquiry.status === 'replied'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {selectedInquiry.status}
                </span>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{selectedInquiry.name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Received {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-slate-900/60">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Email:</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="mt-0.5 block font-semibold text-sky-700 hover:underline dark:text-cyan-400"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Phone:</span>
                  <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} className="hover:text-sky-700 dark:hover:text-cyan-400">
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Service:</span>
                  <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">{selectedInquiry.service}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Budget & Timeline:</span>
                  <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                    {selectedInquiry.budget || 'Flexible'} / {selectedInquiry.timeline || 'Flexible'}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] dark:text-slate-300">
                  Project Message:
                </span>
                <div className="mt-2 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-line dark:border-white/5 dark:bg-slate-900/80 dark:text-slate-200">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] dark:text-slate-300">
                  Internal Admin Notes:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Private internal notes regarding proposals, quotes, or client followups..."
                  className="mt-1.5 w-full rounded-2xl border border-slate-300/80 bg-white/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:border-cyan-400"
                />
              </div>

              {/* Status change actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 pt-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Set Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as any, adminNotes)}
                    className="rounded-full border border-slate-300/80 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedInquiry.id, selectedInquiry.status, adminNotes)}
                    disabled={actionLoading}
                    className="spatial-btn-primary rounded-full px-4 py-2 text-xs font-semibold shadow-sm"
                  >
                    Save Notes
                  </button>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE: MS Enterprise Inquiry - ${encodeURIComponent(
                      selectedInquiry.service
                    )}`}
                    className="spatial-btn-secondary rounded-full px-4 py-2 text-xs font-semibold text-sky-700 dark:text-cyan-400"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
