import React from 'react';
import { CardMovies } from './CardMovies';

type ListGridMoviesProps = {
  movies: Movie[];
  isLoading?: boolean;
  basePath?: string;
  variant?: 'poster' | 'backdrop' | 'compact';
};

export const ListGridMovies: React.FC<ListGridMoviesProps> = ({
  movies,
  isLoading,
  basePath,
  variant = 'poster',
}) => {
  const totalSkeleton = 32;

  const renderItems = isLoading
    ? Array.from({ length: totalSkeleton }).map((_, i) => (
        <CardMovies key={`skeleton-${i}`} variant={variant} basePath={basePath} />
      ))
    : movies.map((movie, index) => (
        <CardMovies
          key={movie.id + '' + index}
          movie={movie}
          variant={variant}
          basePath={basePath}
        />
      ));

  return (
    <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {renderItems}
    </div>
  );
};
