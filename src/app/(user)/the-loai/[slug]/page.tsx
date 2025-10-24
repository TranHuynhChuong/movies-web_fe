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
  const currentPage = Number(searchParams.get('page') ?? 1);
  const genreId = extractId(slug);
  const genre = useAppDataValue('genre', genreId);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', slug, currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit, genreId: genreId }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  const { results = [], totalPages = 1, totalResults = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim "${genre}"`}
      movies={results}
      currentPage={currentPage}
      totalPage={totalPages}
      isLoading={isLoading}
    />
  );
}
