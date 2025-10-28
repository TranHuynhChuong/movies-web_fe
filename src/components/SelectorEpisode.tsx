'use client';

import React from 'react';
import { Button } from './ui/Button';
import { IconPlay } from './icon/IconPlay';

type EpisodeButtonProps = {
  ep: string;
  mediaType: string;
  onClick: (ep: string) => void;
  active?: boolean;
};

const EpisodeButton: React.FC<EpisodeButtonProps> = ({
  ep,
  active = false,
  mediaType,
  onClick,
}) => {
  const label = mediaType === 'movie' ? 'Full' : `Tập ${ep}`;

  return (
    <Button
      onClick={() => onClick(ep)}
      variant={active ? 'default' : 'ghost'}
      className="flex items-center justify-center w-full gap-2 py-4 text-sm font-normal rounded-md lg:text-base bg-bg-03"
    >
      <IconPlay />
      {label}
    </Button>
  );
};

type SelectorEpisodeProps = {
  episodes: Episode[] | undefined;
  mediaType: string;
  onClick: (ep: string) => void;
  activeEp?: string;
};

export const SelectorEpisode: React.FC<SelectorEpisodeProps> = ({
  episodes,
  mediaType,
  activeEp,
  onClick,
}) => {
  if (!episodes || episodes.length === 0) return null;
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6">
      {episodes.map((episode, index) => (
        <EpisodeButton
          key={episode.episodeName + '-' + index}
          ep={episode.episodeName}
          mediaType={mediaType}
          active={episode.episodeName === activeEp}
          onClick={() => onClick(episode.episodeName)}
        />
      ))}
    </div>
  );
};
