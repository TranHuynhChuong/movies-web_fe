'use client';

import { useEffect, useRef, useState } from 'react';
import { IconMenu } from './icon/IconMenu';
import { Menu } from './Menu';
import { usePathname } from 'next/navigation';

type MenuProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  genres?: { id: string; name: string }[] | [];
  countries?: { id: string; name: string }[] | [];
};

export const MenuToggle: React.FC<MenuProps> = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setOpen((prev) => !prev);
    }
  };

  // Click ngoài để đóng
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="h-full">
      <button
        ref={buttonRef}
        type="button"
        className={`${
          open ? 'rotate-180' : 'rotate-0'
        } h-full px-2 block lg:hidden rounded-lg hover:bg-white/10 cursor-pointer`}
        {...props}
        onClick={handleClick}
      >
        <IconMenu width={28} height={28} />
      </button>
      <div
        ref={dropdownRef}
        className={`${
          open ? 'block' : 'hidden'
        } absolute z-50 h-fit min-w-72 w-full max-w-100 xs:w-7/10 overflow-hidden gap-2 flex flex-col top-full left-0 bg-bg-05/90 xs:translate-x-4 lg:translate-x-5  rounded-lg shadow`}
      >
        <div className="w-full max-h-[80vh] scrollbar-sm overflow-auto  p-5">
          <Menu type="secondary" genres={props.genres} countries={props.countries} />
        </div>
      </div>
    </div>
  );
};
