'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useAuthToken() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.accessToken || !session?.expiresIn) {
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
      return;
    }

    const now = Date.now();
    if (now < session.expiresIn) {
      setToken(session.accessToken);
    } else {
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
    }
  }, [session, status]);

  return token;
}
