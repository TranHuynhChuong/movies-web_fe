'use client';

import { IconSearch } from '@/components/icon/IconSearch';
import { IconX } from '@/components/icon/IconX';
import { PanelFilterMovies } from '@/components/PanelFiltterMovies';
import { TableMovies } from '@/components/TableMovies';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { searchMovies } from '@/services/movie/get';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function AdminMovies() {
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
    staleTime: 5 * 60 * 1000,
  });

  const [titleInput, setTitleInput] = useState(filters.title);

  if (isLoading || !data) return null;

  const { results, page, totalPages, totalResults } = data;

  const updateURL = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();

    const merged = { ...filters, ...newFilters };

    if (merged.mediaType && merged.mediaType !== 'all') params.set('mediaType', merged.mediaType);
    if (merged.country && merged.country !== 'all') params.set('country', merged.country);
    if (merged.genre && merged.genre !== 'all') params.set('genre', merged.genre);
    if (merged.title) params.set('title', merged.title);
    params.set('page', String(merged.page ?? 1));

    router.replace(`/admin/phim?${params.toString()}`);
  };

  const handleSearch = () => {
    updateURL({ title: titleInput, page: 1 });
  };

  const handleClearSearch = () => {
    setTitleInput('');
    updateURL({ title: '', page: 1 });
  };

  return (
    <div className="space-y-4 p-2 md:p-4 rounded-lg mt-4">
      <div className=" space-y-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="space-y-2">
            <h1 className="font-bold text-xl">Danh sách phim</h1>
            <p>Tổng {totalResults} bộ phim</p>
          </div>
          <div className="flex gap-2 w-fit flex-wrap">
            <Link href={'/admin/phim/them-moi?multiple=true'}>
              <Button size="sm" variant="outline" className="rounded-lg">
                Thêm từ file CSV
              </Button>
            </Link>
            <Link href={'/admin/phim/them-moi'}>
              <Button size="sm" className="rounded-lg">
                Thêm phim mới
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex justify-end">
          <button
            className={`absolute top-0 left-0 hover:bg-white/10 flex cursor-pointer items-center rounded-md px-3 py-2 bg-transparent`}
            onClick={handleSearch}
          >
            <IconSearch width={18} height={18} />
          </button>
          <input
            type="text"
            id="search"
            placeholder="Tìm kiếm phim..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={`w-full  h-full text-xs rounded-md bg-white/10 py-2.5 px-12 focus:ring focus:ring-white disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
          />
          {titleInput && (
            <button
              className={`absolute top-0 right-0 hover:bg-white/10 flex cursor-pointer items-center rounded-md px-3 py-2 bg-transparent`}
              onClick={handleClearSearch}
            >
              <IconX width={18} height={18} />
            </button>
          )}
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
      <Suspense fallback={null}>
        <Pagination currentPage={filters.page} totalPage={totalPages} />
      </Suspense>
    </div>
  );
}

export default function AdminMoviesPage() {
  return (
    <Suspense fallback={null}>
      <AdminMovies />
    </Suspense>
  );
}
