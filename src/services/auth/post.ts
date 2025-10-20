import { API_BASE_URL } from '@/libs/api';

export async function login(payload: any) {
  const url = `${API_BASE_URL}/auth`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  const data = await res.json();
  return data;
}
