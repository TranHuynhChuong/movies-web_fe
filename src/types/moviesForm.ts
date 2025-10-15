type MovieFormData = {
  id?: string;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  media_type: 'movie' | 'series';
  status: 'show' | 'hide';
  runtime: number;
  number_of_episodes: number;
  release_year: number;
  trailer_path: string;
  genres: string[];
  overview: string;
  actors: string;
  directors: string;
  country: string;
  versions?: Versions[];
};

type Server = {
  server_id: string;
  order: number;
  url: string;
};

type Episode = {
  episode_number: number;
  servers: Server[];
};

type Versions = {
  version_id: string;
  episodes: Episode[];
};
