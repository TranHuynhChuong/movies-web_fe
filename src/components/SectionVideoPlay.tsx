'use client';

import { Episode, Movie, Server } from '@/types/movies';
import { Iframe } from './ui/Iframe';
import { useEffect, useState } from 'react';
import { SelectorServer } from './SelectorServer';
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

  const {
    data: episode,
    isLoading,
    isError,
  } = useQuery<Episode, Error>({
    queryKey: ['movie-watch', movie.id, version_id, episode_number],
    queryFn: () => getMovieWatchInf(movie.id, version_id, episode_number),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const [activeServer, setActiveServer] = useState<Server | undefined>();

  useEffect(() => {
    if (isError) router.back();
  }, [isError, router]);

  useEffect(() => {
    if (episode?.servers?.length) {
      const defaultServer =
        episode.servers.find((ser) => ser.order === server_order) ?? episode.servers[0];
      setActiveServer(defaultServer);
    }
  }, [episode]);

  const pathname = usePathname();

  if (isLoading || !episode || !activeServer) return null;

  const updateQuery = (ser: number) => {
    const params = new URLSearchParams();
    params.set('ser', ser.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeServer = (server: Server) => {
    setActiveServer(server);
    updateQuery(server.order);
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
          <Iframe title={movie.title} src={activeServer.url} />
          <SelectorServer
            servers={episode.servers}
            onClick={handleChangeServer}
            active_server={activeServer}
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
