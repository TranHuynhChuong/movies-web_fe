import { API_BASE_URL } from '@/libs/api';

export async function addNew(payload: any, token?: string) {
  const url = `${API_BASE_URL}/genre/`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to add new genre');
  }

  const data = await res.json();
  return data;
}
