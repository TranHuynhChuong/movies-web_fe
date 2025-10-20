'use client';

import { Movie, StreamingSource } from '@/types/movies';
import { Iframe } from './ui/Iframe';
import { useEffect, useState } from 'react';
import { SelectorStreamingSource } from './SelectorStreamingSource';
import { SelectorVersionEpisode } from './SelectorVersionEpisode';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getMovieWatchInf } from '@/services/movie/get';
import { ButtonGoBack } from './ButtonGoBack';
import { getLink } from '@/utils/getLink';

type SectionVideoPlayProps = {
  movie: Movie;
};

export const SectionVideoPlay: React.FC<SectionVideoPlayProps> = ({ movie }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const version_id = Number(searchParams.get('ver')) || 1;
  const episode_number = Number(searchParams.get('ep')) || 1;
  const server_order = Number(searchParams.get('ser')) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie-watch', movie.id, version_id, episode_number],
    queryFn: () => getMovieWatchInf(movie.id, version_id, episode_number),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const [activeStreamingSource, setActiveStreamingSource] = useState<StreamingSource | undefined>();

  useEffect(() => {
    if (isError) router.back();
  }, [isError, router]);

  const episode = data?.data;

  useEffect(() => {
    if (episode?.streaming_sources?.length) {
      const defaultServer =
        episode.streaming_sources.find((ss: any) => ss.order === server_order) ??
        episode.streaming_sources[0];
      setActiveStreamingSource(defaultServer);
    }
  }, [episode]);

  const pathname = usePathname();

  if (isLoading || !episode || !activeStreamingSource) return null;

  const updateQuery = (ser: number) => {
    const params = new URLSearchParams();
    params.set('ser', ser.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeServer = (streaming_source: StreamingSource) => {
    setActiveStreamingSource(streaming_source);
    updateQuery(streaming_source.order);
  };

  return (
    <div className="w-full h-fit bg-bg-04 space-y-8">
      <div className="flex flex-col gap-4 mt-0 md:mt-5">
        <span className="flex items-center gap-2 text-white text-lg w-full px-5 md:px-8 order-2 md:order-1">
          <ButtonGoBack href={`${getLink('/phim', movie.title, movie.id)}`} />
          <h3 className="line-clamp-2 md:text-lg ">
            {movie.title} {movie.media_type === 'series' && ` - Tập ${episode.episode_number}`}
          </h3>
        </span>
        <div className="rounded-none md:rounded-lg overflow-hidden mx-0 md:mx-7 order-1 md:order-2">
          <Iframe title={movie.title} src={activeStreamingSource.url} />
          <SelectorStreamingSource
            streaming_sources={episode.streaming_sources}
            onClick={handleChangeServer}
            active_server={activeStreamingSource}
          />
        </div>
      </div>
      <div className="px-5 md:px-7">
        <SelectorVersionEpisode
          media_type={movie.media_type}
          versions={movie.versions}
          episode={episode}
        />
      </div>
    </div>
  );
};
