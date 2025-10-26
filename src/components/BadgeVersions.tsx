import { getVersionStatus } from '@/utils/getVersionStatus';
import React from 'react';

type BadgeVersionsProps = {
  data: {
    numberOfEpisodes: number;
    mediaType: string;
    versions: Version[];
  };
  ignore?: boolean;
  className?: string;
};

export const BadgeVersions: React.FC<BadgeVersionsProps> = ({
  data,
  ignore = false,
  className = '',
}) => {
  const badges =
    data.versions?.map((v) => getVersionStatus(data.numberOfEpisodes, data.mediaType, v)) || [];
  if (badges.length === 0) {
    badges.push({ label: 'Upcoming', isFull: false });
  }

  return (
    <>
      {/* Horizontal: sm trở lên */}
      <div
        className={`absolute top-full left-1/2 flex -translate-x-1/2 -translate-y-full overflow-hidden rounded-t-sm ${className}
          ${ignore ? 'flex' : 'hidden sm:flex'}`}
      >
        {badges.map((b, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 font-medium text-2xs whitespace-nowrap ${
              b.isFull
                ? 'bg-green-400 text-green-700'
                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}
          >
            {b.label}
          </span>
        ))}
      </div>

      {/* Vertical: dưới sm */}
      <div
        className={`absolute left-1.5 bottom-1.5 flex flex-col gap-1 ${
          ignore ? 'hidden' : 'flex sm:hidden'
        }`}
      >
        {badges.map((b, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 font-medium text-2xs whitespace-nowrap rounded-sm ${
              b.isFull
                ? 'bg-green-400 text-green-700'
                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}
          >
            {b.label}
          </span>
        ))}
      </div>
    </>
  );
};
