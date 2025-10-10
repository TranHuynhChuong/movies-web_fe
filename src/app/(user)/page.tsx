'use client';

import { IconArrowRightChervon } from '@/components/icon/IconArrowRightChevron';
import { ListCarouselMovie } from '@/components/ListCarouselMovie';
import { ListGridMovies } from '@/components/ListGridMovies';
import { ListSliderMovies } from '@/components/ListSliderMovies';
import { Pagination } from '@/components/ui/Pagination';
import { searchMovies } from '@/services/movie/get';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const limit = 12;

  // Phim lẻ
  const { data: moviesData, isLoading: isMoviesLoading } = useQuery({
    queryKey: ['search_movies', 'movies'],
    queryFn: () => searchMovies({ page: 1, limit: limit, media_type: 'movies' }),
    placeholderData: (previousData) => previousData,
  });

  // Phim bộ
  const { data: seriesData, isLoading: isSeriesLoading } = useQuery({
    queryKey: ['search_movies', 'series'],
    queryFn: () => searchMovies({ page: 1, limit: limit, media_type: 'series' }),
    placeholderData: (previousData) => previousData,
  });

  // Phim mới nhất (thêm)
  const { data: newAddedData, isLoading: isNewAddedLoading } = useQuery({
    queryKey: ['search_movies', 'new_added'],
    queryFn: () => searchMovies({ page: 1, limit: 7, new: 'added' }),
    placeholderData: (previousData) => previousData,
  });

  // Phim mới nhất (cập nhật)
  const { data: newUpdatedData, isLoading: isNewUpdatedLoading } = useQuery({
    queryKey: ['search_movies', 'new_updated', 1],
    queryFn: () => searchMovies({ page: 1, limit: 7, new: 'updated' }),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Slider phim mới nhất */}
      <ListSliderMovies movies={newAddedData?.results || []} isLoading={isNewAddedLoading} />

      {/* Phim bộ */}
      <div className="px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Phim bộ mới cập nhật</h2>
          <Link
            href="/tim-kiem?list=num"
            className="group rounded-full w-8 h-8 border gap-1 border-white bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 hover:w-24 hover:border-primary hover:text-primary cursor-pointer"
          >
            <p className="text-xs text-inherit whitespace-nowrap hidden group-hover:block transition-opacity duration-300">
              Xem thêm
            </p>
            <IconArrowRightChervon width={12} height={12} />
          </Link>
        </div>
        <ListCarouselMovie
          movies={seriesData?.results || []}
          variant="backdrop"
          isLoading={isSeriesLoading}
        />
      </div>

      {/* Phim lẻ */}
      <div className="px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Phim lẻ mới cập nhật</h2>
          <Link
            href="/tim-kiem?list=nus"
            className="group rounded-full w-8 h-8 border gap-1 border-white bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 hover:w-24 hover:border-primary hover:text-primary cursor-pointer"
          >
            <p className="text-xs text-inherit whitespace-nowrap hidden group-hover:block transition-opacity duration-300">
              Xem thêm
            </p>
            <IconArrowRightChervon width={12} height={12} />
          </Link>
        </div>
        <ListCarouselMovie
          movies={moviesData?.results || []}
          variant="backdrop"
          isLoading={isMoviesLoading}
        />
      </div>

      {/* Danh sách phim mới cập nhật */}
      <div className="px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Danh sách phim</h2>
        </div>
        <div className=" space-y-6">
          <ListGridMovies movies={newUpdatedData?.results || []} isLoading={isNewUpdatedLoading} />
          <Pagination
            currentPage={1}
            totalPage={newUpdatedData?.total_pages}
            onChange={(page) => {
              router.push(`/tim-kiem/?page=${page}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
