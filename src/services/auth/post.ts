import { AUTH_BASE_URL } from '@/libs/api';

export async function login(payload: any, role?: string) {
  const url = role === 'admin' ? `${AUTH_BASE_URL}/login-admin` : `${AUTH_BASE_URL}/login`;

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
