'use state';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconExclamationMark } from './icon/IconExclamationMark';
import { useAppData } from '@/contexts/AppDataContext';
import SelectMultiple from './ui/SelectMultiple';
import SelectSingle from './ui/SelectSingle';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface FormMoviesProps {
  data?: MovieFormData;
  onSubmit?: (payload: MovieFormData) => void;
  onCancel?: () => void;
}

export default function FormMovies({ data, onSubmit, onCancel }: Readonly<FormMoviesProps>) {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    original_title: '',
    poster_path: '',
    backdrop_path: '',
    media_type: 'movie',
    status: 'show',
    number_of_episodes: 1,
    runtime: 0,
    release_year: new Date().getFullYear(),
    trailer_path: '',
    actors: '',
    directors: '',
    overview: '',
    genres: [],
    country: '',
    versions: [],
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? '', // fallback string
    }));
  };

  const { genres, countries, versions, servers, loading } = useAppData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.title.trim()) newErrors.title = 'Tên phim là bắt buộc';
    if (!formData?.original_title.trim()) newErrors.original_title = 'Tên gốc là bắt buộc';
    if (!formData?.poster_path.trim()) newErrors.poster_path = 'Poster là bắt buộc';
    if (!formData?.backdrop_path.trim()) newErrors.backdrop_path = 'Backdrop là bắt buộc';
    if (!formData?.media_type.trim()) newErrors.media_type = 'Loại phim là bắt buộc';
    if (!formData?.number_of_episodes) newErrors.number_of_episodes = 'Số tập phim là bắt buộc';
    if (!formData?.status.trim()) newErrors.status = 'Trạng thái là bắt buộc';
    if (!formData?.runtime) newErrors.runtime = 'Thời lượng là bắt buộc';
    if (!formData?.release_year) newErrors.release_year = 'Năm phát hành là bắt buộc';
    if (formData?.genres.length <= 0) newErrors.genres = 'Cần chọn ít nhất một thể loại';
    if (!formData?.country) newErrors.country = 'Quốc gia là bắt buộc';
    if (!formData?.trailer_path.trim()) newErrors.trailer_path = 'Trailer URL là bắt buộc';
    if (!formData?.actors.trim()) newErrors.actors = 'Vui lòng nhập diễn viên';
    if (!formData?.directors.trim()) newErrors.directors = 'Vui lòng nhập đạo diễn';
    if (!formData?.overview.trim()) newErrors.overview = 'Mô tả là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit?.(formData);
  };

  return (
    <div>
      <form
        className="max-w-7xl w-full mx-auto p-2 md:p-6  text-white space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
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
                  {formData?.poster_path ? (
                    isValidURL(formData.poster_path) ? (
                      <div className="relative w-auto h-45 aspect-2/3">
                        <Image
                          src={formData.poster_path}
                          alt="Poster preview"
                          fill
                          className="rounded object-cover border border-gray-700"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-[120px] h-[180px] rounded bg-gray-800 border border-red-600 text-red-400 text-sm text-center p-2">
                        URL poster không hợp lệ
                      </div>
                    )
                  ) : null}

                  {formData?.backdrop_path ? (
                    isValidURL(formData.backdrop_path) ? (
                      <div className="relative w-auto h-45 aspect-16/9">
                        <Image
                          src={formData.backdrop_path}
                          alt="Backdrop preview"
                          fill
                          className="rounded object-cover border border-gray-700"
                        />
                      </div>
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
                value={formData?.poster_path}
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
                value={formData?.backdrop_path}
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
          <h2 className="text-lg font-semibold mb-4">Thông tin phim</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium">
                Tên phim
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData?.title}
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
                value={formData?.original_title}
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
                value={formData?.media_type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="movie">Phim lẻ</option>
                <option value="series">Phim bộ</option>
              </select>
              {errors.media_type && (
                <p className="text-red-500 text-xs mt-1">{errors.media_type}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block mb-2 text-sm font-medium">
                Trạng thái
              </label>
              <select
                name="status"
                id="status"
                value={formData?.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value="show">Hiển thị</option>
                <option value="hidden">Ẩn</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3`}>
            <div>
              <label htmlFor="runtime" className="block mb-2 text-sm font-medium">
                Thời lượng (phút)
              </label>
              <input
                id="runtime"
                type="number"
                name="runtime"
                value={formData?.runtime || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.runtime && <p className="text-red-500 text-xs mt-1">{errors.runtime}</p>}
            </div>
            <div>
              <label htmlFor="number_of_episodes" className="block mb-2 text-sm font-medium">
                Số tập
              </label>
              <input
                type="number"
                id="number_of_episodes"
                name="number_of_episodes"
                value={formData?.number_of_episodes || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.number_of_episodes && (
                <p className="text-red-500 text-xs mt-1">{errors.number_of_episodes}</p>
              )}
            </div>
            <div>
              <label htmlFor="release_year" className="block mb-2 text-sm font-medium">
                Năm phát hành
              </label>
              <input
                type="number"
                id="release_year"
                name="release_year"
                value={formData?.release_year || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.release_year && (
                <p className="text-red-500 text-xs mt-1">{errors.release_year}</p>
              )}
            </div>
          </div>

          {!loading && (
            <div className="space-y-4 ">
              <div>
                <SelectMultiple
                  label="Thể loại"
                  options={genres}
                  selected={formData.genres}
                  onChange={(ids) => {
                    setFormData((prev) => ({
                      ...prev,
                      genres: ids ?? '',
                    }));
                  }}
                />
                {errors.genres && <p className="text-red-500 text-xs mt-1">{errors.genres}</p>}
              </div>
              <div>
                <SelectSingle
                  label="Quốc gia"
                  options={countries}
                  selected={formData.country}
                  onChange={(id) => {
                    setFormData((prev) => ({
                      ...prev,
                      country: id ?? '',
                    }));
                  }}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
          )}
          <div>
            <label htmlFor="trailer_path" className="block mb-2 text-sm font-medium">
              Trailer URL
            </label>
            <input
              type="text"
              id="trailer_path"
              name="trailer_path"
              placeholder="https://example.com/backdrop.jpg"
              value={formData?.trailer_path}
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
                value={formData?.actors}
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
                value={formData?.directors}
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
              value={formData?.overview}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
            />
            {errors.overview && <p className="text-red-500 text-xs mt-1">{errors.overview}</p>}
          </div>
        </section>

        <section className="p-4 rounded-lg bg-gray-900 border border-gray-800 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Tập phim</h2>

          {formData?.versions?.map((version, vIndex) => (
            <div key={vIndex} className="border border-gray-700 p-3 rounded space-y-3">
              <div className="flex items-end justify-between gap-2">
                <SelectSingle
                  label={`Version #${vIndex + 1}`}
                  options={versions}
                  selected={version.version_id}
                  onChange={(id) => {
                    setFormData((prev) => {
                      const newData = { ...prev };
                      if (newData.versions) {
                        newData.versions[vIndex].version_id = id;
                      }
                      return newData;
                    });
                  }}
                />
                <button
                  type="button"
                  className="text-red-500 text-sm mb-3"
                  onClick={() => {
                    setFormData((prev) => {
                      const newData = { ...prev };
                      newData.versions?.splice(vIndex, 1);
                      return newData;
                    });
                  }}
                >
                  Xóa
                </button>
              </div>

              {/* Danh sách tập phim */}
              {version.episodes.map((ep, epIndex) => (
                <div key={epIndex} className="border border-gray-600 p-2 rounded space-y-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor="episode_number">Tập số:</label>
                    <input
                      id="episode_number"
                      type="number"
                      value={ep.episode_number}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setFormData((prev) => {
                          const newData = { ...prev };
                          if (newData.versions) {
                            newData.versions[vIndex].episodes[epIndex].episode_number = value;
                          }
                          return newData;
                        });
                      }}
                      className="w-16 px-2 py-1  rounded bg-gray-800 border border-gray-700"
                    />
                    <button
                      type="button"
                      className="text-red-500 text-sm "
                      onClick={() => {
                        setFormData((prev) => {
                          const newData = { ...prev };
                          if (newData.versions) {
                            newData.versions[vIndex].episodes.splice(epIndex, 1);
                          }

                          return newData;
                        });
                      }}
                    >
                      Xóa
                    </button>
                  </div>

                  {/* Danh sách server */}
                  {ep.streaming_sources.map((srv, sIndex) => (
                    <div key={sIndex} className="flex flex-col md:flex-row items-end gap-2">
                      <SelectSingle
                        label={`Server #${srv.order}`}
                        options={servers}
                        selected={srv.server_id}
                        onChange={(id) => {
                          setFormData((prev) => {
                            const newData = { ...prev };
                            if (newData.versions) {
                              newData.versions[vIndex].episodes[epIndex].streaming_sources[
                                sIndex
                              ].server_id = id;
                            }

                            return newData;
                          });
                        }}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={srv.url}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const newData = { ...prev };
                            if (newData.versions) {
                              newData.versions[vIndex].episodes[epIndex].streaming_sources[
                                sIndex
                              ].url = value;
                            }
                            return newData;
                          });
                        }}
                        className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
                      />

                      <button
                        type="button"
                        className="text-red-500 text-sm mb-3"
                        onClick={() => {
                          setFormData((prev) => {
                            const newData = { ...prev };
                            if (newData.versions) {
                              newData.versions[vIndex].episodes[epIndex].streaming_sources.splice(
                                sIndex,
                                1
                              );
                            }
                            return newData;
                          });
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-blue-500 text-sm mt-1"
                    onClick={() => {
                      setFormData((prev) => {
                        const newData = { ...prev };

                        if (newData.versions) {
                          const version = newData.versions[vIndex];
                          const episode = version.episodes[epIndex];

                          // Tạo mảng servers mới
                          const newServers = [
                            ...episode.streaming_sources,
                            {
                              server_id: '',
                              url: '',
                              order: episode.streaming_sources.length + 1,
                            },
                          ];

                          // Tạo mảng episodes mới
                          const newEpisodes = version.episodes.map((ep, idx) =>
                            idx === epIndex ? { ...ep, servers: newServers } : ep
                          );

                          // Tạo mảng versions mới
                          newData.versions = newData.versions.map((ver, idx) =>
                            idx === vIndex ? { ...ver, episodes: newEpisodes } : ver
                          );
                        }

                        return newData;
                      });
                    }}
                  >
                    Thêm server
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="text-blue-500 text-sm mt-2"
                onClick={() => {
                  setFormData((prev) => {
                    const newData = { ...prev };
                    if (newData.versions) {
                      newData.versions = newData.versions.map((version, idx) => {
                        if (idx !== vIndex) return version;
                        return {
                          ...version,
                          episodes: [
                            ...version.episodes,
                            {
                              episode_number: version.episodes.length + 1,
                              streaming_sources: [{ server_id: '', url: '', order: 1 }],
                            },
                          ],
                        };
                      });
                    }

                    return newData;
                  });
                }}
              >
                Thêm tập
              </button>
            </div>
          ))}

          <button
            type="button"
            className="text-blue-500 text-sm mt-2"
            onClick={() => {
              setFormData((prev) => {
                const newData = { ...prev };
                newData.versions = [
                  ...(newData.versions || []),
                  {
                    version_id: '',
                    episodes: [
                      {
                        episode_number: 1,
                        streaming_sources: [{ server_id: '', url: '', order: 1 }],
                      },
                    ],
                  },
                ];

                return newData;
              });
            }}
          >
            Thêm version
          </button>
        </section>

        <div className="flex justify-end pt-2 gap-4">
          <Button type="button" onClick={() => setOpenConfirm(true)} className=" rounded-lg ">
            Lưu
          </Button>
          <Button type="button" onClick={onCancel} className="rounded-lg " variant="outline">
            Hủy
          </Button>
        </div>
      </form>
      {openConfirm && (
        <Modal
          open={openConfirm}
          confirmLable="Lưu"
          cancelLable="Hủy"
          onClose={() => setOpenConfirm(false)}
          title="Xác nhận lưu"
          onConfirm={handleSubmit}
        >
          <p className="text-gray-300">Xác nhận lưu, hành động không thể hoàn tác</p>
        </Modal>
      )}
    </div>
  );
}
