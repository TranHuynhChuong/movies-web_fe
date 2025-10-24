import { MOVIE_BASE_URL } from '@/libs/api';

export async function addNew(payload: MovieFormData, token?: string) {
  const url = `${MOVIE_BASE_URL}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to add new movie');
  }

  const data = await res.json();
  return data;
}
