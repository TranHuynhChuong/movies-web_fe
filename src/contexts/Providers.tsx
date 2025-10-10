'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBarProvider } from './SearchBarContext';
import { AppDataProvider } from './AppDataContext';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppDataProvider>
        <SearchBarProvider>{children}</SearchBarProvider>
      </AppDataProvider>
    </QueryClientProvider>
  );
}
