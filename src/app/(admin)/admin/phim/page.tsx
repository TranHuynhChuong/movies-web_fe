'use client';

import { IconSearch } from '@/components/icon/IconSearch';
import { PanelFilterMovies } from '@/components/PanelFiltterMovies';

import { TableMovies } from '@/components/TableMovies';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { getTotals, searchMovies } from '@/services/movie/get';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminMoviesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    page: Number(searchParams.get('page') ?? 1),
    genre: searchParams.get('genre') ?? 'all',
    country: searchParams.get('country') ?? 'all',
    media_type: searchParams.get('media_type') ?? 'all',
    title: searchParams.get('title') ?? '',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['movies_list', filters],
    queryFn: () =>
      searchMovies({
        page: filters.page ?? 1,
        limit: 32,
        genre_id: filters.genre === 'all' ? undefined : filters.genre,
        country_id: filters.country === 'all' ? undefined : filters.country,
        media_type: filters.media_type === 'all' ? undefined : filters.media_type,
        title: filters.title?.trim() || undefined,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: totals } = useQuery({
    queryKey: ['movies_list-totals'],
    queryFn: () => getTotals(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const [titleInput, setTitleInput] = useState(filters.title);

  if (isLoading || !data) return null;

  const { results, page, total_pages, total_results } = data;
  const { movies = 0, series = 0, upcoming = 0 } = totals || {};

  const updateURL = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();

    const merged = { ...filters, ...newFilters };

    if (merged.media_type !== 'all') params.set('media_type', merged.media_type);
    if (merged.country !== 'all') params.set('country', merged.country);
    if (merged.genre !== 'all') params.set('genre', merged.genre);
    if (merged.title) params.set('title', merged.title);
    params.set('page', String(merged.page ?? 1));

    router.push(`/admin/phim?${params.toString()}`);
  };

  const handleSearch = () => {
    updateURL({ title: titleInput, page: 1 });
  };

  return (
    <div className="space-y-4 p-2 md:p-4 rounded-lg">
      <div className=" space-y-4">
        <div className="flex justify-between gap-2 items-center">
          <h1 className="font-bold text-xl">Danh sách phim</h1>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <h2>Phim bộ ({movies})</h2>
          <h2>Phim lẻ ({series})</h2>
          <h2>Sắp chiếu ({upcoming})</h2>
        </div>
        <div className="relative flex justify-end">
          <input
            type="text"
            id="search"
            placeholder="Tìm kiếm phim..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={`w-full  h-full text-xs rounded-md bg-white/10 py-2.5 pr-10 pl-3 focus:ring focus:ring-white disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
          />
          <button
            className={`absolute top-0 right-0 hover:bg-white/10 flex cursor-pointer items-center rounded-md px-3 py-2 bg-transparent`}
            onClick={handleSearch}
          >
            <IconSearch width={18} height={18} />
          </button>
        </div>

        <PanelFilterMovies
          initialSelectedCountry={filters.country}
          initialSelectedGenre={filters.genre}
          initialSelectedType={filters.media_type}
          onConfirm={(media_type, country, genre) => {
            updateURL({ media_type, country, genre, page: 1 });
          }}
        />
      </div>

      <TableMovies movies={results} />
      <Pagination currentPage={filters.page} totalPage={total_pages} />
    </div>
  );
}
