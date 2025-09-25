'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IconX } from './icon/IconX';

type TrailerModalProps = {
  open: boolean;
  title: string;
  original_title: string;
  onClose: () => void;
  trailer_path: string | null;
  allowFullscreen?: boolean;
};

const extractYouTubeId = (input?: string | null): string | null => {
  if (!input) return null;
  const s = input.trim();
  // If it's already embed url
  const embedMatch = s.match(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];
  // Standard watch url ?v=
  const vMatch = s.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (vMatch) return vMatch[1];
  // Short youtu.be/id
  const shortMatch = s.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];
  // If directly id-like
  if (/^[A-Za-z0-9_-]{8,}$/.test(s)) return s;
  return null;
};

export const TrailerModal: React.FC<TrailerModalProps> = ({
  open,
  title,
  original_title,
  onClose,
  trailer_path,
  allowFullscreen = true,
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Build embed src only when open (to avoid autoplay when not shown)
  useEffect(() => {
    const id = extractYouTubeId(trailer_path);
    if (open && id) {
      // autoplay=1, modestbranding=1, rel=0, enablejsapi=1 (enable further control if needed)
      setSrc(`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&showinfo=0`);
    } else {
      setSrc(null);
    }
  }, [open, trailer_path]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Focus management: focus dialog when opened
  useEffect(() => {
    if (open) {
      // Slight delay to ensure element rendered
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Trailer"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Modal content */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl mx-auto overflow-hidden rounded-lg"
      >
        <div className="flex items-center justify-between gap-2 p-3 bg-black">
          <div className="space-y-1">
            <h2 className="pl-2 text-sm font-extrabold text-white md:text-base">
              {title} - Trailer
            </h2>
            <h3 className="pl-2 text-xs font-normal text-primary md:text-sm">{original_title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white rounded cursor-pointer hover:bg-white/10"
          >
            <IconX width={20} height={20} />
          </button>
        </div>

        {/* Responsive iframe container: 16:9 */}
        <div className="w-full bg-black">
          <div className="relative pt-[56.25%]">
            {/* 16:9 => 9/16 = 56.25% */}
            {src ? (
              <iframe
                title={`${title} - Trailer`}
                src={src}
                allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture${
                  allowFullscreen ? '; fullscreen' : ''
                }`}
                allowFullScreen={allowFullscreen}
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Đang tải...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
