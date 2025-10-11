'use client';

import React from 'react';
import { SearchBar } from './SearchBar';
import { Logo } from './ui/Logo';
import { MenuToggle } from './MenuToggle';
import { Menu } from './Menu';
import { useAppData } from '@/contexts/AppDataContext';

export const Header = () => {
  const { genres, countries, loading } = useAppData();
  if (loading) {
    return (
      <header className="z-50 flex items-center justify-center flex-1 h-fit bg-bg-06 ">
        <nav className="relative flex items-center justify-between w-full h-16 px-4 pt-4 pb-3 max-w-9xl md:px-5">
          <div className="flex items-center h-full  w-fit">
            <Logo />
          </div>
          <SearchBar />
        </nav>
      </header>
    );
  }
  return (
    <header className="z-50 flex items-center justify-center flex-1 h-fit bg-bg-06 ">
      <nav className="relative flex items-center justify-between w-full h-16 px-4 pt-4 pb-3 max-w-9xl md:px-5">
        <div className="flex items-center h-full  w-fit">
          <MenuToggle genres={genres} countries={countries} />
          <Logo />
        </div>
        <Menu genres={genres} countries={countries} />
        <SearchBar />
      </nav>
    </header>
  );
};
