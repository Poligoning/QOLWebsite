'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import Background from '@/components/Background';

export default function Dashboard() {
  const [mods, setMods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMod, setCurrentMod] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    discord: '',
    downloads: '',
    tags: [],
    type: 'Legit',
    price: 0,
    verified: false,
  });

  const tagOptions = [
    'Performance',
    'Graphics',
    'Utility',
    'Dungeons',
    'QOL',
    'OpenSRC',
    'Storage',
    'HUD',
    'Other',
  ];

  useEffect(() => {
    fetchMods();
  }, []);

  const fetchMods = async () => {
    try {
      const response = await fetch('/api/mods');
      const data = await response.json();
      if (data.success) {
        setMods(data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching mods:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        '/api/mods' + (currentMod ? `?id=${currentMod.id}` : ''),
        {
          method: currentMod ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        await fetchMods();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting mod:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mod?')) {
      try {
        const response = await fetch(`/api/mods?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchMods();
        }
      } catch (error) {
        console.error('Error deleting mod:', error);
      }
    }
  };

  const handleEdit = (mod) => {
    setCurrentMod(mod);
    setFormData(mod);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      github: '',
      discord: '',
      downloads: '',
      tags: [],
      type: 'Legit',
      price: 0,
      verified: false,
    });
    setCurrentMod(null);
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative text-text font-sans overflow-hidden select-none">
      <Header />
      <Background />
      <main className="flex-1 container mx-auto px-4 py-8 z-10">
        <div className="flex flex-col items-center gap-4 mb-12">
          <h1 className="text-4xl font-bold text-text">Mod Management</h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-accent/60 hover:bg-accent text-text rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Mod
          </button>
        </div>

        {/* Modal with updated styling */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-background/95 backdrop-blur-sm border border-accent/40 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text">
                  {currentMod ? 'Edit Mod' : 'Add New Mod'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-text/80 hover:text-text"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <textarea
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
                <input
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
                <input
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="Discord URL"
                  value={formData.discord}
                  onChange={(e) =>
                    setFormData({ ...formData, discord: e.target.value })
                  }
                />
                <input
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="Download path (/download/...)"
                  value={formData.downloads}
                  onChange={(e) =>
                    setFormData({ ...formData, downloads: e.target.value })
                  }
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`px-2 py-1 rounded-lg text-sm transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-accent/60 text-text'
                          : 'bg-background/40 text-text/80'
                      }`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <select
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text focus:border-accent/60 transition-colors"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  required
                >
                  <option value="Legit">Legit</option>
                  <option value="Cheat">Cheat</option>
                </select>
                <input
                  type="number"
                  className="w-full p-2 bg-background/40 border border-accent/40 rounded-lg text-text placeholder-text/60 focus:border-accent/60 transition-colors"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) =>
                      setFormData({ ...formData, verified: e.target.checked })
                    }
                    className="rounded bg-background/40 border-accent/40"
                  />
                  <label className="text-text">Verified</label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-accent/60 hover:bg-accent text-text rounded-lg transition-colors"
                >
                  {currentMod ? 'Update' : 'Create'} Mod
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Table with updated styling */}
        <div className="bg-background/20 backdrop-blur-sm border border-accent/40 rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-accent/40">
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/40">
              {mods.map((mod) => (
                <tr
                  key={mod.id}
                  className="hover:bg-background/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-text">
                    {mod.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        mod.type === 'Legit'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {mod.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text">
                    {mod.price === 0 ? 'Free' : `$${mod.price}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-background/40 rounded-lg text-xs text-text/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                        mod.verified
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-background/40 text-text/80'
                      }`}
                    >
                      {mod.verified ? <>Verified</> : <>Unverified</>}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(mod)}
                        className="p-1 text-text/80 hover:text-text transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(mod.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
