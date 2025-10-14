'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAppData } from '@/contexts/AppDataContext';
import { IconFilter } from './icon/IconFilter';
import { IconArrowRightFlow } from './icon/IconArrowRightFlow';
import { IconSearch } from './icon/IconSearch';

type PanelFilterMoviesProps = {
  initialSelectedType?: string;
  initialSelectedCountry?: string;
  initialSelectedGenre?: string;
  onConfirm: (media_type?: string, country?: string, genre?: string) => void;
};

export const PanelFilterMovies: React.FC<PanelFilterMoviesProps> = ({
  initialSelectedType = 'all',
  initialSelectedCountry = 'all',
  initialSelectedGenre = 'all',
  onConfirm,
}) => {
  const movieTypes = [
    { id: 'all', value: 'Tất cả' },
    { id: 'series', value: 'Phim bộ' },
    { id: 'movies', value: 'Phim lẻ' },
  ];

  let { genres, countries, loading } = useAppData();

  genres = [{ id: 'all', value: 'Tất cả' }, ...genres];
  countries = [{ id: 'all', value: 'Tất cả' }, ...countries];

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedType, setSelectedType] = useState(initialSelectedType);
  const [selectedGenre, setSelectedGenre] = useState(initialSelectedGenre);
  const [selectedCountry, setSelectedCountry] = useState(initialSelectedCountry);

  const handleToggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleConfirmFilter = () => {
    onConfirm(selectedType, selectedCountry, selectedGenre);
  };

  if (loading) return null;

  return (
    <div className="w-fit text-sm rounded-md text-gray-300">
      <div className="flex gap-4 items-center justify-end">
        <button
          className={`flex gap-2 items-center cursor-pointer font-semibold transition-colors w-fit m-0 px-3 py-2  ${
            openFilter ? 'text-primary' : 'text-gray-300'
          }`}
          onClick={handleToggleFilter}
        >
          <IconFilter />
          <p className="text-gray-300">Bộ lọc</p>
        </button>
      </div>
      <div
        className={`w-fit overflow-hidden  rounded-md ${
          openFilter ? 'h-fit border border-gray-600 mt-4' : 'h-0 mt-0'
        }`}
      >
        <div className=" divide-y divide-dashed divide-gray-600 ">
          <div className="grid grid-cols-12 gap-4 p-5">
            <div className="col-span-3 sm:col-span-2 xl:col-span-1 font-semibold">Loại phim</div>
            <div className="flex gap-2 flex-wrap col-span-9 sm:col-span-10 xl:col-span-11">
              {movieTypes.map((movieType, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="xs"
                  className={`rounded-sm !text-gray-300 font-normal ${
                    selectedType === movieType.id ? '!text-primary !border !border-primary' : ''
                  }`}
                  onClick={() => setSelectedType(movieType.id)}
                >
                  {movieType.value}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4  p-5">
            <div className="col-span-3 sm:col-span-2 xl:col-span-1 font-semibold">Quốc gia</div>
            <div className="flex gap-2 flex-wrap col-span-9 sm:col-span-10 xl:col-span-11">
              {countries.map((country, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="xs"
                  className={`rounded-sm !text-gray-300 font-normal ${
                    selectedCountry === country.id ? '!text-primary !border !border-primary' : ''
                  }`}
                  onClick={() => setSelectedCountry(country.id)}
                >
                  {country.value}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4  p-5">
            <div className="col-span-3 sm:col-span-2 xl:col-span-1 font-semibold">Thể loại</div>
            <div className="flex gap-2 flex-wrap col-span-9 sm:col-span-10 xl:col-span-11">
              {genres.map((genre, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="xs"
                  className={`rounded-sm !text-gray-300 font-normal ${
                    selectedGenre === genre.id ? '!text-primary !border !border-primary' : ''
                  }`}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  {genre.value}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 p-5">
            <div className="col-span-3 sm:col-span-2 xl:col-span-1 font-semibold"></div>
            <div className="flex gap-2 flex-wrap col-span-9 sm:col-span-10 xl:col-span-11">
              <Button
                size="sm"
                className="font-normal text-sm !px-5 flex gap-2 items-center !py-2 !rounded-lg"
                onClick={handleConfirmFilter}
              >
                <p>Lọc kết quả</p>
                <IconArrowRightFlow width={18} height={18} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="font-normal text-sm !px-5 !py-2 !rounded-lg"
                onClick={handleToggleFilter}
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
