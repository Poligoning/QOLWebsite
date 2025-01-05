'use client';

export default function SearchBar({ onChange, className = '' }) {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search mods by name, description or tags..."
      onChange={handleChange}
      className={`w-full bg-background/40 backdrop-blur-sm text-text placeholder-text/20 rounded-full border border-primary/20 px-4 py-2 focus:outline-none focus:border-primary/40 transition-colors ${className}`}
    />
  );
}
