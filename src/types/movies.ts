export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  posterPath: string;
  backdropPath: string;
  mediaType: 'movie' | 'series';
  status: string;
  versions: Version[] | undefined;
  runtime: number | undefined;
  numberOfEpisodes: number | undefined;
  releaseYear: number | undefined;
  trailerPath: string | undefined;
  genres: { id: string; name: string }[] | undefined;
  overview: string | undefined;
  actors: string | undefined;
  directors: string | undefined;
  country: { id: string; name: string } | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export type Version = {
  id: string;
  name: string;
  currentEp: number;
  episodes?: Episode[];
};

export type Episode = {
  episodeNumber: number;
  streamingSources: StreamingSource[];
};

export type StreamingSource = {
  serverId: string;
  orderIndex: number;
  url: string;
};
