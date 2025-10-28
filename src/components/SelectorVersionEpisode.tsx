'use client';

import React, { useEffect, useState } from 'react';
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
  const initialEpisode = searchParams.get('ep') || undefined;

  const [activeVersion, setActiveVersion] = useState<string>(initialVersion);
  const [activeEpisode, setActiveEpisode] = useState<string | undefined>(initialEpisode);

  useEffect(() => {
    if (!versions || versions.length === 0) return;
    setActiveVersion(versions[0].id);
  }, [versions]);

  /** Cập nhật URL query */
  const updateQuery = (ver: string, ep: string) => {
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
  const handleChangeEpisode = (episode: string) => {
    if (episode === activeEpisode) return;
    setActiveEpisode(episode);
    updateQuery(activeVersion, episode);
  };

  if (!versions || versions.length === 0)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-4 text-gray-300">
          <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
          <h2 className="text-lg md:text-xl font-medium">Phim sẽ được cập nhật sớm...</h2>
        </div>
      </div>
    );

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
