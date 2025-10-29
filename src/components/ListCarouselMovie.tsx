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
  const [itemCount, setItemCount] = useState(2); // default (mobile)

  useEffect(() => {
    const checkMedia = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        // lg
        setItemCount(variant === 'poster' ? 7 : 5);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        // md
        setItemCount(variant === 'poster' ? 5 : 3);
      } else {
        // sm
        setItemCount(variant === 'poster' ? 3 : 2);
      }
    };

    // chạy lần đầu
    checkMedia();

    // lắng nghe thay đổi khi resize
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, [variant]);

  if (isLoading || movies.length === 0) {
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
