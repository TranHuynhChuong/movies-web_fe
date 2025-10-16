import { API_BASE_URL } from '@/libs/api';

export async function getStats() {
  const res = await fetch(`${API_BASE_URL}/thong-ke`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }

  const data = await res.json();
  return data;
}
