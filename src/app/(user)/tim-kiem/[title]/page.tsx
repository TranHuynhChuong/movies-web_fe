'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';
import { Suspense } from 'react';

const limit = 32;

function SearchMovies() {
  const searchParams = useSearchParams();
  const params = useParams();

  const title = decodeURIComponent(params.title as string) ?? '';
  const currentPage = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', title, currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit, title: title }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });

  const { results = [], totalPages = 1, totalResults = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim "${title}"`}
      movies={results}
      currentPage={currentPage}
      totalPage={totalPages}
      isLoading={isLoading}
    />
  );
}
export default function SearchMoviesPage() {
  return (
    <Suspense fallback={null}>
      <SearchMovies />
    </Suspense>
  );
}
