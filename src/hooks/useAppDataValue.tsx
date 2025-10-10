'use client';

import { useAppData } from '@/contexts/AppDataContext';

export function useAppDataValue(type: 'genre' | 'country', id?: string) {
  const { genres, countries } = useAppData();

  if (!id) return undefined;

  switch (type) {
    case 'genre':
      return genres.find((item) => item.id === id)?.value;
    case 'country':
      return countries.find((item) => item.id === id)?.value;
    default:
      return undefined;
  }
}
