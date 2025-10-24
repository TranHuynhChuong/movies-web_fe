import Link from 'next/link';
import { getLink } from '@/utils/getLink';
import { Movie } from '@/types/movies';
import { Fragment } from 'react';

interface SectionMovieDetailsProps {
  movie: Movie;
}

export const SectionMovieDetails: React.FC<SectionMovieDetailsProps> = ({ movie }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="text-sm text-gray">
        <b className="text-white">Giới thiệu: </b>
        {movie.overview ?? ''}
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Thời lượng: </b>
        {movie.runtime ?? ''} Phút/Tập
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Tổng số tập: </b>
        {movie.numberOfEpisodes ?? ''} Tập
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Quốc gia: </b>
        <Link
          className="hover:underline hover:text-primary"
          href={getLink('/quoc-gia', movie.country?.name, movie.country?.id)}
        >
          {movie.country?.name}
        </Link>
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Thể loại: </b>
        {movie.genres?.map((genre, index) => (
          <Fragment key={genre.id || index}>
            <Link
              className="hover:underline hover:text-primary"
              href={getLink('/the-loai', genre.name, genre.id)}
            >
              {genre.name}
            </Link>
            {index < (movie.genres?.length ?? 0) - 1 && ', '}
          </Fragment>
        ))}
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Năm phát hành: </b>
        {movie.releaseYear}
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Đạo diễn: </b>
        {movie.directors ?? ''}
      </div>

      <div className="text-sm text-gray">
        <b className="text-white">Diễn viên: </b>
        {movie.actors ?? ''}
      </div>
    </div>
  );
};
