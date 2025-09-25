import { BadgeList } from './BadgeList';
import { GenresList } from './GenresList';
import { SeriesStatus } from './SeriesStatus';
import { Movie, Version } from '@/types/movies';

interface SectionMovieSummaryProps {
  movie: Movie;
}

function getCurentEp(versions?: Version[]): number {
  if (!versions || versions.length === 0) return 0;
  return Math.max(...versions.map((v) => v.current_ep));
}

export const SectionMovieSummary: React.FC<SectionMovieSummaryProps> = ({ movie }) => {
  const current_ep = getCurentEp(movie.versions);

  return (
    <div className="w-full space-y-4 h-fit">
      <div className="w-full space-y-2 h-fit">
        <h2 className="text-xl font-extrabold text-center text-white md:text-2xl md:text-start">
          {movie.title}
        </h2>
        <h3 className="text-center line-clamp-2 md:text-lg text-primary md:text-start ">
          {movie.original_title}
        </h3>
      </div>

      <div className="w-full space-y-2 md:space-y-4 h-fit">
        <BadgeList
          texts={[
            movie.release_year ? movie.release_year.toString() : 'N/A',
            movie.country?.name ?? 'N/A',
            movie.runtime ? movie.runtime.toString() + ' Phút' : 'N/A',
            movie.media_type === 'series' ? 'Tập ' + current_ep : 'Full',
          ]}
          className="justify-center md:justify-start"
        />
        <GenresList genres={movie.genres ?? []} className="justify-center md:justify-start" />
        {movie.media_type === 'series' && (
          <SeriesStatus current_ep={current_ep} total_ep={movie.number_of_episodes ?? 0} />
        )}
      </div>
    </div>
  );
};
