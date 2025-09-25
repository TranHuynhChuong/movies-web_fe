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
