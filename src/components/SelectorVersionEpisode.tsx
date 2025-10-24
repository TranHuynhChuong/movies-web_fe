'use client';

import React, { useEffect, useState } from 'react';
import { Version } from '@/types/movies';
import { SelectorVersion } from './SelectorVersion';
import { SelectorEpisode } from './SelectorEpisode';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';

type SelectorVersionEpisodeProps = {
  mediaType: string;
  versions?: Version[];
};

export const SelectorVersionEpisode: React.FC<SelectorVersionEpisodeProps> = ({
  mediaType,
  versions,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug;

  const initialVersion = searchParams.get('ver') || '';
  const initialEpisode = Number(searchParams.get('ep')) || undefined;

  const [activeVersion, setActiveVersion] = useState<string>(initialVersion);
  const [activeEpisode, setActiveEpisode] = useState<number | undefined>(initialEpisode);

  useEffect(() => {
    if (!versions || versions.length === 0) return;
    setActiveVersion(versions[0].id);
  }, [versions]);

  console.log(versions);
  /** Cập nhật URL query */
  const updateQuery = (ver: string, ep: number) => {
    const params = new URLSearchParams();

    params.set('ver', ver);
    params.set('ep', String(ep));

    const query = params.toString();
    if (pathname.includes('xem-phim')) {
      router.replace(query ? `${pathname}?${query}` : pathname);
    } else {
      router.push(query ? `/xem-phim/${slug}?${query}` : `/xem-phim/${slug}`);
    }
  };

  const handleChangeVersion = (versionId: string) => {
    setActiveVersion(versionId);
    if (versionId === activeVersion) {
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
        activeVersion={activeVersion}
        onClick={handleChangeVersion}
      />
      <SelectorEpisode
        episodes={versions?.find((v) => v.id === activeVersion)?.episodes}
        activeEp={activeEpisode}
        mediaType={mediaType}
        onClick={handleChangeEpisode}
      />
    </div>
  );
};
