'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Background from '@/components/Background';
import SearchBar from '@/components/SearchBar';
import ModCard from '@/components/ModCard';
import Filter from '@/components/Filter';
import { Sliders } from 'lucide-react';
import Toggle from '@/components/Toggle';

const mods = [
  {
    title: 'Not Enough Updates',
    description: 'ram eater',
    github: 'https://github.com/NotEnoughUpdates/NotEnoughUpdates',
    discord: 'https://discord.gg/moulberry',
    downloads: '/download/neu',
    tags: ['Utility', 'Dungeons', 'OpenSRC'],
    type: 'Legit',
    price: 0,
  },
  {
    title: 'Skyblock Addons',
    description: 'boom i cant think right now',
    github: 'https://github.com/BiscuitDevelopment/SkyblockAddons',
    discord: 'placeholder',
    downloads: '/download/sba',
    tags: ['Utility', 'QOL', 'OpenSRC'],
    type: 'Legit',
    price: 0,
  },
  {
    title: 'Skyblock Extras',
    description: 'skytils but u pay 5USD',
    discord: 'placeholder',
    downloads: '/download/sbe',
    tags: ['Utility', 'Dungeons', 'QOL'],
    type: 'Legit',
    price: 5,
  },
  {
    title: 'Pizza Client',
    description: 'goat goat goat',
    discord: 'https://discord.gg/piza',
    downloads: '/download/pizza',
    tags: ['Dungeons', 'Utility'],
    type: 'Cheat',
    price: 15,
  },
  {
    title: 'Taunahi',
    description: 'farmmmm.',
    discord: 'https://discord.gg/taunahi',
    downloads: '/download/taunahi',
    tags: ['QOL', 'Utility'],
    type: 'Cheat',
    price: 35,
  },
  {
    title: 'Patcher',
    description: 'good also',
    github: 'https://github.com/Sk1erLLC/Patcher',
    downloads: '/download/patcher',
    tags: ['Performance', 'OpenSRC'],
    type: 'Legit',
    price: 0,
  },
  {
    title: 'Optifine',
    description: 'good',
    downloads: '/download/optifine',
    tags: ['Performance'],
    type: 'Legit',
    price: 0,
  },
];

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
  const [filteredMods, setFilteredMods] = useState(mods);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
  }, [searchTerm, filters]);

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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMods.map((mod, index) => (
            <ModCard key={index} {...mod} />
          ))}
          {filteredMods.length === 0 && (
            <div className="col-span-full text-center text-text/60">
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
