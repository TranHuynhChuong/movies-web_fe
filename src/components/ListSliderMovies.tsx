'use client';
import React, { useEffect, useState } from 'react';
import { ImageMask } from './ui/ImageMask';
import { BadgeList } from './BadgeList';
import { LinkList } from './LinkList';
import { Button } from './ui/Button';
import { IconPlay } from './icon/IconPlay';
import { IconExclamationMark } from './icon/IconExclamationMark';
import Link from 'next/link';
import { toKebabWithId } from '@/utils/kebabCase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ListSliderMoviesProps = { movies: Movie[]; isLoading?: boolean };

export const ListSliderMovies: React.FC<ListSliderMoviesProps> = ({ movies, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  // Chuyển phim sau mỗi 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (isLoading || movies.length === 0) {
    return (
      <div className="relative flex justify-center w-full pb-28 h-[560px] bg-bg-04 animate-pulse">
        <div className="absolute inset-0 bg-gray-800/60" />
        <div className="absolute bottom-10 left-10 flex flex-col gap-4 w-2/3">
          <div className="h-10 w-3/4 bg-gray-700 rounded-lg" />
          <div className="h-6 w-1/2 bg-gray-700 rounded-lg" />
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-700 rounded-full" />
            <div className="h-10 w-32 bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="absolute bottom-10 right-10 flex gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="w-10 h-10 bg-gray-700 rounded-full border border-gray-600" />
          ))}
        </div>
      </div>
    );
  }

  const movie = movies[activeIndex];
  const link = toKebabWithId(movie.title, movie.id);

  return (
    <div className="relative flex justify-center w-full pb-28 h-fit bg-bg-04 sm:pb-0">
      <div className="relative w-full aspect-[16/9] max-h-[560px]">
        <Image
          src={movie.backdropPath ?? movie.posterPath}
          alt={movie.title}
          sizes="100vw"
          fill
          style={{
            objectFit: 'cover',
          }}
          priority
        />
        <ImageMask />
      </div>

      <div className="absolute bottom-0 left-0 flex flex-col items-center justify-end w-full h-full gap-2 px-8 md:justify-between xs:gap-3 md:items-end md:flex-row">
        {/* Nội dung */}
        <div className="flex flex-col space-y-6 md:basis-3/5 h-fit">
          <div className="w-full space-y-2 h-fit">
            <Link href={`/phim/${link}`}>
              <h3 className="text-xl font-extrabold text-center text-white line-clamp-2 md:text-4xl lg:text-6xl md:text-start">
                {movie.title}
              </h3>
            </Link>
            <Link href={`/phim/${link}`}>
              <h2 className="text-center line-clamp-1 md:line-clamp-2 md:text-lg text-primary md:text-start">
                {movie.originalTitle}
              </h2>
            </Link>
          </div>

          <div className="w-full space-y-2 md:space-y-4 h-fit">
            <BadgeList
              texts={[
                movie.releaseYear ? movie.releaseYear.toString() : 'N/A',
                movie.runtime ? movie.runtime.toString() + ' phút' : 'N/A',
                movie.mediaType === 'series' ? 'Tập ' + movie.numberOfEpisodes : 'Full',
              ]}
              className="justify-center md:justify-start"
            />
            <LinkList
              baseLink="the-loai"
              items={movie.genres ?? []}
              className="justify-center md:justify-start"
            />
          </div>

          <p className="!hidden text-sm text-white !line-clamp-3 !lg:flex">{movie.overview}</p>

          <div className="items-center hidden w-full gap-4 h-fit md:flex">
            <Button
              size="xl"
              className="flex items-center gap-2"
              onClick={() => router.push(`/xem-phim/${link}`)}
            >
              <IconPlay width={24} height={24} /> Xem Ngay
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="flex items-center !px-3"
              onClick={() => router.push(`/phim/${link}`)}
            >
              <IconExclamationMark width={24} height={24} />
            </Button>
          </div>
        </div>

        {/* Preview list */}
        <div className="relative flex items-center justify-center gap-2 w-fit h-fit flex-nowrap">
          {movies.map((m, idx) => (
            <button
              key={idx + m.id}
              onClick={() => setActiveIndex(idx)}
              className={`overflow-hidden relative border-2 rounded-full lg:rounded-lg cursor-pointer w-8 sm:w-10 lg:w-18 aspect-square lg:aspect-video border-white/50 hover:border-white ${
                activeIndex === idx ? 'border-white/100' : ''
              }`}
            >
              <Image
                src={m.backdropPath ?? m.posterPath}
                alt={m.title}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 2rem, (max-width: 1024px) 2.5rem, 3.5rem"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
