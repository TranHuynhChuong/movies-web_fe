import React from 'react';
import { SearchBar } from './SearchBar';
import { Logo } from './ui/Logo';
import { MenuToggle } from './MenuToggle';
import { Menu } from './Menu';
import { getCountriesList } from '@/services/country/get';
import { getGenresList } from '@/services/genre/get';
import { getYearList } from '@/services/year/get';

async function fetchGenresList(): Promise<{ id: string; value: string }[] | []> {
  try {
    const data = await getGenresList();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchCountriesList(): Promise<{ id: string; value: string }[] | []> {
  try {
    const data = await getCountriesList();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchYearsList(): Promise<{ id: string; value: string }[] | []> {
  try {
    const data = await getYearList();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const Header = async () => {
  const [genres, countries, years] = await Promise.all([
    fetchGenresList(),
    fetchCountriesList(),
    fetchYearsList(),
  ]);

  return (
    <header className="z-50 flex items-center justify-center flex-1 h-fit bg-bg-06 ">
      <nav className="relative flex items-center justify-between w-full h-16 px-4 pt-4 pb-3 max-w-9xl md:px-5">
        <div className="flex items-center h-full gap-4 w-fit">
          <MenuToggle genres={genres} countries={countries} years={years} />
          <Logo />
        </div>
        <Menu genres={genres} countries={countries} years={years} />
        <SearchBar />
      </nav>
    </header>
  );
};
