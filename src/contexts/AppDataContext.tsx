'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
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

  refetchAll: (force?: boolean) => Promise<void>;
  refetchGenres: (force?: boolean) => Promise<void>;
  refetchCountries: (force?: boolean) => Promise<void>;
  refetchVersions: (force?: boolean) => Promise<void>;
  refetchServers: (force?: boolean) => Promise<void>;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [genres, setGenres] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [versions, setVersions] = useState<Option[]>([]);
  const [servers, setServers] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGenres = useCallback(async (force = false) => {
    const res = await getGenresList(force);
    setGenres(res.data || []);
  }, []);

  /** 🔹 Tải danh sách quốc gia */
  const fetchCountries = useCallback(async (force = false) => {
    const res = await getCountriesList(force);
    setCountries(res.data || []);
  }, []);

  /** 🔹 Tải danh sách phiên bản (version) */
  const fetchVersions = useCallback(async (force = false) => {
    const res = await getVersionList(force);
    setVersions(res.data || []);
  }, []);

  /** 🔹 Tải danh sách server */
  const fetchServers = useCallback(async (force = false) => {
    const res = await getServerList(force);
    setServers(res.data || []);
  }, []);

  /** 🔹 Tải lại toàn bộ dữ liệu */
  const fetchAll = useCallback(
    async (force = false) => {
      setLoading(true);
      try {
        await Promise.all([
          fetchGenres(force),
          fetchCountries(force),
          fetchVersions(force),
          fetchServers(force),
        ]);
      } catch (error) {
        console.error('Lỗi khi tải AppData:', error);
      } finally {
        setLoading(false);
      }
    },
    [fetchGenres, fetchCountries, fetchVersions, fetchServers]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const value = useMemo(
    () => ({
      genres,
      countries,
      versions,
      servers,
      loading,
      refetchAll: fetchAll,
      refetchGenres: fetchGenres,
      refetchCountries: fetchCountries,
      refetchVersions: fetchVersions,
      refetchServers: fetchServers,
    }),
    [
      genres,
      countries,
      versions,
      servers,
      loading,
      fetchAll,
      fetchGenres,
      fetchCountries,
      fetchVersions,
      fetchServers,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
