'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';

const limit = 32;

export default function SearchMoviesPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const title = decodeURIComponent(params.title as string) ?? '';
  const currentPage = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', title, currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit, title: title }),
    placeholderData: (previousData) => previousData,
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
