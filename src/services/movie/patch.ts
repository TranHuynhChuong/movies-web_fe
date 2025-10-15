import { API_BASE_URL } from '@/libs/api';

export async function update(id: string, payload: MovieFormData) {
  const url = `${API_BASE_URL}/phim/${id}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to update movie');
  }

  const { data } = await res.json();
  return data;
}
