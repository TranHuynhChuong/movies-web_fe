'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCountriesList } from '@/services/country/get';
import { getGenresList } from '@/services/genre/get';

type Option = { id: string; value: string };

type AppDataContextType = {
  genres: Option[];
  countries: Option[];
  loading: boolean;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [genres, setGenres] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGenresList(), getCountriesList()])
      .then(([genresRes, countriesRes]) => {
        setGenres(genresRes || []);
        setCountries(countriesRes || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppDataContext.Provider value={{ genres, countries, loading }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
