import { COUNTRY_BASE_URL } from '@/libs/api';

export async function getCountriesList(force: boolean) {
  const res = await fetch(`${COUNTRY_BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: false },
    cache: force ? 'no-store' : 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}
