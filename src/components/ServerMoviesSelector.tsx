'use client';

import React from 'react';

type ServerSelectorProps = {
  servers: string[]; // Danh sách server
  activeServer: string; // Server đang chọn
  className?: string;
  onChange?: (server: string) => void; // Callback khi chọn server
};

export const ServerSelector: React.FC<ServerSelectorProps> = ({
  servers,
  activeServer,
  className,
  onChange,
}) => {
  return (
    <div
      className={`${className} flex flex-col gap-2 rounded-lg bg-bg-03 p-3.5 text-xs whitespace-nowrap`}
    >
      <p className="text-white">Chọn server khác nếu bị lỗi hoặc mất âm thanh + phụ đề</p>

      <div className="flex flex-wrap gap-1 text-center text-gray">
        {servers.map((server) => {
          const isActive = activeServer === server;
          return (
            <button
              type="button"
              key={server}
              onClick={() => onChange?.(server)}
              className={`
                h-fit w-fit cursor-pointer rounded-sm px-2 py-1.5
                ${
                  isActive
                    ? 'border border-white text-white'
                    : 'bg-white/10 hover:text-white active:border active:border-white active:text-white'
                }
              `}
            >
              Server {server}
            </button>
          );
        })}
      </div>
    </div>
  );
};
