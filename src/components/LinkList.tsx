'use client';

import React from 'react';
import { Button } from './ui/Button';
import { toKebabWithId } from '@/utils/kebabCase';
import { useRouter } from 'next/navigation';

type LinkListProps = {
  items: { id: string; name: string }[];
  baseLink: string;
  className?: string;
};

export const LinkList: React.FC<LinkListProps> = ({ items, baseLink, className = '' }) => {
  const router = useRouter();

  const baseBadgeClass =
    'rounded-md bg-white/10 text-center text-xs font-normal whitespace-nowrap text-white sm:text-sm w-fit py-1! px-1.5!';

  if (items.length === 0) return null;
  return (
    <div className={`${className} flex flex-wrap gap-1 `}>
      {items.map((genre, index) => {
        const link = toKebabWithId(genre.name, genre.id);
        return (
          <Button
            variant="ghost"
            key={genre.id + index}
            className={baseBadgeClass}
            onClick={() => router.push(`/${baseLink}/${link}`)}
          >
            {genre.name}
          </Button>
        );
      })}
    </div>
  );
};
