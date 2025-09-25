'use client';
import React from 'react';
import { IconArrowLeftFlow } from '../icon/IconArrowLeftFlow';
import { IconArrowRightFlow } from '../icon/IconArrowRightFlow';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage && onPageChange) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center space-x-2 text-sm rounded-md">
          {/* Previous */}
          <li>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="inline-flex items-center px-2 py-2 space-x-2 font-medium rounded-full cursor-pointer text-gray bg-bg-03 hover:text-white disabled:opacity-50"
            >
              <IconArrowLeftFlow width={20} height={20} />
            </button>
          </li>

          {/* Current Page */}
          <li>
            <span className="inline-flex items-center px-6 py-2 space-x-2 rounded-full bg-bg-03 text-gray">
              Trang {currentPage} / {totalPage}
            </span>
          </li>

          {/* Next */}
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className="inline-flex items-center px-2 py-2 space-x-2 font-medium rounded-full cursor-pointer text-gray bg-bg-03 hover:text-white disabled:opacity-50"
            >
              <IconArrowRightFlow width={20} height={20} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
