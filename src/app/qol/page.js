'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Background from '@/components/Background';
import SearchBar from '@/components/SearchBar';
import ModCard from '@/components/ModCard';
import Filter from '@/components/Filter';
import { Sliders } from 'lucide-react';
import Toggle from '@/components/Toggle';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 50,
    modType: 'all',
    tags: [],
    showCheats: false,
  });
  const [mods, setMods] = useState([]);
  const [filteredMods, setFilteredMods] = useState([]);

  useEffect(() => {
    fetchMods();
  }, []);

  const fetchMods = async () => {
    try {
      const response = await fetch('/api/mods');
      const data = await response.json();
      if (data.success) {
        setMods(data.data);
        setFilteredMods(data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching mods:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setFilteredMods(
      mods.filter((mod) => {
        const matchesSearch =
          mod.title.toLowerCase().includes(search) ||
          mod.description.toLowerCase().includes(search) ||
          mod.tags.some((tag) => tag.toLowerCase().includes(search));

        const matchesPrice =
          filters.maxPrice === '' ||
          (parseFloat(filters.maxPrice) === 0
            ? mod.price === 0
            : mod.price <= parseFloat(filters.maxPrice));

        const matchesType =
          filters.modType === 'all' ||
          (filters.modType === 'free' && mod.price === 0) ||
          (filters.modType === 'paid' && mod.price > 0);

        const matchesTags =
          filters.tags.length === 0 ||
          filters.tags.some((tag) => mod.tags.includes(tag));

        const matchesCheats = filters.showCheats || mod.type !== 'Cheat';

        return (
          matchesSearch &&
          matchesPrice &&
          matchesType &&
          matchesTags &&
          matchesCheats
        );
      })
    );
  }, [searchTerm, filters, mods]);

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
          <h1 className="text-4xl font-bold">Skyblock Mods</h1>
          <div className="w-full max-w-2xl flex flex-col gap-4">
            <div className="flex gap-2">
              <SearchBar onChange={setSearchTerm} />
              <button
                onClick={() => setIsFilterOpen(true)}
                className="p-2 bg-background/40 backdrop-blur-sm rounded-lg hover:bg-accent/20 transition-colors"
              >
                <Sliders size={20} className="text-text" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Toggle
              size="small"
              defaultValue={filters.showCheats}
              onChange={(enabled) =>
                setFilters({ ...filters, showCheats: enabled })
              }
              label="Show modifications that are against server rules"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-background/20 backdrop-blur-sm border border-accent/40 rounded-lg p-4 hover:border-accent/60 hover:bg-background/30 transition-all min-h-[200px] h-full flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-text">
                    Found a New Mod?
                  </h2>
                </div>
                <p className="text-text/80 mt-2">
                  Check any Minecraft mod for malware using Ratter Scanner
                  before installing - it's free and easy!
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                window.open('https://scan.ratterscanner.com/', '_blank')
              }
              className="w-full mt-auto px-4 py-2 bg-accent/60 hover:bg-accent text-text rounded-lg transition-colors"
            >
              Open Scanner
            </button>
          </div>

          {filteredMods.map((mod) => (
            <ModCard key={mod.id} {...mod} />
          ))}

          {filteredMods.length === 0 && (
            <div className="col-span-2 text-center text-text/60 lg:col-span-2">
              No mods found matching your criteria.
            </div>
          )}
        </div>
      </main>
      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
