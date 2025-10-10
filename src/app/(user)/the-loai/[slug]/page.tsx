'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { extractId } from '@/utils/kebabCase';
import { useAppDataValue } from '@/hooks/useAppDataValue';
import { PanelSearchResult } from '@/components/PanelSearchResult';

const limit = 32;

export default function GenreMoviesPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params.slug as string;
  const current_page = Number(searchParams.get('page') ?? 1);
  const genre_id = extractId(slug);
  const genre = useAppDataValue('genre', genre_id);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', slug, current_page],
    queryFn: () => searchMovies({ page: current_page, limit: limit, genre_id: genre_id }),
    placeholderData: (previousData) => previousData,
  });

  const { results = [], total_pages = 1, total_results = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim "${genre}"`}
      movies={results}
      currentPage={current_page}
      totalPage={total_pages}
      isLoading={isLoading}
    />
  );
}
