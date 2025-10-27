'use client';

import React, { useState } from 'react';
import { IconPlay } from './icon/IconPlay';
import { Button } from './ui/Button';
import { TrailerModal } from './ModalTrailer';
import { useRouter } from 'next/navigation';
import { getLink } from '@/utils/getLink';

type ButtonPlayGroupProps = {
  id: string;
  title: string;
  originalTitle: string;
  trailerPath?: string;
  canWatch: boolean;
};

export const ButtonPlayGroup: React.FC<ButtonPlayGroupProps> = ({
  id,
  title,
  originalTitle,
  trailerPath,
  canWatch = false,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="items-center justify-center hidden w-full h-full gap-4 md:flex md:justify-start md:flex-col md:w-fit ">
        {canWatch && (
          <Button
            size="lg"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => router.push(getLink('/xem-phim', title, id) + '?ver=1&ep=1')}
          >
            <IconPlay width={24} height={24} /> Xem Ngay
          </Button>
        )}
        {trailerPath && (
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setOpen(true)}
          >
            <IconPlay width={24} height={24} />
            Trailer
          </Button>
        )}
      </div>
      <div className="flex justify-center w-full h-full gap-3 md:hidden md:justify-start md:flex-col md:w-fit ">
        {canWatch && (
          <Button
            size="md"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => router.push(getLink('/xem-phim', title, id) + '?ver=1&ep=1')}
          >
            <IconPlay width={22} height={22} /> Xem Ngay
          </Button>
        )}
        {trailerPath && (
          <Button
            variant="outline"
            size="md"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setOpen(true)}
          >
            <IconPlay width={24} height={24} />
            Trailer
          </Button>
        )}
      </div>

      <TrailerModal
        title={title}
        originalTitle={originalTitle}
        open={open}
        onClose={() => setOpen(false)}
        trailerPath={trailerPath}
      />
    </>
  );
};
