'use client';
import React from 'react';
import { BadgeEpisode } from './BadgeEpisode';
import Link from 'next/link';
import { toKebabWithId } from '@/utils/kebabCase';
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
  movie?: Movie;
};

export const CardMovies: React.FC<CardMoviesProps> = ({ variant, movie, basePath = '/phim' }) => {
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

const CardPoster: React.FC<{ movie?: Movie; basePath: string }> = ({ movie, basePath }) => {
  if (!movie) {
    return (
      <div className="flex flex-col w-full gap-2 animate-pulse">
        <div className="w-full aspect-[2/3] rounded-lg bg-gray-300/30" />
        <div className="h-3 w-3/4 bg-gray-300/30 rounded" />
        <div className="h-2 w-1/2 bg-gray-300/20 rounded" />
      </div>
    );
  }

  const link = basePath + '/' + toKebabWithId(movie.title, movie.id);
  return (
    <div className="flex flex-col flex-shrink-0 w-full gap-2 h-fit">
      <Link
        href={`${link}`}
        className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-[2/3] group"
      >
        <Image
          src={movie.posterPath}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100" />
        <BadgeEpisode
          numberOfEpisodes={movie.numberOfEpisodes}
          mediaType={movie.mediaType}
          currentEpisode={movie.currentEpisode}
        />
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link
          href={`${link}`}
          className="text-[13px] sm:text-sm font-medium line-clamp-1 hover:text-primary-dark"
        >
          {movie.title}
        </Link>
        <Link href={`${link}`} className="text-xs font-normal text-gray line-clamp-1">
          {movie.originalTitle}
        </Link>
      </div>
    </div>
  );
};

const CardBackdrop: React.FC<{ movie?: Movie; basePath: string }> = ({ movie, basePath }) => {
  if (!movie) {
    return (
      <div className="flex flex-col w-full gap-2 animate-pulse">
        <div className="w-full aspect-[16/9] rounded-md bg-gray-300/30" />
        <div className="h-3 w-3/4 bg-gray-300/30 rounded" />
        <div className="h-2 w-1/2 bg-gray-300/20 rounded" />
      </div>
    );
  }
  const link = basePath + '/' + toKebabWithId(movie.title, movie.id);
  return (
    <div className="flex flex-col items-center flex-shrink-0 w-full gap-3 shadow-lg h-fit ">
      <Link
        href={`${link}`}
        className="relative w-full overflow-hidden rounded-md aspect-[16/9] group"
      >
        <Image
          src={movie.backdropPath ?? movie.posterPath}
          alt={movie.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100" />
        <BadgeEpisode
          numberOfEpisodes={movie.numberOfEpisodes}
          mediaType={movie.mediaType}
          currentEpisode={movie.currentEpisode}
          className="xs:translate-x-0 xs:left-2"
        />
      </Link>
      <div className="flex flex-col items-start flex-1 w-full gap-1">
        <Link
          href={`${link}`}
          className="text-[13px] sm:text-sm font-medium line-clamp-1 hover:text-primary-dark"
        >
          {movie.title}
        </Link>
        <Link href={`${link}`} className="text-xs font-normal text-gray line-clamp-1">
          {movie.originalTitle}
        </Link>
      </div>
    </div>
  );
};

const CardCompact: React.FC<{ movie?: Movie; basePath: string }> = ({ movie, basePath }) => {
  if (!movie) {
    return (
      <div className="flex flex-col gap-1 animate-pulse">
        <div className="h-3 w-3/4 bg-gray-300/30 rounded" />
        <div className="h-2 w-1/2 bg-gray-300/20 rounded" />
      </div>
    );
  }
  const link = basePath + '/' + toKebabWithId(movie.title, movie.id);
  return (
    <div className="flex flex-col gap-1">
      <Link href={`${link}`} className="text-sm font-medium hover:text-primary-dark line-clamp-1">
        {movie.title}
      </Link>
      <span className="text-xs text-gray line-clamp-1">{movie.originalTitle}</span>
    </div>
  );
};
