import { ButtonPlayGroup } from '@/components/ButtonPlayGroup';
import { ImageMask } from '@/components/ui/ImageMask';
import { extractId } from '@/utils/kebabCase';
import Image from 'next/image';
import { Movie } from '@/types/movies';
import { getMovieInf } from '@/services/movie/get';
import { SelectorVersionEpisode } from '@/components/SelectorVersionEpisode';
import { SectionMovieSummary } from '@/components/SectionMovieSumary';
import { SectionMovieDetails } from '@/components/SectionMovieDetails';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

async function fetchMovieInf(slug: string): Promise<Movie> {
  try {
    const id = extractId(slug);
    const data = await getMovieInf(id);
    return data;
  } catch (error) {
    console.error(error);
    redirect(`/`);
  }
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
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
          url: movie.poster_path,
          width: 400,
          height: 600,
          alt: movie.title,
        },
      ],
    },
  };
}

export default async function MovieDetails({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const movie = await fetchMovieInf(slug);

  return (
    <div className="w-full pb-40 h-fit">
      {/* Ảnh BackDrop */}
      <div className="relative w-full max-h-[420px] overflow-hidden">
        <Image
          src={movie.backdrop_path}
          alt={movie.title}
          width={1920}
          height={1080}
          className="object-cover w-full h-auto max-h-[420px]"
        />
        <ImageMask />
      </div>

      {/* Thông tin phim */}
      <div className="relative w-full px-5 space-y-6 h-fit md:px-7">
        <div className="flex gap-6">
          <div className="absolute top-0 overflow-hidden -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md md:hidden shadow-white/10 w-30 h-45 left-1/2">
            <Image
              src={movie.poster_path}
              alt={movie.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="120px"
            />
          </div>
          <div className="hidden pt-10 md:flex">
            <div className="relative w-40 overflow-hidden rounded-md shadow-white/10 h-60">
              <Image
                src={movie.poster_path}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="160px"
              />
            </div>
          </div>
          <div className="flex flex-col items-end flex-1 gap-6 pt-30 md:pt-10 md:flex-row">
            <SectionMovieSummary movie={movie} />
            <ButtonPlayGroup
              id={movie.id}
              title={movie.title}
              original_title={movie.original_title}
              trailer_path={movie.trailer_path ?? ''}
            />
          </div>
        </div>
        <SectionMovieDetails movie={movie} />

        <SelectorVersionEpisode media_type={movie.media_type} versions={movie.versions} />
      </div>
    </div>
  );
}
