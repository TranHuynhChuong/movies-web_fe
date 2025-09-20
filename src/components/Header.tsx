import React from 'react';
import { SearchBar } from './SearchBar';
import { Logo } from './ui/Logo';
import { MenuToggle } from './MenuToggle';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  return (
    <header className="flex-1 flex h-fit bg-bg-06 items-center justify-center ">
      <nav className="flex w-full max-w-8xl h-16 items-center justify-between px-4 md:px-5 pb-3 pt-4  relative">
        <div className="flex gap-4 items-center h-full w-fit">
          <MenuToggle />
          <Logo />
        </div>
        <Menu />
        <SearchBar />
      </nav>
    </header>
  );
};
