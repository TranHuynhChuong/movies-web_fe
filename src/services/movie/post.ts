import { API_BASE_URL } from '@/libs/api';

export async function addNew(payload: MovieFormData) {
  const url = `${API_BASE_URL}/phim/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // Gửi dữ liệu ở đây
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to add new movie');
  }

  const { data } = await res.json();
  return data;
}
