'use client';

import { useState, useRef } from 'react';

// Basic Textbox Element
export default function Textbox({
  name,
  defaultValue = '',
  placeholder = '',
  onChange,
  className = '',
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleBlur = () => {
    if (onChange) onChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={`ml-3 w-40 bg-[#151b23] text-blue-100 placeholder-blue-200/15 rounded border border-blue-500/20 px-2 py-1 focus:outline-none focus:border-blue-500/40 ${className}`}
    />
  );
}
