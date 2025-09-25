'use client';

import { Server } from '@/types/movies';
import React from 'react';

type SelectorServerProps = {
  servers: Server[];
  active_server: Server;
  onClick: (server: Server) => void;
  className?: string;
};

export const SelectorServer: React.FC<SelectorServerProps> = ({
  servers,
  active_server,
  onClick,
  className,
}) => {
  const handleChangeServer = (server: Server) => {
    onClick(server);
  };

  return (
    <div className={`${className} flex flex-col gap-2 bg-bg-03 p-3.5 text-xs`}>
      <p className="text-white">Chọn server khác nếu bị lỗi hoặc mất âm thanh + phụ đề</p>

      <div className="flex flex-wrap gap-1 text-center text-gray">
        {servers.map((server, index) => {
          const isActive = active_server.order === server.order;
          return (
            <button
              type="button"
              key={server.order + '-' + index}
              onClick={() => handleChangeServer(server)}
              className={`
                h-fit w-fit cursor-pointer rounded-sm px-2 py-1.5
                ${
                  isActive
                    ? 'border border-white text-white'
                    : 'bg-white/10 hover:text-white active:border active:border-white active:text-white'
                }
              `}
            >
              Server {server.order}
            </button>
          );
        })}
      </div>
    </div>
  );
};
