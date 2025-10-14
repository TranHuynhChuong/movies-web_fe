'use client';

import { useEffect, useState } from 'react';
import { IconSearch } from './icon/IconSearch';
import { IconX } from './icon/IconX';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('title') || '';
  const [query, setQuery] = useState(searchQuery);

  const { open, setOpen, toggleOpen } = useSearchBar();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      if (open) {
        // Nếu đang ở mobile và thanh đang mở -> tìm kiếm
        router.push(`/tim-kiem/${encodeURIComponent(query.trim())}`);
        setOpen(false);
      } else {
        // Nếu chưa mở -> mở thanh tìm kiếm
        toggleOpen();
      }
    } else {
      // Desktop -> tìm kiếm luôn
      router.push(`/tim-kiem/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/tim-kiem/${encodeURIComponent(query.trim())}`);
      setOpen(false); // Đóng thanh tìm kiếm sau khi chuyển trang (mobile)
    }
  };

  return (
    <div className="flex h-full items-center gap-2 flex-1 lg:flex-none justify-end">
      <div className="group relative flex-1 lg:w-75 lg:max-w-75 lg:min-w-50 h-full">
        <input
          type="text"
          id="search"
          placeholder="Tìm kiếm phim..."
          defaultValue={searchQuery}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch}
          className={` transition-all duration-200 ease-in-out
            ${open ? 'block' : 'hidden'}
            w-full h-full text-xs rounded-md bg-white/10 py-2 pl-10 pr-3 lg:pr-10 lg:pl-3 focus:ring focus:ring-white disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 lg:block`}
        />
        <button
          className={`absolute top-0  ${
            open ? 'left-0' : 'right-0 hover:bg-white/10 lg:hover:bg-transparent'
          } flex cursor-pointer items-center rounded-lg  px-3 py-2 lg:bg-transparent`}
          onClick={handleClick}
        >
          <IconSearch width={20} height={20} />
        </button>
      </div>

      {/* Nút đóng chỉ hiện ở mobile khi input mở */}
      {open && (
        <button
          className="cursor-pointer px-3 py-2 text-red-500 rounded-lg lg:hidden hover:bg-white/10"
          onClick={() => setOpen(false)}
        >
          <IconX width={20} height={20} />
        </button>
      )}
    </div>
  );
}
