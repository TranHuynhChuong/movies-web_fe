'use client';
import { useState } from 'react';

interface MovieItemProps {
  movie: MovieFormData;
  index: number;
}

export function MovieItem({ movie, index }: Readonly<MovieItemProps>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-lg space-y-2 w-full text-sm">
      <p>
        {index + 1}. <strong>{movie.title}</strong> ( {movie.originalTitle} )
      </p>

      {expanded && (
        <>
          <p className="truncate w-full">
            Loại phim:{' '}
            {movie.mediaType === 'series'
              ? 'Phim bộ'
              : movie.mediaType === 'movie'
              ? 'Phim lẻ'
              : ''}
          </p>
          <p>
            Trạng thái: {movie.status === 'show' ? 'Hiển thị' : movie.status === 'hide' ? 'Ẩn' : ''}
          </p>
          <p>Thời lượng: {movie.runtime ?? 'Chưa có'} phút</p>
          <p>Số tập: {movie.numberOfEpisodes ?? 'Chưa có'}</p>
          <p>Năm phát hành: {movie.releaseYear ?? 'Chưa có'}</p>
          <p className="truncate w-full">Trailer: {movie.trailerPath || 'Chưa có'}</p>
          <p>Thể loại: {movie.genres?.map((g) => g.name).join(', ') || 'Chưa có'}</p>
          <p className="truncate w-full">Giới thiệu: {movie.overview || 'Chưa có'}</p>
          <p className="truncate w-full">Diễn viên: {movie.actors || 'Chưa có'}</p>
          <p className="truncate w-full">Đạo diễn: {movie.directors || 'Chưa có'}</p>
          <p>Quốc gia: {movie.countries?.map((c) => c.name).join(', ') || 'Chưa có'}</p>
          <p className="truncate w-full">Poster: {movie.posterPath || 'Chưa có'}</p>
          <p className="truncate w-full">Backdrop: {movie.backdropPath || 'Chưa có'}</p>
        </>
      )}

      <button
        className="text-primary hover:underline text-xs"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Ẩn bớt' : 'Xem đầy đủ'}
      </button>
    </div>
  );
}

interface MovieProps {
  movies?: MovieFormData[];
}

export default function MovieList({ movies }: Readonly<MovieProps>) {
  if (!movies) return;
  return (
    <div className="space-y-2">
      {movies.map((movie, index) => (
        <MovieItem key={index} movie={movie} index={index} />
      ))}
    </div>
  );
}
