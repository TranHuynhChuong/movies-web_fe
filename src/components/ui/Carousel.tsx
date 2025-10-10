'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ReactNode } from 'react';
import { IconArrowRightChervon } from '../icon/IconArrowRightChevron';
import { IconArrowLeftChevron } from '../icon/IconArrowLeftChevron';

type CarouselProps = {
  children: ReactNode;
  breakpoints?: Record<number, { slidesPerView: number }>;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
};

export default function Carousel({
  children,
  breakpoints = {
    0: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 6 },
    1536: { slidesPerView: 8 },
  },
  spaceBetween = 20,
  loop = false,
  className = '',
}: Readonly<CarouselProps>) {
  return (
    <div className="w-full relative">
      {/* --- Swiper chính --- */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '#slider-button-right',
          prevEl: '#slider-button-left',
        }}
        loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={2}
        breakpoints={breakpoints}
        className={`multiple-slide-carousel relative ${className}`}
      >
        {Array.isArray(children) ? (
          children.map((child, i) => <SwiperSlide key={i}>{child}</SwiperSlide>)
        ) : (
          <SwiperSlide>{children}</SwiperSlide>
        )}
      </Swiper>

      {/* 🟡 Nút điều hướng — chỉ hiện trên laptop (md) trở lên */}
      <button
        id="slider-button-left"
        className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white px-1 py-2 rounded-r-sm"
      >
        <IconArrowLeftChevron />
      </button>
      <button
        id="slider-button-right"
        className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white px-1 py-2 rounded-l-sm"
      >
        <IconArrowRightChervon />
      </button>
    </div>
  );
}
