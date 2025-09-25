'use client';

import React from 'react';
import { IconSubtitles } from './icon/IconSubtitles';
import { Version } from '@/types/movies';

type SelectorVersionProps = {
  versions?: Version[];
  active_version: number;
  className?: string;
  onClick: (version: number) => void;
};

export const SelectorVersion: React.FC<SelectorVersionProps> = ({
  versions,
  active_version = 1,
  className = '',
  onClick,
}) => {
  if (!versions || versions?.length === 0) return null;
  return (
    <div className={`${className} flex gap-2`}>
      {versions?.map((version, index) => {
        const isActive = active_version === version.id;
        return (
          <button
            key={index}
            type="button"
            className={`flex items-center gap-1.5 rounded-sm p-1.5 text-xs whitespace-nowrap cursor-pointer
              ${isActive ? 'border border-white text-white' : 'text-gray hover:text-white'}
            `}
            onClick={() => onClick(version.id)}
          >
            <IconSubtitles width={12} height={12} />
            <span>{version.name}</span>
          </button>
        );
      })}
    </div>
  );
};
