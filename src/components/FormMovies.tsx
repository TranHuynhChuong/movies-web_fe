'use state';

import { useState } from 'react';
import Image from 'next/image';
import { IconExclamationMark } from './icon/IconExclamationMark';
import { useAppData } from '@/contexts/AppDataContext';
import SelectMultiple from './ui/SelectMultiple';
import SelectSingle from './ui/SelectSingle';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

export default function FormMovies() {
  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    poster_path: '',
    backdrop_path: '',
    media_type: 'movie',
    status: 'show',
    runtime: undefined,
    number_of_episodes: 1,
    release_year: undefined,
    trailer_path: '',
    genres: [],
    overview: '',
    actors: '',
    directors: '',
    country: undefined,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { genres, countries, loading } = useAppData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Tên phim là bắt buộc';
    if (!formData.original_title.trim()) newErrors.original_title = 'Tên gốc là bắt buộc';
    if (!formData.poster_path.trim()) newErrors.poster_path = 'Poster là bắt buộc';
    if (!formData.backdrop_path.trim()) newErrors.backdrop_path = 'Backdrop là bắt buộc';
    if (!formData.status.trim()) newErrors.status = 'Trạng thái là bắt buộc';
    if (!formData.runtime) newErrors.runtime = 'Thời lượng là bắt buộc';
    if (!formData.release_year) newErrors.release_year = 'Năm phát hành là bắt buộc';
    if (!selectedGenres.length) newErrors.genres = 'Cần chọn ít nhất một thể loại';
    if (!selectedCountry) newErrors.country = 'Quốc gia là bắt buộc';
    if (!formData.trailer_path.trim()) newErrors.trailer_path = 'Trailer URL là bắt buộc';
    if (!formData.actors.trim()) newErrors.actors = 'Vui lòng nhập diễn viên';
    if (!formData.directors.trim()) newErrors.directors = 'Vui lòng nhập đạo diễn';
    if (!formData.overview.trim()) newErrors.overview = 'Mô tả là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    alert('Dữ liệu hợp lệ, gửi lên server!');
  };

  return (
    <form className="max-w-7xl w-full mx-auto p-6  text-white space-y-3">
      <h2 className="text-2xl font-semibold mb-8">Thêm phim mới</h2>

      {/* Section: Ảnh phim */}
      <section className="p-4 rounded-lg bg-gray-900 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          Ảnh phim
          <div className="relative inline-block group">
            <button type="button" className="cursor-pointer font-bold">
              <IconExclamationMark />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-2 rounded bg-gray-800 text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700 z-10 pointer-events-none">
              Nguồn ảnh cần lấy từ:
              <br />• <code>https://media.themoviedb.org/**</code>
              <br />• <code>https://www.themoviedb.org/**</code>
              <br />• <code>https://i.mydramalist.com/**</code>
              <br />• <code>https://phim.nguonc.com/**</code>
            </div>
          </div>
        </h2>

        {/* Hàm kiểm tra nguồn ảnh hợp lệ */}
        {(() => {
          const allowedDomains = [
            'media.themoviedb.org',
            'www.themoviedb.org',
            'i.mydramalist.com',
            'phim.nguonc.com',
          ];

          const isValidURL = (url?: string) => {
            if (!url) return false;
            try {
              const { hostname } = new URL(url);
              return allowedDomains.includes(hostname);
            } catch {
              return false;
            }
          };

          return (
            <>
              {/* Xem trước ảnh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {formData.poster_path ? (
                  isValidURL(formData.poster_path) ? (
                    <Image
                      src={formData.poster_path}
                      alt="Poster preview"
                      width={120}
                      height={180}
                      className="rounded object-cover border border-gray-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-[120px] h-[180px] rounded bg-gray-800 border border-red-600 text-red-400 text-sm text-center p-2">
                      URL poster không hợp lệ
                    </div>
                  )
                ) : null}

                {formData.backdrop_path ? (
                  isValidURL(formData.backdrop_path) ? (
                    <Image
                      src={formData.backdrop_path}
                      alt="Backdrop preview"
                      width={320}
                      height={180}
                      className="rounded object-cover border border-gray-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-[320px] h-[180px] rounded bg-gray-800 border border-red-600 text-red-400 text-sm text-center p-2">
                      URL backdrop không hợp lệ
                    </div>
                  )
                ) : null}
              </div>
            </>
          );
        })()}

        {/* Nhập URL ảnh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="poster_path" className="block mb-2 text-sm font-medium">
              Poster URL
            </label>
            <input
              id="poster_path"
              type="text"
              name="poster_path"
              value={formData.poster_path}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.poster_path && (
              <p className="text-red-500 text-xs mt-1">{errors.poster_path}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="backdrop_path" className="block mb-2 text-sm font-medium">
              Backdrop URL
            </label>
            <input
              id="backdrop_path"
              type="text"
              name="backdrop_path"
              value={formData.backdrop_path}
              onChange={handleChange}
              placeholder="https://example.com/backdrop.jpg"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.backdrop_path && (
              <p className="text-red-500 text-xs mt-1">{errors.backdrop_path}</p>
            )}
          </div>
        </div>
      </section>

      <section className="p-4 rounded-lg bg-gray-900 border border-gray-800 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Tên phim
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="original_title" className="block mb-2 text-sm font-medium">
              Tên gốc
            </label>
            <input
              id="original_title"
              type="text"
              name="original_title"
              value={formData.original_title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.original_title && (
              <p className="text-red-500 text-xs mt-1">{errors.original_title}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="media_type" className="block mb-2 text-sm font-medium">
              Loại phim
            </label>
            <select
              name="media_type"
              id="media_type"
              value={formData.media_type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="movie">Phim lẻ</option>
              <option value="series">Phim bộ</option>
            </select>
            {errors.media_type && <p className="text-red-500 text-xs mt-1">{errors.media_type}</p>}
          </div>

          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium">
              Trạng thái
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="show">Hiển thị</option>
              <option value="hidden">Ẩn</option>
            </select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-4 ${
            formData.media_type === 'series' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
          }`}
        >
          <div>
            <label htmlFor="runtime" className="block mb-2 text-sm font-medium">
              Thời lượng (phút)
            </label>
            <input
              id="runtime"
              type="number"
              name="runtime"
              value={formData.runtime || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.runtime && <p className="text-red-500 text-xs mt-1">{errors.runtime}</p>}
          </div>
          {formData.media_type === 'series' && (
            <div>
              <label htmlFor="number_of_episodes" className="block mb-2 text-sm font-medium">
                Số tập
              </label>
              <input
                type="number"
                id="number_of_episodes"
                name="number_of_episodes"
                value={formData.number_of_episodes || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.number_of_episodes && (
                <p className="text-red-500 text-xs mt-1">{errors.number_of_episodes}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="release_year" className="block mb-2 text-sm font-medium">
              Năm phát hành
            </label>
            <input
              type="number"
              id="release_year"
              name="release_year"
              value={formData.release_year || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.release_year && (
              <p className="text-red-500 text-xs mt-1">{errors.release_year}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 ">
          <div>
            <SelectMultiple
              label="Thể loại"
              options={genres}
              selected={selectedGenres}
              onChange={(ids) => setSelectedGenres(ids)}
            />
            {errors.genres && <p className="text-red-500 text-xs mt-1">{errors.genres}</p>}
          </div>
          <div>
            <SelectSingle
              label="Quốc gia"
              options={countries}
              selected={selectedCountry}
              onChange={(id) => setSelectedCountry(id)}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="trailer_path" className="block mb-2 text-sm font-medium">
            Trailer URL
          </label>
          <input
            type="text"
            id="trailer_path"
            name="trailer_path"
            placeholder="https://example.com/backdrop.jpg"
            value={formData.trailer_path}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          {errors.trailer_path && (
            <p className="text-red-500 text-xs mt-1">{errors.trailer_path}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="actors" className="block mb-2 text-sm font-medium">
              Diễn viên
            </label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              placeholder="Cách nhau bằng dấu phẩy"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.actors && <p className="text-red-500 text-xs mt-1">{errors.actors}</p>}
          </div>
          <div>
            <label htmlFor="directors" className="block mb-2 text-sm font-medium">
              Đạo diễn
            </label>
            <input
              type="text"
              id="directors"
              name="directors"
              value={formData.directors}
              onChange={handleChange}
              placeholder="Cách nhau bằng dấu phẩy"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.directors && <p className="text-red-500 text-xs mt-1">{errors.directors}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="overview" className="block mb-2 text-sm font-medium">
            Mô tả
          </label>
          <textarea
            id="overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
          />
          {errors.overview && <p className="text-red-500 text-xs mt-1">{errors.overview}</p>}
        </div>
      </section>

      <div className="flex justify-end pt-2">
        <Button type="button" onClick={() => setOpenConfirm(true)} className=" rounded-lg ">
          Thêm mới
        </Button>
      </div>

      {openConfirm && (
        <Modal
          open={openConfirm}
          confirmLable="Thêm"
          cancelLable="Hủy"
          onClose={() => setOpenConfirm(false)}
          title="Xác nhận thêm mới"
          onConfirm={handleSubmit}
        >
          <p className="text-gray-300">Xác nhận thêm mới, hành động không thể hoàn tác</p>
        </Modal>
      )}
    </form>
  );
}
