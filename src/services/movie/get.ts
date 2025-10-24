import { MOVIE_BASE_URL } from '@/libs/api';

export async function getMovieInf(id: string) {
  const res = await fetch(`${MOVIE_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 5 },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}

export async function getMovieDetail(id: string) {
  const res = await fetch(`${MOVIE_BASE_URL}/detail/${id}`, {
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

export async function getMovieWatchInf(id: string, version_id: number, episode_number: number) {
  const res = await fetch(`${MOVIE_BASE_URL}/watch/${id}?ver=${version_id}&ep=${episode_number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 5 },
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
  if (params.status) query.append('status', params.status);
  if (params.sortBy) query.append('sortBy', params.sortBy);

  const url = `${MOVIE_BASE_URL}/search?${query.toString()}`;

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
