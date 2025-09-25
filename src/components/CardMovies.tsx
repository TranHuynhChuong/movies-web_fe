'use client';
import React from 'react';
import { BadgeVersions } from './BadgeVersions';
import Link from 'next/link';
import { toKebabWithId } from '@/utils/kebabCase';
import { Movie } from '@/types/movies';
import Image from 'next/image';

type CardMoviesProps = {
  /**
   * Kiểu hiển thị card phim:
   * - "poster": hiển thị dạng đứng với poster (2/3).
   * - "backdrop": hiển thị dạng ngang với backdrop (16/9).
   * - "compact": nhỏ gọn, chỉ hiển thị tiêu đề.
   */
  variant?: 'poster' | 'backdrop' | 'compact';
  basePath?: string;
  movie: Movie;
};

export const CardMovies: React.FC<CardMoviesProps> = ({ variant, movie, basePath = '' }) => {
  switch (variant) {
    case 'poster':
      return <CardPoster movie={movie} basePath={basePath} />;
    case 'backdrop':
      return <CardBackdrop movie={movie} basePath={basePath} />;
    case 'compact':
      return <CardCompact movie={movie} basePath={basePath} />;
    default:
      return <CardBackdrop movie={movie} basePath={basePath} />;
  }
};

const CardPoster: React.FC<{ movie: Movie; basePath: string }> = ({ movie, basePath }) => {
  const link = toKebabWithId(movie.title, movie.id);

  return (
    <div className="flex flex-col flex-shrink-0 w-full gap-2 h-fit">
      <Link
        href={`${basePath}/phim/${link}`}
        className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-[2/3] group"
      >
        <Image
          src={movie.poster_path}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100" />
        <BadgeVersions data={{ media_type: movie.media_type, versions: movie.versions ?? [] }} />
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link
          href={`${basePath}/phim/${link}`}
          className="text-[13px] sm:text-sm font-medium line-clamp-1 hover:text-primary-dark"
        >
          {movie.title}
        </Link>
        <Link href={`${basePath}/phim/${link}`} className="text-xs font-normal text-gray">
          {movie.original_title}
        </Link>
      </div>
    </div>
  );
};

const CardBackdrop: React.FC<{ movie: Movie; basePath: string }> = ({ movie, basePath }) => {
  const link = toKebabWithId(movie.title, movie.id);
  return (
    <div className="flex flex-col items-center flex-shrink-0 w-full gap-3 shadow-lg h-fit ">
      <Link
        href={`${basePath}/phim/${link}`}
        className="relative w-full overflow-hidden rounded-md aspect-[16/9] group"
      >
        <Image
          src={movie.backdrop_path}
          alt={movie.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100" />
        <BadgeVersions
          data={{ media_type: movie.media_type, versions: movie.versions ?? [] }}
          className="xs:translate-x-0 xs:left-4"
          ignore={true}
        />
      </Link>
      <div className="flex flex-col items-start flex-1 w-full gap-1">
        <Link
          href={`${basePath}/phim/${link}`}
          className="text-[13px] sm:text-sm font-medium line-clamp-1 hover:text-primary-dark"
        >
          {movie.title}
        </Link>
        <Link href={`${basePath}/phim/${link}`} className="text-xs font-normal text-gray">
          {movie.original_title}
        </Link>
      </div>
    </div>
  );
};

const CardCompact: React.FC<{ movie: Movie; basePath: string }> = ({ movie, basePath }) => {
  const link = toKebabWithId(movie.title, movie.id);
  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`${basePath}/phim/${link}`}
        className="text-sm font-medium hover:text-primary-dark"
      >
        {movie.title}
      </Link>
      <span className="text-xs text-gray">{movie.original_title}</span>
    </div>
  );
};
