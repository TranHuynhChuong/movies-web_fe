'use client';

import { useEffect, useRef, useState } from 'react';

type Option = {
  id: string;
  name: string;
};

type SelectMultipleProps = {
  label?: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function SelectMultiple({
  label,
  options,
  selected,
  onChange,
}: Readonly<SelectMultipleProps>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle chọn / bỏ chọn
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  // Hiển thị giá trị đã chọn
  const selectedText =
    selected.length === 0
      ? 'Chọn...'
      : options
          .filter((opt) => selected.includes(opt.id))
          .map((opt) => opt.name)
          .join(', ');

  return (
    <div ref={ref} className="relative w-full">
      {label && <label className="block mb-2 text-sm font-medium text-white">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 text-left rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
      >
        {selectedText}
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-30 max-h-52 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-800 ${
                  isSelected ? 'bg-gray-800/60' : ''
                }`}
              >
                <span
                  className={`mr-2 w-4 h-4 border rounded flex items-center justify-center ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                  }`}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.707a1 1 0 011.414-1.414L8 11.586l6.293-6.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-white">{opt.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
