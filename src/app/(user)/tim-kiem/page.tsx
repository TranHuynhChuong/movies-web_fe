'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';
import { Suspense } from 'react';

const limit = 32;

function AllMovies() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', 'new_updated', currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  const { results = [], totalPages = 1, totalResults = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={'Danh sách phim'}
      movies={results}
      currentPage={currentPage}
      totalPage={totalPages}
      isLoading={isLoading}
    />
  );
}

export default function AllMoviesPage() {
  return (
    <Suspense fallback={null}>
      <AllMovies />
    </Suspense>
  );
}
