'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';
import { Suspense } from 'react';

const limit = 32;

function Movies() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', 'movie', currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit, mediaType: 'movie' }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000,
  });

  const { results = [], totalPages = 1, totalResults = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim lẻ`}
      movies={results}
      currentPage={currentPage}
      totalPage={totalPages}
      isLoading={isLoading}
    />
  );
}
export default function MoviesPage() {
  return (
    <Suspense fallback={null}>
      <Movies />
    </Suspense>
  );
}
