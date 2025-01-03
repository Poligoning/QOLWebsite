import { useEffect, useState } from 'react';

// Basic Boolean Setting
export default function Toggle({
  defaultValue = false,
  onChange,
  label,
  size = 'default',
}) {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    setEnabled(defaultValue);
  }, [defaultValue]);

  const handleClick = (e) => {
    e.stopPropagation();
    setEnabled(!enabled);
    if (onChange) onChange(!enabled);
  };

  const sizes = {
    small: {
      wrapper: 'w-12 h-6',
      circle: 'w-4 h-4 top-1 left-1',
      translate: 'translate-x-6',
    },
    default: {
      wrapper: 'w-16 h-8',
      circle: 'w-6 h-6 top-1 left-1',
      translate: 'translate-x-8',
    },
  };

  const sizeClass = sizes[size] || sizes.default;

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-gray-300 flex-1">{label}</span>}
      <div
        onClick={handleClick}
        className={`relative rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
          enabled ? 'bg-blue-500' : 'bg-gray-700'
        } ${sizeClass.wrapper}`}
      >
        <div
          className={`absolute bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            enabled ? sizeClass.translate : ''
          } ${sizeClass.circle}`}
        />
      </div>
    </div>
  );
}
