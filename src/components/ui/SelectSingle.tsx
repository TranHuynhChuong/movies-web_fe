'use client';

import { useEffect, useRef, useState } from 'react';

type SelectSingleProps = {
  label?: string;
  options: { id: string; name: string }[];
  selected: string;
  onChange: (id: string) => void;
};

export default function SelectSingle({
  label,
  options,
  selected,
  onChange,
}: Readonly<SelectSingleProps>) {
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

  const selectedText = options.find((opt) => opt.id === selected)?.name || 'Chọn...';

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
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-800 ${
                selected === opt.id ? 'bg-gray-800/60' : ''
              }`}
            >
              <span className="text-white">{opt.name}</span>
              {selected === opt.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-auto h-4 w-4 text-blue-400"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
