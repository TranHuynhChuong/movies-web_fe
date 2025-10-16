import { API_BASE_URL } from '@/libs/api';

export async function getVersionList() {
  const res = await fetch(`${API_BASE_URL}/phien-ban`, {
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
