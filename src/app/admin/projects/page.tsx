'use client';

import React, { useEffect, useState } from 'react';
import { ProjectItem } from '@/types';
import { Icon } from '@/components/common/Icon';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      serviceCategory: 'web',
      client: '',
      summary: '',
      description: '',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      keyOutcomes: ['Accelerated performance', 'Client satisfaction'],
      published: true,
      showInNav: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;
    setSaveLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project.');

      setMessage({
        type: 'success',
        text: 'Project saved! Navigation menu was updated automatically.',
      });
      setEditingProject(null);
      fetchProjects();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving project.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the project "${title}"? This will remove its link from the navigation menu.`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project.');
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Delete error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Projects & Case Studies
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Add or edit client projects. When published, projects automatically generate entries in the navbar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="spatial-btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
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

      {/* Editing Form Modal */}
      {editingProject && (
        <div className="spatial-card rounded-2xl p-6 shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingProject.id ? 'Edit Project' : 'Create New Project'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="text-slate-400 hover:text-white"
            >
              <Icon name="X" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Apex Industrial Portal"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  URL Slug (Auto-generated if empty)
                </label>
                <input
                  type="text"
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  placeholder="e.g. apex-industrial-portal"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Service Category
                </label>
                <select
                  value={editingProject.serviceCategory || 'web'}
                  onChange={(e) => setEditingProject({ ...editingProject, serviceCategory: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="web">Web Development</option>
                  <option value="meta">Meta Services</option>
                  <option value="ecommerce">Ecommerce Support (VA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={editingProject.client || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  placeholder="e.g. Apex Machinery Ltd"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-6 sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">Published (Live)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.showInNav ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, showInNav: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span className="text-xs font-medium text-slate-200">
                    Include in Dynamic Navigation Menu
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Summary (Card overview)
              </label>
              <textarea
                rows={2}
                value={editingProject.summary || ''}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                placeholder="Brief project summary..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300">
                Description & Implementation Details
              </label>
              <textarea
                rows={4}
                value={editingProject.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Full description..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={(editingProject.techStack || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. Next.js, TypeScript, PostgreSQL"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  Key Outcomes (One per line)
                </label>
                <textarea
                  rows={2}
                  value={(editingProject.keyOutcomes || []).join('\n')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      keyOutcomes: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                    })
                  }
                  placeholder="One outcome per line..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="spatial-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="spatial-btn-primary rounded-xl px-5 py-2 text-xs font-semibold"
              >
                {saveLoading ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="spatial-card overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-12 text-center text-cyan-400">Loading projects...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                  <th className="py-3.5 pl-6 font-medium">Project</th>
                  <th className="py-3.5 font-medium">Category</th>
                  <th className="py-3.5 font-medium">Slug</th>
                  <th className="py-3.5 font-medium">Navbar</th>
                  <th className="py-3.5 font-medium">Status</th>
                  <th className="py-3.5 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/[0.02]">
                    <td className="py-4 pl-6 font-semibold text-white">
                      <div>{proj.title}</div>
                      {proj.client && <div className="text-[11px] font-normal text-slate-400">{proj.client}</div>}
                    </td>
                    <td className="py-4 capitalize text-slate-300">{proj.serviceCategory}</td>
                    <td className="py-4 font-mono text-cyan-300">/projects/{proj.slug}</td>
                    <td className="py-4">
                      <span className={`inline-block text-[11px] ${proj.showInNav ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                        {proj.showInNav ? 'Navbar Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          proj.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {proj.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(proj)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                          title="Edit Project"
                        >
                          <Icon name="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10"
                          title="Delete Project"
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </button>
                      </div>
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
