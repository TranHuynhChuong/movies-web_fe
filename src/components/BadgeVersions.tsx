import { Version } from '@/types/movies';
import React from 'react';

type BadgeVersionsProps = {
  data: {
    media_type: string;
    versions: Version[];
  };
  ignore?: boolean; // nếu true, mobile vẫn giữ kiểu desktop
  className?: string;
};

const getShortLabel = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('.');
};

export const BadgeVersions: React.FC<BadgeVersionsProps> = ({
  data,
  ignore = false,
  className = '',
}) => {
  const isUpcoming = !data.versions || data.versions.length === 0;

  const getBadges = () => {
    if (isUpcoming) {
      return [{ label: 'Upcoming', text: '', bg: 'bg-white', color: 'text-black' }];
    }

    const badges: { label: string; text: string; bg: string; color: string }[] = [];

    if (data.media_type === 'movies') {
      data.versions?.forEach((v) => {
        badges.push({
          label: getShortLabel(v.name),
          text: '',
          bg: 'bg-bg-01',
          color: 'text-white',
        });
      });
    } else if (data.media_type === 'series') {
      data.versions?.forEach((v) => {
        badges.push({
          label: getShortLabel(v.name),
          text: v.current_ep.toString(),
          bg: 'bg-bg-01',
          color: 'text-white',
        });
      });
    }

    return badges;
  };

  const badges = getBadges();

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
            className={`px-2 py-1 font-normal ${b.color} ${b.bg} text-2xs whitespace-nowrap `}
          >
            {b.label} {b.text}
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
            className={`px-2 py-1 font-normal ${b.color} ${b.bg} rounded-md w-fit text-2xs whitespace-nowrap`}
          >
            {b.label} {b.text}
          </span>
        ))}
      </div>
    </>
  );
};
