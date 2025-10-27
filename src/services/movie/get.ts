import { MOVIE_BASE_URL } from '@/libs/api';

export async function getMovieDetail(id: string) {
  const res = await fetch(`${MOVIE_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}

export async function searchMovies(params: {
  page: number;
  limit: number;
  title?: string;
  year?: string;
  genreId?: string;
  countryId?: string;
  mediaType?: string;
  releaseYear?: number;
  status?: string;
  sortBy?: string;
}) {
  const query = new URLSearchParams();
  query.append('page', params.page.toString());
  query.append('limit', params.limit.toString());
  if (params.title) query.append('title', params.title);
  if (params.year) query.append('year', params.year);
  if (params.genreId) query.append('genreId', params.genreId);
  if (params.countryId) query.append('countryId', params.countryId);
  if (params.releaseYear) query.append('releaseYear', params.releaseYear.toString());
  if (params.mediaType) query.append('mediaType', params.mediaType);
  query.append('status', params.status ?? 'show');
  if (params.sortBy) query.append('sortBy', params.sortBy);

  const url = `${MOVIE_BASE_URL}/search?${query.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}

export async function getTotals() {
  const url = `${MOVIE_BASE_URL}/total`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}
