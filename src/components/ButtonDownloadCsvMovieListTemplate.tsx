'use client';

import { Button } from './ui/Button';
import Papa from 'papaparse';
import { useAppData } from '@/contexts/AppDataContext';

export default function ButtonDownloadCsvMovieListTemplate() {
  const { genres, countries } = useAppData();
  const handleDownload = () => {
    const sample = [
      {
        title: 'Tên phim',
        originalTitle: 'Tên gốc',
        mediaType: 'Phim lẻ / Phim bộ',
        posterPath: 'link ảnh poster',
        backdropPath: 'link ảnh nền',
        trailerPath: 'link trailer (nếu có)',
        status: 'show/hide',
        numberOfEpisodes: 1,
        runtime: 120,
        releaseYear: new Date().getFullYear(),
        actors: 'Diễn viên 1, Diễn viên 2',
        directors: 'Đạo diễn 1, Đạo diễn 2',
        genres: genres.map((g) => g.name).join(', '),
        countries: countries.map((c) => c.name).join(', '),
        overview: 'Mô tả ngắn',
      },
    ];

    const csv = Papa.unparse(sample);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_moviesList.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="font-normal" size="sm" variant="outline">
      Tải file mẫu CSV
    </Button>
  );
}
