'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCountriesList } from '@/services/country/get';
import { getGenresList } from '@/services/genre/get';
import { getVersionList } from '@/services/version/get';
import { getServerList } from '@/services/server/get';
import { Option } from '@/types/utils';

type AppDataContextType = {
  genres: Option[];
  countries: Option[];
  versions: Option[];
  servers: Option[];
  loading: boolean;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [genres, setGenres] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [versions, setVersions] = useState<Option[]>([]);
  const [servers, setServers] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGenresList(), getCountriesList(), getVersionList(), getServerList()])
      .then(([genresRes, countriesRes, versionsRes, serversRes]) => {
        setGenres(genresRes.data || []);
        setCountries(countriesRes.data || []);
        setVersions(versionsRes.data || []);
        setServers(serversRes.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppDataContext.Provider value={{ genres, countries, versions, servers, loading }}>
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
