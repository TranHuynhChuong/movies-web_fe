import { STATS_BASE_URL } from '@/libs/api';

export async function getStats() {
  const res = await fetch(`${STATS_BASE_URL}`, {
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
