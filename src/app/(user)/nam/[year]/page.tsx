'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';

const limit = 32;

export default function YearMoviesPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const year = params.year as string;
  const current_page = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', year, current_page],
    queryFn: () => searchMovies({ page: current_page, limit: limit, year: year }),
    placeholderData: (previousData) => previousData,
  });

  const { results = [], total_pages = 1, total_results = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim năm "${year}"`}
      movies={results}
      currentPage={current_page}
      totalPage={total_pages}
      isLoading={isLoading}
    />
  );
}
