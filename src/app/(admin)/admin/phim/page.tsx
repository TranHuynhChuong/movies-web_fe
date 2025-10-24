'use client';

import { IconSearch } from '@/components/icon/IconSearch';
import { PanelFilterMovies } from '@/components/PanelFiltterMovies';
import { TableMovies } from '@/components/TableMovies';
import { Pagination } from '@/components/ui/Pagination';
import { searchMovies } from '@/services/movie/get';
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
    mediaType: searchParams.get('mediaType') ?? 'all',
    status: searchParams.get('status') ?? 'all',
    title: searchParams.get('title') ?? '',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['movies_list', filters],
    queryFn: () =>
      searchMovies({
        page: filters.page ?? 1,
        limit: 32,
        genreId: filters.genre === 'all' ? undefined : filters.genre,
        countryId: filters.country === 'all' ? undefined : filters.country,
        mediaType: filters.mediaType === 'all' ? undefined : filters.mediaType,
        status: filters.status === 'all' ? undefined : filters.status,
        title: filters.title?.trim() || undefined,
      }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
    staleTime: 0,
    gcTime: 0,
  });

  const [titleInput, setTitleInput] = useState(filters.title);

  if (isLoading || !data) return null;

  const { results, page, totalPages, totalResults } = data;

  const updateURL = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();

    const merged = { ...filters, ...newFilters };

    if (merged.mediaType !== 'all') params.set('mediaType', merged.mediaType);
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
        <div className="space-y-1">
          <h1 className="font-bold text-xl">Danh sách phim</h1>
          <p>Tổng {totalResults} bộ phim</p>
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
          initialSelectedType={filters.mediaType}
          onConfirm={(mediaType, country, genre, status) => {
            updateURL({ mediaType, country, genre, status, page: 1 });
          }}
        />
      </div>

      <TableMovies movies={results} />
      <Pagination currentPage={filters.page} totalPage={totalPages} />
    </div>
  );
}
