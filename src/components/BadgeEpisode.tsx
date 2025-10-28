import React from 'react';

type BadgeEpisodeProps = {
  numberOfEpisodes: number;
  currentEpisode: number;
  mediaType: string;
  ignore?: boolean;
  className?: string;
};

export const BadgeEpisode: React.FC<BadgeEpisodeProps> = ({
  numberOfEpisodes,
  currentEpisode,
  mediaType,
  ignore = false,
  className = '',
}) => {
  let badge = {
    label: '',
  };

  if (currentEpisode === 0) {
    badge.label = 'Upcoming';
  } else {
    if (mediaType === 'movie') {
      badge.label = 'Full';
    } else if (mediaType === 'series') {
      badge.label = currentEpisode + '/' + numberOfEpisodes;
    }
  }

  if (badge.label === '') return null;

  return (
    <>
      {/* Horizontal: sm trở lên */}
      <div
        className={`absolute top-full left-1/2 flex -translate-x-1/2 -translate-y-full overflow-hidden rounded-t-sm ${className}
          ${ignore ? 'flex' : 'hidden sm:flex'}`}
      >
        <span
          className={`px-2 py-1 font-bold text-2xs whitespace-nowrap rounded-t-sm text-white bg-gray-600/90`}
        >
          {badge.label}
        </span>
      </div>

      {/* Vertical: dưới sm */}
      <div
        className={`absolute left-1.5 bottom-1.5 flex flex-col gap-1 ${
          ignore ? 'hidden' : 'flex sm:hidden'
        }`}
      >
        <span
          className={`px-2 py-1 font-bold text-2xs whitespace-nowrap rounded-sm text-white bg-gray-600/90`}
        >
          {badge.label}
        </span>
      </div>
    </>
  );
};
