'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBarProvider } from './SearchBarContext';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchBarProvider>{children}</SearchBarProvider>
    </QueryClientProvider>
  );
}
