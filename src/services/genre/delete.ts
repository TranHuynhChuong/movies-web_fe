import { GENRE_BASE_URL } from '@/libs/api';

export async function remove(id: string, token?: string) {
  const url = `${GENRE_BASE_URL}/${id}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'DELETE',
    headers: headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to delete genre');
  }

  const data = await res.json();
  return data;
}
