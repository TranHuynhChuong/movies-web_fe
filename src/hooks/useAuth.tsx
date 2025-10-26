'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useAuthToken() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<{ id: string; username: string; role: string } | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.accessToken || !session?.expiresIn) {
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
      setUser(null);
      return;
    }

    const now = Date.now();
    if (now < session.expiresIn) {
      setToken(session.accessToken);
      setUser(session.user);
    } else {
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
    }
  }, [session, status]);

  return { user, token };
}
