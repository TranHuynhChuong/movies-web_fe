'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { extractId } from '@/utils/kebabCase';
import { useAppDataValue } from '@/hooks/useAppDataValue';
import { PanelSearchResult } from '@/components/PanelSearchResult';

const limit = 32;

export default function CountryMoviesPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params.slug as string;
  const current_page = Number(searchParams.get('page') ?? 1);
  const country_id = extractId(slug);
  const country = useAppDataValue('country', country_id);

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', slug, current_page],
    queryFn: () => searchMovies({ page: current_page, limit: limit, country_id: country_id }),
    placeholderData: (previousData) => previousData,
  });

  const { results = [], total_pages = 1, total_results = 0, page = 1 } = data?.data || {};

  return (
    <PanelSearchResult
      title={`Phim "${country}"`}
      movies={results}
      currentPage={current_page}
      totalPage={total_pages}
      isLoading={isLoading}
    />
  );
}
