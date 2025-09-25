'use client';

import React, { useEffect, useState } from 'react';
import { Episode, Version } from '@/types/movies';
import { SelectorVersion } from './SelectorVersion';
import { SelectorEpisode } from './SelectorEpisode';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';

type SelectorVersionEpisodeProps = {
  media_type: string;
  versions?: Version[];
  episode?: Episode;
};

export const SelectorVersionEpisode: React.FC<SelectorVersionEpisodeProps> = ({
  media_type,
  versions,
  episode,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug;

  const initialVersion = Number(searchParams.get('ver')) || undefined;
  const initialEpisode = Number(searchParams.get('ep')) || undefined;

  const [activeVersion, setActiveVersion] = useState<number>(initialVersion ?? 1);
  const [activeEpisode, setActiveEpisode] = useState<number | undefined>(initialEpisode);

  useEffect(() => {
    if (!episode) return;
    setActiveVersion(episode.version_id);
    setActiveEpisode(episode.episode_number);
  }, [episode?.version_id, episode?.episode_number]);

  /** Cập nhật URL query */
  const updateQuery = (ver: number, ep: number) => {
    const params = new URLSearchParams();

    params.set('ver', String(ver));
    params.set('ep', String(ep));

    if (pathname.includes('xem-phim')) router.replace(`${pathname}?${params.toString()}`);
    else router.push(`/xem-phim/${slug}?${params.toString()}`);
  };

  const handleChangeVersion = (version: number) => {
    setActiveVersion(version);
    if (version === activeVersion) {
      setActiveEpisode(initialEpisode);
    } else {
      setActiveEpisode(undefined);
    }
  };
  const handleChangeEpisode = (episode: number) => {
    if (episode === activeEpisode) return;
    setActiveEpisode(episode);
    updateQuery(activeVersion, episode);
  };

  return (
    <div className="w-full h-fit space-y-4">
      <h2 className="text-lg md:text-xl text-white font-medium">Tập phim</h2>
      <SelectorVersion
        versions={versions}
        active_version={activeVersion}
        onClick={handleChangeVersion}
      />
      <SelectorEpisode
        total_ep={versions?.find((ver) => ver.id === activeVersion)?.current_ep ?? 0}
        active_ep={activeEpisode}
        media_type={media_type}
        onClick={handleChangeEpisode}
      />
    </div>
  );
};
