'use client';

import React from 'react';
import { ListGridMovies } from '@/components/ListGridMovies';
import { Pagination } from '@/components/ui/Pagination';
import { IconListSearch } from '@/components/icon/IconListSearch';

export const PanelSearchResult: React.FC<{
  title: string;
  movies: Movie[];
  currentPage: number;
  totalPage: number;
  isLoading?: boolean;
  basePath?: string;
}> = ({ title, movies, currentPage, totalPage, isLoading = false, basePath }) => {
  return (
    <div className="p-4 md:p-5 space-y-6">
      <h2 className="text-base md:text-lg font-semibold flex items-center gap-2">
        <IconListSearch width={32} height={32} />
        {title}
      </h2>

      {movies && movies.length > 0 ? (
        <ListGridMovies movies={movies} basePath={basePath} isLoading={isLoading} />
      ) : (
        <div className="text-center text-gray-400 py-8">Không có kết quả nào</div>
      )}

      <Pagination currentPage={currentPage} totalPage={totalPage} />
    </div>
  );
};
