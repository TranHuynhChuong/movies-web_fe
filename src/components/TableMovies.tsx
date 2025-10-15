'use client';
import { Movie } from '@/types/movies';
import Link from 'next/link';
import React from 'react';

const getShortLabel = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('.');
};

const getVersionStatus = (movie: Movie, version: { name: string; current_ep: number }) => {
  if (movie.media_type === 'series') {
    // Phim bộ: so sánh số tập hiện có với tổng số tập
    const total = movie.number_of_episodes || 0;
    return `${getShortLabel(version.name)} ${version.current_ep}/${total}`;
  } else {
    // Phim lẻ: chỉ có 1 tập, nên coi là Full luôn
    return `${getShortLabel(version.name)} Full`;
  }
};

export const TableMovies: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className="overflow-x-auto">
      {/* Bảng cho màn hình lớn */}
      <table className="min-w-full border-separate border-spacing-y-3 hidden md:table">
        <thead>
          <tr className="text-left align-top text-gray-300">
            <th className="px-6 py-3 font-semibold">ID</th>
            <th className="px-6 py-3 font-semibold">Tên phim</th>
            <th className="px-6 py-3 font-semibold">Năm</th>
            <th className="px-6 py-3 font-semibold">Loại</th>
            <th className="px-6 py-3 font-semibold">Trạng thái</th>
            <th className="px-6 py-3 font-semibold">Ngày tạo</th>
            <th className="px-6 py-3 font-semibold">Ngày cập nhật</th>
            <th className="px-6 py-3 font-semibold"></th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className={`rounded-xl align-top shadow transition hover:shadow-md bg-white dark:bg-gray-900`}
            >
              <td className="rounded-l-xl px-6 py-4">{movie.id}</td>

              <td className="flex items-center space-x-2 px-6 py-4">
                <div className="group relative min-w-32 space-y-1">
                  <p className="line-clamp-2 cursor-default">{movie.title}</p>
                  <p className="line-clamp-1 cursor-default text-sm text-gray-300 italic">
                    {movie.original_title}
                  </p>

                  {/* Tooltip */}
                  <div
                    className="tooltip-arrow absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg group-hover:block"
                    role="tooltip"
                  >
                    <p className="line-clamp-2 cursor-default">{movie.title}</p>
                    <p className="line-clamp-1 cursor-default text-xs italic">
                      {movie.original_title}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">{movie.release_year}</td>

              {/* Loại */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                    movie.media_type === 'series'
                      ? 'bg-purple-200/90 text-purple-700'
                      : 'bg-orange-200/90 text-orange-700'
                  }`}
                >
                  {movie.media_type === 'series' ? 'Phim bộ' : 'Phim lẻ'}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="space-y-2">
                  <p
                    className={`rounded-full w-fit px-3 py-1 font-semibold whitespace-nowrap text-xs ${
                      movie.status === 'show'
                        ? 'bg-blue-200/90 text-blue-700'
                        : 'bg-red-200/90 text-red-700'
                    }`}
                  >
                    {movie.status === 'show' ? 'Hiện' : 'Ẩn'}
                  </p>
                  {/* Các version */}
                  {!movie.versions || movie.versions.length === 0 ? (
                    <p className="rounded-full w-fit px-3 py-1 text-xs font-semibold bg-gray-200/90 text-gray-700">
                      Trailer
                    </p>
                  ) : (
                    movie.versions.map((v) => {
                      const label = getVersionStatus(movie, v);

                      const isFull =
                        label.toLowerCase().includes('full') ||
                        (/\b(\d+)\/(\d+)\b/.test(label) &&
                          (() => {
                            const match = /(\d+)\/(\d+)/.exec(label);
                            if (!match) return false;
                            const [current, total] = match.slice(1).map(Number);
                            return current === total;
                          })());

                      return (
                        <p
                          key={v.name}
                          className={`rounded-full w-fit px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                            isFull
                              ? 'bg-green-200/90 text-green-700'
                              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          }`}
                        >
                          {label}
                        </p>
                      );
                    })
                  )}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="text-sm">
                  <p>
                    {movie.created_at ? new Date(movie.created_at).toLocaleTimeString('vi-VN') : ''}
                  </p>
                  <p>
                    {movie.created_at ? new Date(movie.created_at).toLocaleDateString('vi-VN') : ''}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="text-sm">
                  <p>
                    {movie.updated_at ? new Date(movie.updated_at).toLocaleTimeString('vi-VN') : ''}
                  </p>
                  <p>
                    {movie.updated_at ? new Date(movie.updated_at).toLocaleDateString('vi-VN') : ''}
                  </p>
                </div>
              </td>

              <td className="rounded-r-xl px-6 py-4 text-sm">
                <div className="cursor-pointer text-blue-600 hover:underline">
                  <Link
                    href={`/admin/phim/${movie.id}`}
                    className="text-sm font-normal text-blue-600 hover:underline"
                  >
                    Chỉnh sửa
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dạng thẻ cho mobile */}
      <div className="space-y-3 md:hidden mt-3">
        {movies.map((movie) => (
          <div key={movie.id} className={`rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-200/90">{movie.id}</p>
              <Link
                href={`/admin/phim/${movie.id}`}
                className="text-sm font-normal text-blue-600 hover:underline"
              >
                Chỉnh sửa
              </Link>
            </div>

            <div className="mt-2.5 space-y-1.5">
              <p className="font-semibold text-sm text-gray-200/90">
                {movie.title} ({movie.release_year})
              </p>
              <p className="text-xs italic text-gray-300">{movie.original_title}</p>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-medium w-fit text-xs whitespace-nowrap ${
                  movie.media_type === 'series'
                    ? 'bg-indigo-200/90 text-indigo-700'
                    : 'bg-orange-200/90 text-orange-700'
                }`}
              >
                {movie.media_type}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium w-fit whitespace-nowrap ${
                  movie.status === 'show'
                    ? 'bg-blue-200/90 text-blue-700'
                    : 'bg-red-200/90 text-red-700'
                }`}
              >
                {movie.status === 'show' ? 'Hiện' : 'Ẩn'}
              </span>

              {/* Các version */}
              {!movie.versions || movie.versions.length === 0 ? (
                <p className="rounded-full w-fit px-3 py-1 text-xs font-semibold whitespace-nowrap bg-gray-200 text-gray-700 flex gap-2 ">
                  Trailer
                </p>
              ) : (
                movie.versions.map((v) => {
                  const label = getVersionStatus(movie, v);

                  const isFull =
                    label.toLowerCase().includes('full') ||
                    (/\b(\d+)\/(\d+)\b/.test(label) &&
                      (() => {
                        const match = /(\d+)\/(\d+)/.exec(label);
                        if (!match) return false;
                        const [current, total] = match.slice(1).map(Number);
                        return current === total;
                      })());

                  return (
                    <p
                      key={v.name}
                      className={`rounded-full w-fit px-3 py-1 text-xs whitespace-nowrap font-semibold ${
                        isFull
                          ? 'bg-green-200/90 text-green-700'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {label}
                    </p>
                  );
                })
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="space-y-0.5">
                {movie.created_at ? new Date(movie.created_at).toLocaleString('vi-VN') : ''}
              </div>
              <div className="space-y-0.5">
                {movie.updated_at ? new Date(movie.updated_at).toLocaleString('vi-VN') : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
