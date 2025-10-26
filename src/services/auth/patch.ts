import { AUTH_BASE_URL } from '@/libs/api';

export async function updateAccount(id: string, payload: any, token?: string) {
  const url = `${AUTH_BASE_URL}/account/${id}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  const data = await res.json();
  return data;
}
