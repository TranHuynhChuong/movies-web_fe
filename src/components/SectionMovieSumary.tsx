import { BadgeList } from './BadgeList';
import { LinkList } from './LinkList';
import { SeriesStatus } from './SeriesStatus';

interface SectionMovieSummaryProps {
  movie: Movie;
}

function getCurentEp(versions?: Version[]): number {
  if (!versions || versions.length === 0) return 0;
  return Math.max(...versions.map((v) => v.currentEp ?? 0));
}

export const SectionMovieSummary: React.FC<SectionMovieSummaryProps> = ({ movie }) => {
  const currentEp = getCurentEp(movie.versions);

  return (
    <div className="w-full space-y-4 h-fit">
      <div className="w-full space-y-2 h-fit">
        <h2 className="text-xl font-extrabold text-center text-white md:text-2xl md:text-start">
          {movie.title}
        </h2>
        <h3 className="text-center line-clamp-2 md:text-lg text-primary md:text-start ">
          {movie.originalTitle}
        </h3>
      </div>

      <div className="w-full space-y-2  h-fit">
        <BadgeList
          texts={[
            movie.releaseYear ? movie.releaseYear.toString() : 'N/A',
            movie.runtime ? movie.runtime.toString() + ' Phút' : 'N/A',
            movie.mediaType === 'series' ? 'Tập ' + currentEp : 'Full',
          ]}
          className="justify-center md:justify-start"
        />
        <LinkList
          baseLink="quoc-gia"
          items={movie.countries ?? []}
          className="justify-center md:justify-start"
        />
        <LinkList
          baseLink="the-loai"
          items={movie.genres ?? []}
          className="justify-center md:justify-start"
        />
        {movie.mediaType === 'series' && (
          <SeriesStatus currentEp={currentEp} totalEp={movie.numberOfEpisodes ?? 0} />
        )}
      </div>
    </div>
  );
};
