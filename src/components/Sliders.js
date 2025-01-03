// Taken from Polinex

'use client';

import { useState, useRef } from 'react';

function IntegerSlider({ name, min, max, startValue, onChange }) {
  const [value, setValue] = useState(startValue);
  const [inputValue, setInputValue] = useState(startValue.toString());
  const inputRef = useRef(null);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    setInputValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const handleInputChange = (e) => {
    const sanitized = e.target.value.replace(/[^0-9]/g, '');
    if (sanitized === e.target.value) {
      setInputValue(sanitized);
      const parsed = parseInt(sanitized);

      if (!isNaN(parsed)) {
        if (parsed > max) {
          setValue(max);
          setInputValue(max.toString());
          if (onChange) onChange(max);
          inputRef.current?.blur();
        } else {
          setValue(parsed);
          if (onChange) onChange(parsed);
        }
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || isNaN(parseInt(inputValue))) {
      setInputValue(value.toString());
      return;
    }

    const parsed = parseInt(inputValue);
    if (parsed < min) {
      setValue(min);
      setInputValue(min.toString());
      if (onChange) onChange(min);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-64 flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        className="
                 w-40 h-3 rounded-lg appearance-none cursor-pointer
                 bg-gray-700
                 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                 [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-white
                 [&::-webkit-slider-thumb]:shadow-lg
                 [&::-webkit-slider-thumb]:transition-transform
                 [&::-webkit-slider-thumb]:duration-200
                 [&::-webkit-slider-thumb]:hover:scale-110
                 [&::-webkit-slider-thumb]:active:scale-125
                 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                 [&::-moz-range-thumb]:rounded-full
                 [&::-moz-range-thumb]:bg-white
                 [&::-moz-range-thumb]:shadow-lg
                 [&::-moz-range-thumb]:transition-transform
                 [&::-moz-range-thumb]:duration-200
                 [&::-moz-range-thumb]:hover:scale-110
                 [&::-moz-range-thumb]:active:scale-125
             "
        style={{
          background: `linear-gradient(to right, #3B82F6 ${percentage}%, #374151 ${percentage}%)`,
        }}
      />
      <div className="relative ml-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-20 bg-[#151b23] text-blue-100 rounded border border-blue-500/20 px-2 py-1 text-center focus:outline-none focus:border-blue-500/40"
        />
      </div>
    </div>
  );
}

function DecimalSlider({ name, min, max, startValue, onChange }) {
  const [value, setValue] = useState(startValue);
  const [inputValue, setInputValue] = useState(startValue.toFixed(2));
  const inputRef = useRef(null);

  const handleSliderChange = (e) => {
    const newValue = parseFloat((e.target.value / 100).toFixed(2));
    setValue(newValue);
    setInputValue(newValue.toFixed(2));
    if (onChange) onChange(newValue);
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value.replace(',', '.');
    const dotCount = newValue.split('.').length - 1;
    if (dotCount <= 1) {
      newValue = newValue.replace(/[^0-9.]/g, '');
      if (newValue === e.target.value.replace(',', '.')) {
        setInputValue(newValue);
        let parsed = parseFloat(newValue);

        if (!isNaN(parsed)) {
          parsed = Math.round(parsed * 100) / 100;
          if (parsed > max) {
            setValue(max);
            setInputValue(max.toFixed(2));
            if (onChange) onChange(max);
            inputRef.current?.blur();
          } else {
            setValue(parsed);
            if (onChange) onChange(parsed);
          }
        }
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setInputValue(value.toFixed(2));
      return;
    }

    let parsed = parseFloat(inputValue);
    parsed = Math.round(parsed * 100) / 100;

    if (parsed < min) {
      setValue(min);
      setInputValue(min.toFixed(2));
      if (onChange) onChange(min);
    } else {
      setInputValue(value.toFixed(2));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-64 flex items-center">
      <input
        type="range"
        min={min * 100}
        max={max * 100}
        value={value * 100}
        onChange={handleSliderChange}
        className="
                    w-40 h-3 rounded-lg appearance-none cursor-pointer
                    bg-gray-700
                    [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:duration-200
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-webkit-slider-thumb]:active:scale-125
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:shadow-lg
                    [&::-moz-range-thumb]:transition-transform
                    [&::-moz-range-thumb]:duration-200
                    [&::-moz-range-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:active:scale-125
                "
        style={{
          background: `linear-gradient(to right, #3B82F6 ${percentage}%, #374151 ${percentage}%)`,
        }}
      />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="ml-3 w-20 bg-[#151b23] text-blue-100 rounded border border-blue-500/20 px-2 py-1 text-right focus:outline-none focus:border-blue-500/40"
      />
    </div>
  );
}

export { IntegerSlider, DecimalSlider };
