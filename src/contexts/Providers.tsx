'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBarProvider } from './SearchBarContext';
import { AppDataProvider } from './AppDataContext';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/ui/Toast';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppDataProvider>
          <ToastProvider>
            <SearchBarProvider>{children}</SearchBarProvider>
          </ToastProvider>
        </AppDataProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
