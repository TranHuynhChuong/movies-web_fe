'use client';

import { SearchBarProvider } from './SearchBarContext';

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SearchBarProvider>{children}</SearchBarProvider>;
}
