'use client';

import React from 'react';
import { Button } from './ui/Button';
import { IconPlay } from './icon/IconPlay';

type EpisodeButtonProps = {
  ep: number;
  media_type: string;
  onClick: (ep: number) => void;
  active?: boolean;
};

const EpisodeButton: React.FC<EpisodeButtonProps> = ({
  ep,
  active = false,
  media_type,
  onClick,
}) => {
  const label = media_type === 'movie' ? 'Full' : `Tập ${ep}`;

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
  total_ep: number;
  media_type: string;
  onClick: (ep: number) => void;
  active_ep?: number;
};

export const SelectorEpisode: React.FC<SelectorEpisodeProps> = ({
  total_ep,
  media_type,
  active_ep,
  onClick,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: total_ep }, (_, idx) => {
        const ep = idx + 1;
        return (
          <EpisodeButton
            key={ep}
            ep={ep}
            media_type={media_type}
            active={ep === active_ep}
            onClick={() => onClick(ep)}
          />
        );
      })}
    </div>
  );
};
