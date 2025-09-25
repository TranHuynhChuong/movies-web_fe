'use client';

import React from 'react';

type IframeProps = {
  src: string;
  title?: string;
  className?: string;
};

export const Iframe: React.FC<IframeProps> = ({ src, title, className }) => {
  return (
    <div className={`w-full bg-black ${className || ''}`}>
      <div className="relative pt-[56.25%]">
        <iframe
          src={src}
          title={title ?? 'Iframe Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};
