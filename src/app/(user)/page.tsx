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
    queryFn: () => searchMovies({ page: 1, limit: limit, mediaType: 'movie' }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  // Phim bộ
  const { data: seriesData, isLoading: isSeriesLoading } = useQuery({
    queryKey: ['search_movies', 'series'],
    queryFn: () => searchMovies({ page: 1, limit: limit, mediaType: 'series' }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  // Phim mới nhất (thêm)
  const { data: newAddedData, isLoading: isNewAddedLoading } = useQuery({
    queryKey: ['search_movies', 'new_added', 1],
    queryFn: () => searchMovies({ page: 1, limit: 7, sortBy: 'createdAt' }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  // Phim mới nhất (cập nhật)
  const { data: newUpdatedData, isLoading: isNewUpdatedLoading } = useQuery({
    queryKey: ['search_movies', 'new_updated', 1],
    queryFn: () => searchMovies({ page: 1, limit: 7, sortBy: 'updatedAt' }),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Slider phim mới nhất */}
      <ListSliderMovies
        movies={newAddedData?.results.slice(0, 6) || []}
        isLoading={isNewAddedLoading || newAddedData?.results?.length === 0}
      />

      {/* Phim bộ */}
      <div className="px-4 sm:px-6 md:px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Phim bộ mới cập nhật</h2>
          <Link
            href="/phim-bo"
            className="group rounded-full w-6 h-6 md:w-8 md:h-8 border gap-1 border-white bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 hover:w-24 hover:border-primary hover:text-primary cursor-pointer"
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
          isLoading={isSeriesLoading || seriesData?.results?.length === 0}
        />
      </div>

      {/* Phim lẻ */}
      <div className="px-4 sm:px-6 md:px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Phim lẻ mới cập nhật</h2>
          <Link
            href="/phim-le"
            className="group rounded-full w-6 h-6 md:w-8 md:h-8 border gap-1 border-white bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 hover:w-24 hover:border-primary hover:text-primary cursor-pointer"
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
          isLoading={isMoviesLoading || moviesData?.results?.length === 0}
        />
      </div>

      {/* Danh sách phim mới cập nhật */}
      <div className="px-4 sm:px-6 md:px-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">Danh sách phim</h2>
        </div>
        <div className=" space-y-6">
          <ListGridMovies
            movies={newUpdatedData?.results || []}
            isLoading={isNewUpdatedLoading || newUpdatedData?.results?.length === 0}
          />
          <Pagination
            currentPage={1}
            totalPage={newUpdatedData?.totalPages}
            onChange={(page) => {
              router.push(`/tim-kiem/?page=${page}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
