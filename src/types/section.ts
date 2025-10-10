import { Movie } from './movies';

export type MovieList = {
  id: string;
  name: string;
  type: string;
  order: number;
  movies: Movie[];
};
