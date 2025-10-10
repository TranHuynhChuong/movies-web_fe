import { API_BASE_URL } from '@/libs/api';

export async function getMovieInf(id: string) {
  const res = await fetch(`${API_BASE_URL}/phim/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const { data } = await res.json();
  return data;
}

export async function getMovieWatchInf(id: string, version_id: number, episode_number: number) {
  const res = await fetch(`${API_BASE_URL}/xem-phim/${id}?ver=${version_id}&ep=${episode_number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const { data } = await res.json();
  return data;
}

export async function getMovieList() {
  const url = `${API_BASE_URL}/phim/danh-sach`;

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

  const { data } = await res.json();
  return data;
}

export async function searchMovies(params: {
  page: number;
  limit: number;
  title?: string;
  year?: string;
  genre_id?: string;
  country_id?: string;
  media_type?: string;
  new?: string;
}) {
  const query = new URLSearchParams();
  query.append('page', params.page.toString());
  query.append('limit', params.limit.toString());
  if (params.title) query.append('title', params.title);
  if (params.year) query.append('year', params.year);
  if (params.genre_id) query.append('genre_id', params.genre_id);
  if (params.country_id) query.append('country_id', params.country_id);
  if (params.media_type) query.append('media_type', params.media_type);
  if (params.new) query.append('new', params.new);

  const url = `${API_BASE_URL}/phim/tim-kiem?${query.toString()}`;

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

  const { data } = await res.json();
  return data;
}
