type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  posterPath: string;
  backdropPath: string | undefined;
  mediaType: 'movie' | 'series';
  status: string;
  currentEpisode: number;
  versions: Version[] | undefined;
  runtime: number | undefined;
  numberOfEpisodes: number;
  releaseYear: number | undefined;
  trailerPath: string | undefined;
  genres: { id: string; name: string }[] | undefined;
  overview: string | undefined;
  actors: string | undefined;
  directors: string | undefined;
  countries: { id: string; name: string }[] | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

type Version = {
  id: string;
  name: string;
  episodes?: Episode[];
};

type Episode = {
  episodeName: string;
  streamingSources: StreamingSource[];
};

type StreamingSource = {
  serverId: string;
  orderIndex: number;
  url: string;
};
