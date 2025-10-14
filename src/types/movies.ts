export type Movie = {
  id: string;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  media_type: 'movie' | 'series';
  status: string;
  versions: Version[] | undefined;
  runtime: number | undefined;
  number_of_episodes: number | undefined;
  release_year: number | undefined;
  trailer_path: string | undefined;
  genres: { id: string; name: string }[] | undefined;
  overview: string | undefined;
  actors: string | undefined;
  directors: string | undefined;
  country: { id: string; name: string } | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
};

export type Version = {
  id: number;
  name: string;
  current_ep: number;
};

export type Episode = {
  episode_number: number;
  servers: Server[];
  version_id: number;
};

export type Server = {
  id: number;
  order: number;
  name: string;
  url: string;
};
