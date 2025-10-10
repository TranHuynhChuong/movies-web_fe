'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { PanelSearchResult } from '@/components/PanelSearchResult';

const limit = 32;

export default function AllMoviesPage() {
  const searchParams = useSearchParams();

  const current_page = Number(searchParams.get('page') ?? 1);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', 'new_updated', current_page],
    queryFn: () => searchMovies({ page: current_page, limit: limit, new: 'updated' }),
    placeholderData: (previousData) => previousData,
  });

  const { results = [], total_pages = 1, total_results = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={'Danh sách phim'}
      movies={results}
      currentPage={current_page}
      totalPage={total_pages}
      isLoading={isLoading}
    />
  );
}
