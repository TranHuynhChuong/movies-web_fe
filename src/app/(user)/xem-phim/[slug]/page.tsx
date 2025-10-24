import { SectionMovieDetails } from '@/components/SectionMovieDetails';
import { SectionMovieSummary } from '@/components/SectionMovieSumary';
import { SectionVideoPlay } from '@/components/SectionVideoPlay';
import { getMovieInf } from '@/services/movie/get';
import { Movie } from '@/types/movies';
import { extractId } from '@/utils/kebabCase';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

async function fetchMovieInf(slug: string): Promise<Movie> {
  try {
    const id = extractId(slug);
    const { data } = await getMovieInf(id);
    return data;
  } catch (error) {
    console.error(error);
    redirect(`/phim/${slug}`);
  }
}

interface WatchMoviePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WatchMoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = await fetchMovieInf(slug);

  if (!movie) {
    return {
      title: 'Phim không tồn tại',
      description: 'Trang xem phim không tìm thấy thông tin',
    };
  }

  return {
    title: movie.title,
    description: movie.overview || 'Xem phim online miễn phí',
    openGraph: {
      title: movie.title,
      description: movie.overview,
      type: 'video.movie',
      images: [
        {
          url: movie.posterPath,
          width: 400,
          height: 600,
          alt: movie.title,
        },
      ],
    },
  };
}

export default async function WatchMoviePage({ params }: Readonly<WatchMoviePageProps>) {
  const { slug } = await params;

  const movie = await fetchMovieInf(slug);

  return (
    <div className="pb-40 w-full h-fit">
      <SectionVideoPlay movie={movie} />
      <div className="flex flex-col gap-8 items-start w-full px-5 mt-8 md:px-7">
        <div className="flex md:items-end gap-4 flex-col md:flex-row items-center w-full justify-center">
          <div className="relative w-40 overflow-hidden rounded-md shadow-white/10 h-60">
            <Image
              src={movie.posterPath}
              alt={movie.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="160px"
            />
          </div>
          <div className="flex flex-1">
            <SectionMovieSummary movie={movie} />
          </div>
        </div>
        <div className="flex flex-1">
          <SectionMovieDetails movie={movie} />
        </div>
      </div>
    </div>
  );
}
