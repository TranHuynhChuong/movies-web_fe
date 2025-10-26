'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuthToken() {
  const { data: session } = useSession();
  const router = useRouter();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (!session?.accessToken || !session.expiresIn) {
      // Không có token → logout
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
      return;
    }

    const now = Date.now();
    if (now > session.expiresIn) {
      // Token hết hạn → logout
      signOut({ callbackUrl: '/admin-login' });
      setToken('');
      return;
    }

    setToken(session.accessToken);
  }, [session]);

  return token;
}
