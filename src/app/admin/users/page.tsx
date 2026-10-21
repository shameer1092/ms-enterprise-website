'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Omit<User, 'passwordHash' | 'twoFactorSecret'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchUsers = async () => {
    try {
      const [uRes, meRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/me'),
      ]);
      const uData = await uRes.json();
      const meData = await meRes.json();

      setUsers(uData);
      if (meData.authenticated) {
        setCurrentUser(meData.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateNew = () => {
    setEditingUser({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'editor',
      twoFactorEnabled: false,
      twoFactorSecret: '123456',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save user account.');

      setMessage({ type: 'success', text: 'User account saved successfully.' });
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving user.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed.');

      setMessage({ type: 'success', text: 'User deleted.' });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user.');
    }
  };

  const isOwner = currentUser?.role === 'owner';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            User Accounts & Security
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Manage administrative access with role-based permissions (Owner and Editor) and optional 2FA.
          </p>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={handleCreateNew}
            className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            <Icon name="Plus" className="h-4 w-4" />
            <span>Create New User</span>
          </button>
        )}
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

      {!isOwner && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300">
          You are currently signed in as an <strong>Editor</strong>. Role modification and user deletion require <strong>Owner</strong> privileges.
        </div>
      )}

      {/* Editing Modal */}
      {editingUser && (
        <div className="spatial-card rounded-2xl p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingUser.id ? 'Edit User' : 'Create User Account'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  disabled={Boolean(editingUser.id)}
                  value={editingUser.username || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  placeholder="e.g. editor_team"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white disabled:opacity-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="user@msenterprise.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  {editingUser.id ? 'New Password (Leave blank to keep)' : 'Password *'}
                </label>
                <input
                  type="password"
                  required={!editingUser.id}
                  value={editingUser.password || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Account Role
                </label>
                <select
                  value={editingUser.role || 'editor'}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white"
                >
                  <option value="editor">Editor (Content & Inquiries)</option>
                  <option value="owner">Owner (Full System & User Control)</option>
                </select>
              </div>

              <div className="pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.twoFactorEnabled ?? false}
                    onChange={(e) => setEditingUser({ ...editingUser, twoFactorEnabled: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">
                    Require Two-Factor Security Code on Login
                  </span>
                </label>
                {editingUser.twoFactorEnabled && (
                  <div className="mt-3">
                    <label className="block text-[11px] text-slate-400">Security PIN / 2FA Code</label>
                    <input
                      type="text"
                      value={editingUser.twoFactorSecret || '123456'}
                      onChange={(e) => setEditingUser({ ...editingUser, twoFactorSecret: e.target.value })}
                      placeholder="e.g. 123456"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-mono text-cyan-300"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="spatial-btn-primary rounded-xl px-5 py-2 text-xs font-semibold"
              >
                {saveLoading ? 'Saving...' : 'Save User Account'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">User</th>
                  <th className="py-3.5 font-medium">Email</th>
                  <th className="py-3.5 font-medium">Role</th>
                  <th className="py-3.5 font-medium">2FA Status</th>
                  <th className="py-3.5 font-medium">Last Login</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-semibold text-white">
                      <div>{u.name}</div>
                      <div className="text-[11px] font-mono text-cyan-400">@{u.username}</div>
                    </td>
                    <td className="py-4 text-slate-300">{u.email || 'N/A'}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          u.role === 'owner' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-block text-[11px] ${u.twoFactorEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {u.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-4 pr-6 text-right">
                      {isOwner && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingUser(u)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                            title="Edit User"
                          >
                            <Icon name="Edit" className="h-4 w-4" />
                          </button>
                          {u.id !== currentUser?.id && (
                            <button
                              type="button"
                              onClick={() => handleDelete(u.id, u.name)}
                              className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                              title="Delete User"
                            >
                              <Icon name="Trash2" className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
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
