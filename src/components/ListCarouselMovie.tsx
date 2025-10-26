'use client';

import React, { useEffect, useState } from 'react';
import Carousel from './ui/Carousel';
import { CardMovies } from './CardMovies';

type ListCarouselMovieProps = {
  movies: Movie[];
  className?: string;
  variant?: 'poster' | 'backdrop';
  isLoading?: boolean;
  basePath?: string;
};

export const ListCarouselMovie: React.FC<ListCarouselMovieProps> = ({
  movies,
  variant,
  className,
  isLoading,
  basePath,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // chỉ set true khi client render xong
    setIsMounted(true);
  }, []);

  if (isLoading || !isMounted) {
    const itemCount = variant === 'poster' ? 7 : 5;
    return (
      <div className={`flex gap-4 overflow-hidden ${className ?? ''}`}>
        {Array.from({ length: itemCount }).map((_, idx) => (
          <CardMovies key={`skeleton-${idx}`} variant={variant} basePath={basePath} />
        ))}
      </div>
    );
  }

  let breakpoints;
  const spaceBetween = 14;

  switch (variant) {
    case 'poster':
      breakpoints = {
        0: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
        1440: { slidesPerView: 7 },
        1536: { slidesPerView: 8 },
      };
      break;

    case 'backdrop':
      breakpoints = {
        0: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1536: { slidesPerView: 6 },
      };
      break;

    default:
      breakpoints = {
        0: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      };
      break;
  }

  return (
    <Carousel
      spaceBetween={spaceBetween}
      loop={false}
      breakpoints={breakpoints}
      className={className}
    >
      {movies.map((movie, i) => (
        <CardMovies key={i + '' + movie.id} movie={movie} variant={variant}></CardMovies>
      ))}
    </Carousel>
  );
};
