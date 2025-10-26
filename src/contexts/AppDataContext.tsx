'use client';

import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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

  refetchAll: () => Promise<void>;
  refetchGenres: () => Promise<void>;
  refetchCountries: () => Promise<void>;
  refetchVersions: () => Promise<void>;
  refetchServers: () => Promise<void>;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = useQueryClient();

  // ----- Queries -----
  const { data: genres = [] } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenresList,
    staleTime: Infinity,
    select: (res) => res.data || [],
  });

  const { data: countries = [] } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountriesList,
    staleTime: Infinity,
    select: (res) => res.data || [],
  });

  const { data: versions = [] } = useQuery({
    queryKey: ['versions'],
    queryFn: getVersionList,
    staleTime: Infinity,
    select: (res) => res.data || [],
  });

  const { data: servers = [] } = useQuery({
    queryKey: ['servers'],
    queryFn: getServerList,
    staleTime: Infinity,
    select: (res) => res.data || [],
  });

  // ----- Refetch -----
  const refetchGenres = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['genres'] });
    return queryClient.fetchQuery({ queryKey: ['genres'], queryFn: getGenresList });
  }, [queryClient]);

  const refetchCountries = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['countries'] });
    return queryClient.fetchQuery({ queryKey: ['countries'], queryFn: getCountriesList });
  }, [queryClient]);

  const refetchVersions = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['versions'] });
    return queryClient.fetchQuery({ queryKey: ['versions'], queryFn: getVersionList });
  }, [queryClient]);

  const refetchServers = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['servers'] });
    return queryClient.fetchQuery({ queryKey: ['servers'], queryFn: getServerList });
  }, [queryClient]);

  const refetchAll = useCallback(async () => {
    await Promise.all([refetchGenres(), refetchCountries(), refetchVersions(), refetchServers()]);
  }, [refetchGenres, refetchCountries, refetchVersions, refetchServers]);

  // ----- Context value -----
  const value = useMemo(
    () => ({
      genres: genres || [],
      countries: countries || [],
      versions: versions || [],
      servers: servers || [],
      refetchAll,
      refetchGenres,
      refetchCountries,
      refetchVersions,
      refetchServers,
    }),
    [
      genres,
      countries,
      versions,
      servers,
      refetchAll,
      refetchGenres,
      refetchCountries,
      refetchVersions,
      refetchServers,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within an AppDataProvider');
  return context;
}
