import { VERSION_BASE_URL } from '@/libs/api';

export async function getVersionList(force: boolean) {
  const res = await fetch(`${VERSION_BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
    cache: force ? 'no-store' : 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const data = await res.json();
  return data;
}
