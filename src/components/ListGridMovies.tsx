import React from 'react';
import { CardMovies } from './CardMovies';
import { Movie } from '@/types/movies';

type ListGridMoviesProps = {
  movies: Movie[];
};

export const ListGridMovies: React.FC<ListGridMoviesProps> = ({ movies }) => {
  return (
    <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 overflow-hidden xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8">
      {movies.map((movie, index) => (
        <CardMovies key={index + movie.id} movie={movie} />
      ))}
    </div>
  );
};
