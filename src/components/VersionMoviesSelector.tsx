'use client';

import React from 'react';
import { IconSubtitles } from './icon/IconSubtitles';
import { IconSoundWaves } from './icon/IconSoundWaves';
import { IconMic } from './icon/IconMic';

/**
 * - 1: Phụ Đề
 * - 2: Thuyết Minh
 * - 3: Lồng Tiếng
 */
type Option = '1' | '2' | '3';

type VersionMoviesSelectorProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  options: Option[];
  activeValue: Option;
  className?: string;
  onChange?: (value: Option) => void;
};

const optionConfig: Record<
  Option,
  { label: string; Icon: React.FC<{ width?: number; height?: number }> }
> = {
  1: { label: 'Phụ Đề', Icon: IconSubtitles },
  2: { label: 'Thuyết Minh', Icon: IconSoundWaves },
  3: { label: 'Lồng Tiếng', Icon: IconMic },
};

export const VersionMoviesSelector: React.FC<VersionMoviesSelectorProps> = ({
  options,
  activeValue = 1,
  className = '',
  onChange,
  ...props
}) => {
  const handleClick = (value: Option) => {
    onChange?.(value);
  };

  return (
    <div className={`${className} flex gap-2`}>
      {options.map((option) => {
        const isActive = activeValue === option;
        const { label, Icon } = optionConfig[option];
        return (
          <button
            key={option}
            type="button"
            className={`flex items-center gap-1.5 rounded-sm p-1.5 text-xs whitespace-nowrap cursor-pointer
              ${isActive ? 'border border-white text-white' : 'text-gray hover:text-white'}
            `}
            {...props}
            onClick={() => handleClick(option)}
          >
            <Icon width={12} height={12} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
