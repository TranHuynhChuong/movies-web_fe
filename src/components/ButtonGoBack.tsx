'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowLeftFlow } from './icon/IconArrowLeftFlow';

export const ButtonGoBack: React.FC<{
  className?: string;
  href?: string;
}> = ({ className = '', href = '/' }) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full w-7 aspect-square flex items-center justify-center border border-white cursor-pointer hover:text-primary ${className}`}
    >
      <IconArrowLeftFlow width={20} height={20} />
    </button>
  );
};
