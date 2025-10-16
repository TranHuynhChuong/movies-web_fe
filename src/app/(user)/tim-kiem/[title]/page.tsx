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
  const current_page = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', title, current_page],
    queryFn: () => searchMovies({ page: current_page, limit: limit, title: title }),
    placeholderData: (previousData) => previousData,
  });

  const { results = [], total_pages = 1, total_results = 0, page = 1 } = data.data || {};

  return (
    <PanelSearchResult
      title={`Phim "${title}"`}
      movies={results}
      currentPage={current_page}
      totalPage={total_pages}
      isLoading={isLoading}
    />
  );
}
