import React, { useState, useEffect } from 'react';
import Toggle from '@/components/Toggle';
import { IntegerSlider } from '@/components/Sliders';

export default function Filter({ isOpen, onClose, filters, setFilters }) {
  const tags = ['Utility', 'Dungeons', 'QOL', 'OpenSRC', 'Performance'];

  const [warning, setWarning] = useState('');

  // Ensure maxPrice defaults to 0 if somehow undefined or null
  useEffect(() => {
    if (filters.maxPrice == null) {
      setFilters((prev) => ({ ...prev, maxPrice: 0 }));
    }
  }, [filters.maxPrice, setFilters]);

  const handleTypeChange = (e) => {
    const type = e.target.value;
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

      {/* Filter Bar */}
      <div
        className={`relative w-80 bg-[#0c1015] p-6 flex flex-col gap-6 h-full transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
            aria-label="Close Filters"
          >
            &times;
          </button>
        </div>

        {/* Price Range Slider */}
        <div>
          <h4 className="text-lg font-medium text-gray-200 mb-2">
            Price Range
          </h4>
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

        {/* Type Selection */}
        <div>
          <h4 className="text-lg font-medium text-gray-200 mb-2">Type</h4>
          <select
            value={filters.modType}
            onChange={handleTypeChange}
            className="w-full bg-[#151b23] text-blue-100 rounded border border-blue-500/20 px-3 py-2"
          >
            <option value="all">All</option>
            <option value="free">Free Only</option>
            <option value="paid">Paid Only</option>
          </select>
        </div>

        {/* Tag Selection */}
        <div>
          <h4 className="text-lg font-medium text-gray-200 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded text-sm ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#151b23] text-blue-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Cheats Toggle */}
        <div className="mt-auto border-t border-gray-700 pt-4">
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
