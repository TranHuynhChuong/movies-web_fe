'use client';

import { StreamingSource } from '@/types/movies';
import React from 'react';

type SelectorStreamingSourceProps = {
  streaming_sources: StreamingSource[];
  active_server: StreamingSource;
  onClick: (streaming_source: StreamingSource) => void;
  className?: string;
};

export const SelectorStreamingSource: React.FC<SelectorStreamingSourceProps> = ({
  streaming_sources,
  active_server,
  onClick,
  className,
}) => {
  const handleChangeServer = (streaming_source: StreamingSource) => {
    onClick(streaming_source);
  };

  return (
    <div className={`${className} flex flex-col gap-2 bg-bg-03 p-3.5 text-xs`}>
      <p className="text-white">Chọn server khác nếu bị lỗi hoặc mất âm thanh + phụ đề</p>

      <div className="flex flex-wrap gap-1 text-center text-gray">
        {streaming_sources.map((streaming_source, index) => {
          const isActive = active_server.order_index === streaming_source.order_index;
          return (
            <button
              type="button"
              key={streaming_source.order_index + '-' + index}
              onClick={() => handleChangeServer(streaming_source)}
              className={`
                h-fit w-fit cursor-pointer rounded-sm px-2 py-1.5
                ${
                  isActive
                    ? 'border border-white text-white'
                    : 'bg-white/10 hover:text-white active:border active:border-white active:text-white'
                }
              `}
            >
              Server {streaming_source.order_index}
            </button>
          );
        })}
      </div>
    </div>
  );
};
