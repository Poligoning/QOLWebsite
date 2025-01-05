import React, { useState, useEffect } from 'react';
import Toggle from '@/components/Toggle';
import { IntegerSlider } from '@/components/Sliders';
import Select from '@/components/Select';

export default function Filter({ isOpen, onClose, filters, setFilters }) {
  const tags = ['Utility', 'Dungeons', 'QOL', 'OpenSRC', 'Performance'];

  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (filters.maxPrice == null) {
      setFilters((prev) => ({ ...prev, maxPrice: 0 }));
    }
  }, [filters.maxPrice, setFilters]);

  const handleTypeChange = (type) => {
    if (type === 'free') {
      setWarning('Free mods only selected - paid mods will be hidden');
      setFilters((prev) => ({ ...prev, modType: type, maxPrice: 0 }));
    } else {
      setWarning('');
      setFilters((prev) => ({ ...prev, modType: type }));
    }
  };

  const handlePriceChange = (newPrice) => {
    setFilters((prev) => ({ ...prev, maxPrice: newPrice }));
  };

  const toggleTag = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const resetFilters = () => {
    setFilters({
      maxPrice: 0,
      modType: 'all',
      tags: [],
      showCheats: false,
    });
    setWarning('');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`relative w-80 bg-background/80 backdrop-blur-sm border-l border-white/10 p-6 flex flex-col gap-6 h-full transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-text">Filters</h3>
          <button
            onClick={onClose}
            className="text-text/60 hover:text-text text-2xl font-bold transition-colors"
            aria-label="Close Filters"
          >
            &times;
          </button>
        </div>

        <div>
          <h4 className="text-lg font-medium text-text/90 mb-2">Price Range</h4>
          <IntegerSlider
            min={0}
            max={50}
            startValue={filters.maxPrice}
            onChange={handlePriceChange}
            disabled={filters.modType === 'free'}
          />
          {warning && (
            <span className="text-red-400 text-sm mt-1 block">{warning}</span>
          )}
        </div>

        <div>
          <h4 className="text-lg font-medium text-text/90 mb-2">Type</h4>
          <Select
            value={filters.modType}
            onChange={handleTypeChange}
            options={[
              { value: 'all', label: 'All' },
              { value: 'free', label: 'Free Only' },
              { value: 'paid', label: 'Paid Only' },
            ]}
          />
        </div>

        <div>
          <h4 className="text-lg font-medium text-text/90 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-accent text-background'
                    : 'bg-background/40 backdrop-blur-sm text-text border border-primary/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          <Toggle
            defaultValue={filters.showCheats}
            onChange={(enabled) =>
              setFilters((prev) => ({ ...prev, showCheats: enabled }))
            }
            label="Display Cheats"
          />
        </div>

        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-secondary hover:bg-accent text-text rounded-lg transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
