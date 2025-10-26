'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/movie/get';
import { extractId } from '@/utils/kebabCase';
import { PanelSearchResult } from '@/components/PanelSearchResult';
import { useAppData } from '@/contexts/AppDataContext';
import { Suspense } from 'react';

const limit = 32;

function CountryMovies() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { countries } = useAppData();

  const slug = params.slug as string;
  const currentPage = Number(searchParams.get('page') ?? 1);
  const countryId = extractId(slug);
  const country = countries.find((c) => c.id === countryId)?.name;

  const { data, isLoading } = useQuery({
    queryKey: ['search_movies', slug, currentPage],
    queryFn: () => searchMovies({ page: currentPage, limit: limit, countryId: countryId }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000,
  });

  const { results = [], totalPages = 1, totalResults = 0, page = 1 } = data || {};

  return (
    <PanelSearchResult
      title={`Phim "${country}"`}
      movies={results}
      currentPage={currentPage}
      totalPage={totalPages}
      isLoading={isLoading}
    />
  );
}
export default function CountryMoviesPage() {
  return (
    <Suspense fallback={null}>
      <CountryMovies />
    </Suspense>
  );
}
