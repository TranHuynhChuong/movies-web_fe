'use client';

import React from 'react';
import { IconPlay } from '../icon/IconPlay';
import { useSearchBar } from '@/contexts/SearchBarContext';
import Link from 'next/link';

export const Logo: React.FC = () => {
  const { open } = useSearchBar();
  return (
    <div className={`${open ? 'hidden md:flex' : 'flex'} `}>
      <Link href={'/'} className="h-full w-fit flex items-center gap-2 pr-5">
        <div className="h-full aspect-square border-2 border-white rounded-full flex items-center justify-center p-1">
          <IconPlay width={16} height={16} />
        </div>
        <span className=" text-lg md:text-xl font-bold md:font-black">Tùy Tiện</span>
      </Link>
    </div>
  );
};
