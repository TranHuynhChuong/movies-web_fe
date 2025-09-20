import React from 'react';
import { IconUpdating } from './icon/IconUpdating';
import { IconCheck } from './icon/IconCheck';
import { IconSchedule } from './icon/IconSchedule';

type BadgeType = 'updating' | 'completed' | 'schedule';

type BadgeMoviesStatusProps = {
  type: BadgeType;
  currentEp: number;
  totalEp: number;
  scheduleText: string;
  className?: string;
};

export const BadgeMovieStatus: React.FC<BadgeMoviesStatusProps> = ({
  type,
  currentEp,
  totalEp,
  scheduleText,
  className = '',
}) => {
  switch (type) {
    case 'updating':
      return (
        <div
          className={` ${className} rounded-full bg-orange-10 px-3 py-1.5 text-center text-xs font-light whitespace-nowrap text-orange space-x-2`}
        >
          <IconUpdating width={12} height={12} />
          <p>
            Đã chiếu: {currentEp} / {totalEp} tập
          </p>
        </div>
      );
    case 'completed':
      return (
        <div
          className={` ${className}rounded-full bg-teal-10 px-3 py-1.5 text-center text-xs font-light whitespace-nowrap text-teal space-x-2`}
        >
          <IconCheck width={12} height={12} />
          <p>
            Đã hoàn thành: {currentEp} / {totalEp} tập
          </p>
        </div>
      );
    case 'schedule':
      return (
        <div
          className={` ${className}rounded-full bg-primary-10 px-3 py-1.5 text-center text-xs font-light whitespace-nowrap text-primary space-x-2`}
        >
          <IconSchedule width={12} height={12} />
          <p>{scheduleText}</p>
        </div>
      );
    default:
      return null;
  }
};
