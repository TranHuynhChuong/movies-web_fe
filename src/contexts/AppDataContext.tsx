'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCountriesList } from '@/services/country/get';
import { getGenresList } from '@/services/genre/get';
import { getYearList } from '@/services/year/get';

type Option = { id: string; value: string };

type AppDataContextType = {
  genres: Option[];
  countries: Option[];
  years: Option[];
  loading: boolean;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [genres, setGenres] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGenresList(), getCountriesList(), getYearList()])
      .then(([genresRes, countriesRes, yearsRes]) => {
        setGenres(genresRes || []);
        setCountries(countriesRes || []);
        setYears(yearsRes || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppDataContext.Provider value={{ genres, countries, years, loading }}>
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
