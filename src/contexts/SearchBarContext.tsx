'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type SearchBarContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleOpen: () => void;
};

const SearchBarContext = createContext<SearchBarContextType | undefined>(undefined);

export function SearchBarProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggleOpen,
    }),
    [open]
  );

  return <SearchBarContext.Provider value={value}>{children}</SearchBarContext.Provider>;
}

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error('useSearchBar must be used inside SearchBarProvider');
  }
  return context;
}
