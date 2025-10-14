'use client';

import { useAppData } from '@/contexts/AppDataContext';

export function useAppDataValue(type: 'genre' | 'country' | 'version' | 'server', id?: string) {
  const { genres, countries, versions, servers } = useAppData();

  if (!id) return undefined;

  switch (type) {
    case 'genre':
      return genres.find((item) => item.id === id)?.name;
    case 'country':
      return countries.find((item) => item.id === id)?.name;
    case 'version':
      return versions.find((item) => item.id === id)?.name;
    case 'server':
      return servers.find((item) => item.id === id)?.name;
    default:
      return undefined;
  }
}
