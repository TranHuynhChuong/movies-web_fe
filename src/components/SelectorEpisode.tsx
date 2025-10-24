'use client';

import React from 'react';
import { Button } from './ui/Button';
import { IconPlay } from './icon/IconPlay';

type EpisodeButtonProps = {
  ep: number;
  mediaType: string;
  onClick: (ep: number) => void;
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
  onClick: (ep: number) => void;
  activeEp?: number;
};

export const SelectorEpisode: React.FC<SelectorEpisodeProps> = ({
  episodes,
  mediaType,
  activeEp,
  onClick,
}) => {
  if (!episodes || episodes.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {episodes.map((episode, index) => (
        <EpisodeButton
          key={episode.episodeNumber + '-' + index}
          ep={episode.episodeNumber}
          mediaType={mediaType}
          active={episode.episodeNumber === activeEp}
          onClick={() => onClick(episode.episodeNumber)}
        />
      ))}
    </div>
  );
};
