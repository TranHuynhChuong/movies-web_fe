import { VERSION_BASE_URL } from '@/libs/api';

export async function update(id: string, payload: any, token?: string) {
  const url = `${VERSION_BASE_URL}/${id}`;

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
    throw new Error('Failed to update version');
  }

  const data = await res.json();
  return data;
}
