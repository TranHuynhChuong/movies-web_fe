'use client';

import { useRef, useState } from 'react';
import Papa from 'papaparse';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { useAppData } from '@/contexts/AppDataContext';
import { slugify } from '@/utils/slugify';

interface CsvMovieUploaderProps {
  onDataParsed: (records: MovieFormData[]) => void;
  onSetFile?: (file: File | null) => void;
}

export default function CsvMovieUploader({
  onDataParsed,
  onSetFile,
}: Readonly<CsvMovieUploaderProps>) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { genres, countries } = useAppData();
  const { show } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleParseCsv = () => {
    if (!file) {
      show('Vui lòng chọn file CSV', 'error', 'top-right');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        try {
          const data = results.data as any[];
          if (!data.length) {
            show('File CSV trống', 'error', 'top-right');
            return;
          }

          const movies: MovieFormData[] = [];

          for (let i = 0; i < data.length; i++) {
            const record = data[i];

            const inputGenreNames = (record.genres || '')
              .split(/[,;]/)
              .map((g: string) => g.trim())
              .filter(Boolean);

            const genreSlugs = inputGenreNames.map((g: string) => slugify(g));
            const matchedGenres = genres.filter((g) => genreSlugs.includes(slugify(g.name)));

            const inputCountryName = slugify(record.country || record.countryName || '');
            const matchedCountry = countries.find((c) => slugify(c.name) === inputCountryName);

            const inputCountriesNames = (record.countries || '')
              .split(/[,;]/)
              .map((g: string) => g.trim())
              .filter(Boolean);

            const countriesSlugs = inputCountriesNames.map((c: string) => slugify(c));
            const matchedCountries = countries.filter((c) =>
              countriesSlugs.includes(slugify(c.name))
            );

            // Nếu có lỗi => dừng
            if (matchedGenres.length !== inputGenreNames.length || !matchedCountry) {
              let msg = `Dòng ${i + 1}: `;
              if (matchedGenres.length !== inputGenreNames.length)
                msg += 'Không tìm thấy thể loại. ';
              if (matchedCountries.length !== inputCountriesNames.length)
                msg += 'Không tìm thấy quốc gia. ';
              show(msg.trim(), 'error', 'top-right');
              return;
            }

            const mediaType = record.mediaType.toUpperCase() === 'PHIM BỘ' ? 'series' : 'movie';

            movies.push({
              title: record.title || '',
              originalTitle: record.originalTitle || '',
              posterPath: record.posterPath || '',
              backdropPath: record.backdropPath || '',
              mediaType: mediaType,
              status: record.status || 'show',
              numberOfEpisodes: isNaN(Number(record.numberOfEpisodes))
                ? 1
                : Number(record.numberOfEpisodes),
              runtime: isNaN(Number(record.runtime)) ? 0 : Number(record.runtime),
              releaseYear: isNaN(Number(record.releaseYear))
                ? new Date().getFullYear()
                : Number(record.releaseYear),
              trailerPath: record.trailerPath || '',
              actors: record.actors || '',
              directors: record.directors || '',
              overview: record.overview || '',
              genres: matchedGenres,
              countries: matchedCountries,
            });
          }

          onDataParsed(movies);
          onSetFile?.(file);
        } catch (err) {
          console.error(err);
          show('Lỗi khi xử lý file CSV', 'error', 'top-right');
        }
      },
      error: (err) => {
        console.error(err);
        show('Không thể đọc file CSV', 'error', 'top-right');
      },
    });
  };

  const handleRemoveFile = () => {
    setFile(null);
    onSetFile?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg space-y-6 w-full mx-auto border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-2">Thông tin phim</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:text-gray-300 file:py-2 file:px-4 file:rounded hover:file:bg-gray-700"
      />
      {file && (
        <div className="flex gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" onClick={handleRemoveFile} className="w-full rounded-lg">
              Xóa file
            </Button>
          </div>
          <Button type="button" onClick={handleParseCsv} className="w-full rounded-lg">
            Nhập
          </Button>
        </div>
      )}
    </div>
  );
}
