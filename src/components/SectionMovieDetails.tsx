import Link from 'next/link';
import { getLink } from '@/utils/getLink';
import { Movie } from '@/types/movies';

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
        {movie.number_of_episodes ?? ''} Tập
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
        <b className="text-white">Năm phát hành: </b>
        <Link className="hover:underline hover:text-primary" href={`/nam/${movie.release_year}`}>
          {movie.release_year}
        </Link>
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
