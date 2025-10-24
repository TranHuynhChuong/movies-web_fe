'use client';

import { StreamingSource } from '@/types/movies';
import React from 'react';

type SelectorStreamingSourceProps = {
  streamingSources: StreamingSource[] | undefined | [];
  activeStreamingSource: StreamingSource | undefined;
  onClick: (streamingSource: StreamingSource) => void;
  className?: string;
};

export const SelectorStreamingSource: React.FC<SelectorStreamingSourceProps> = ({
  streamingSources,
  activeStreamingSource,
  onClick,
  className,
}) => {
  console.log(streamingSources, activeStreamingSource);
  const handleChangeServer = (streamingSource: StreamingSource) => {
    onClick(streamingSource);
  };

  if (!streamingSources || streamingSources?.length === 0) return null;
  return (
    <div className={`${className} flex flex-col gap-2 bg-bg-03 p-3.5 text-xs`}>
      <p className="text-white">Chọn server khác nếu bị lỗi hoặc mất âm thanh + phụ đề</p>

      <div className="flex flex-wrap gap-1 text-center text-gray">
        {streamingSources.map((streamingSource, index) => {
          const isActive = activeStreamingSource?.orderIndex === streamingSource.orderIndex;
          return (
            <button
              type="button"
              key={streamingSource.orderIndex + '-' + index}
              onClick={() => handleChangeServer(streamingSource)}
              className={`
                h-fit w-fit cursor-pointer rounded-sm px-2 py-1.5
                ${
                  isActive
                    ? 'border border-white text-white'
                    : 'bg-white/10 hover:text-white active:border active:border-white active:text-white'
                }
              `}
            >
              Server {streamingSource.orderIndex}
            </button>
          );
        })}
      </div>
    </div>
  );
};
