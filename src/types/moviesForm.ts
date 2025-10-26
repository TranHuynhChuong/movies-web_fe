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
  country: { id: string; name: string };
  versions?: VersionsFormData[];
};

type StreamingSourceFormData = {
  serverId: string;
  orderIndex: number;
  url: string;
};

type EpisodeFormData = {
  episodeNumber: number;
  streamingSources: StreamingSourceFormData[];
};

type VersionsFormData = {
  id: string;
  episodes: EpisodeFormData[];
};
