'use client';

// Barebones SearchBar with no actual logic built in
export default function SearchBar({ onChange, className = '' }) {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search mods by name, description or tags..."
      onChange={handleChange}
      className={`w-full bg-[#151b23] text-blue-100 placeholder-blue-200/15 rounded-full border border-blue-500/20 px-4 py-2 focus:outline-none focus:border-blue-500/40 ${className}`}
    />
  );
}
