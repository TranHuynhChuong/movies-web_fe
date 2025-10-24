'use client';

import React from 'react';
import { Button } from './ui/Button';
import { toKebabWithId } from '@/utils/kebabCase';
import { useRouter } from 'next/navigation';

type GenresListProps = {
  genres: { id: string; name: string }[];
  className?: string;
};

export const GenresList: React.FC<GenresListProps> = ({ genres, className = '' }) => {
  const router = useRouter();

  const baseBadgeClass =
    'rounded-md bg-white/10 text-center text-xs font-normal whitespace-nowrap text-white sm:text-sm w-fit py-1! px-1.5!';

  if (genres.length === 0) return null;
  return (
    <div className={`${className} flex flex-wrap gap-1 `}>
      {genres.map((genre, index) => {
        const link = toKebabWithId(genre.name, genre.id);
        return (
          <Button
            variant="ghost"
            key={genre.id + index}
            className={baseBadgeClass}
            onClick={() => router.push(`/the-loai/${link}`)}
          >
            {genre.name}
          </Button>
        );
      })}
    </div>
  );
};
