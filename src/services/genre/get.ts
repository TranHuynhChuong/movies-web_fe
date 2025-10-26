import { GENRE_BASE_URL } from '@/libs/api';

export async function getGenresList() {
  const res = await fetch(`${GENRE_BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}
