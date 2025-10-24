type MovieFormData = {
  id?: string;
  title: string;
  originalTitle: string;
  posterPath: string;
  backdropPath: string;
  mediaType: 'movie' | 'series';
  status: 'show' | 'hide';
  runtime: number;
  numberOfEpisodes: number;
  releaseYear: number;
  trailerPath: string;
  genres: { id: string; name: string }[];
  overview: string;
  actors: string;
  directors: string;
  country: string;
  versions?: Versions[];
};

type StreamingSource = {
  serverId: string;
  orderIndex: number;
  url: string;
};

type Episode = {
  episodeNumber: number;
  streamingSources: StreamingSource[];
};

type Versions = {
  id: string;
  episodes: Episode[];
};
