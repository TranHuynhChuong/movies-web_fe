'use client';

import { Iframe } from './ui/Iframe';
import { SelectorStreamingSource } from './SelectorStreamingSource';
import { SelectorVersionEpisode } from './SelectorVersionEpisode';
import { useSearchParams } from 'next/navigation';
import { ButtonGoBack } from './ButtonGoBack';
import { getLink } from '@/utils/getLink';
import { useEffect, useState } from 'react';

type SectionVideoPlayProps = {
  movie: Movie;
};

export const SectionVideoPlay: React.FC<SectionVideoPlayProps> = ({ movie }) => {
  const searchParams = useSearchParams();

  const versionId = searchParams.get('ver');
  const episodeNumber = Number(searchParams.get('ep')) || 1;

  const [activeStreamingSource, setActiveStreamingSource] = useState<StreamingSource>();
  const [activeVersion, setActiveVersion] = useState<string>();

  useEffect(() => {
    if (!movie.versions?.length) return;
    setActiveVersion(versionId ?? movie.versions[0].id);
  }, [movie.versions, versionId]);

  useEffect(() => {
    if (!activeVersion) return;
    const version = movie.versions?.find((v) => v.id === activeVersion);
    const episode = version?.episodes?.[episodeNumber - 1];
    const firstSource = episode?.streamingSources?.[0];
    if (firstSource) {
      setActiveStreamingSource(firstSource);
    }
  }, [activeVersion, episodeNumber, movie.versions]);

  const handleChangeStreamingSource = (streamingSource: StreamingSource) => {
    setActiveStreamingSource(streamingSource);
  };

  return (
    <div className="w-full h-fit bg-bg-04 space-y-8">
      <div className="flex flex-col gap-4 mt-0 md:mt-5">
        <span className="flex items-center gap-2 text-white text-lg w-full px-5 md:px-8 order-2 md:order-1">
          <ButtonGoBack href={`${getLink('/phim', movie.title, movie.id)}`} />
          <h3 className="line-clamp-2 md:text-lg ">
            {movie.title}{' '}
            {movie.mediaType === 'series' &&
              ` - Tập${
                movie.versions?.find((v) => v.id === activeVersion)?.episodes?.[episodeNumber - 1]
                  ?.episodeNumber
              } `}
          </h3>
        </span>
        <div className="rounded-none md:rounded-lg overflow-hidden mx-0 md:mx-7 order-1 md:order-2">
          <Iframe title={movie.title} src={activeStreamingSource?.url} />
          <SelectorStreamingSource
            streamingSources={
              movie.versions?.find((v) => v.id === activeVersion)?.episodes?.[episodeNumber - 1]
                .streamingSources
            }
            onClick={handleChangeStreamingSource}
            activeStreamingSource={activeStreamingSource}
          />
        </div>
      </div>
      <div className="px-5 md:px-7">
        <SelectorVersionEpisode mediaType={movie.mediaType} versions={movie.versions} />
      </div>
    </div>
  );
};
