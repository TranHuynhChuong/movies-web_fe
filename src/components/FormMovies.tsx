'use state';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconExclamationMark } from './icon/IconExclamationMark';
import { useAppData } from '@/contexts/AppDataContext';
import SelectMultiple from './ui/SelectMultiple';
import SelectSingle from './ui/SelectSingle';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import CsvMovieUploader from './CsvMovieUploader';
import CsvEpisodesUploader from './CsvEpisodesUploader';

interface FormMoviesProps {
  data?: MovieFormData;
  onSubmit?: (payload: MovieFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export default function FormMovies({
  data,
  onSubmit,
  onDelete,
  onCancel,
}: Readonly<FormMoviesProps>) {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    originalTitle: '',
    posterPath: '',
    backdropPath: '',
    mediaType: 'movie',
    status: 'show',
    numberOfEpisodes: 1,
    runtime: 0,
    releaseYear: new Date().getFullYear(),
    trailerPath: '',
    actors: '',
    directors: '',
    overview: '',
    genres: [],
    countries: [],
    versions: [],
  });

  const [canDelete, setCanDelete] = useState(false);
  useEffect(() => {
    if (data) {
      setFormData(data);
      if (data.status === 'hide') setCanDelete(true);
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

  const { genres, countries, versions, servers } = useAppData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openImportFromFile, setOpenImportFromFile] = useState(false);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.title.trim()) newErrors.title = 'Tên phim là bắt buộc';
    if (!formData?.originalTitle.trim()) newErrors.originalTitle = 'Tên gốc là bắt buộc';
    if (!formData?.posterPath.trim()) newErrors.posterPath = 'Poster là bắt buộc';
    if (!formData?.mediaType.trim()) newErrors.mediaType = 'Loại phim là bắt buộc';
    if (!formData?.numberOfEpisodes) newErrors.numberOfEpisodes = 'Số tập phim là bắt buộc';
    if (!formData?.status.trim()) newErrors.status = 'Trạng thái là bắt buộc';
    if (!formData?.runtime) newErrors.runtime = 'Thời lượng là bắt buộc';
    if (!formData?.releaseYear) newErrors.releaseYear = 'Năm phát hành là bắt buộc';
    if (formData?.genres.length <= 0) newErrors.genres = 'Cần chọn ít nhất một thể loại';
    if (formData?.countries.length <= 0) newErrors.country = 'Cần chọn ít nhất một quốc gia';
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

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div>
      <form
        className="max-w-7xl w-full mx-auto p-2 md:p-6  text-white space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-end w-full">
          <div className="flex flex-wrap justify-between w-full">
            <h2 className="text-2xl font-semibold mb-8">Thêm phim mới</h2>
            <Button variant="outline" onClick={() => setOpenImportFromFile((pre) => !pre)}>
              Nhập từ file CSV
            </Button>
          </div>
          {openImportFromFile && (
            <div className="flex gap-2 w-full flex-col md:flex-row">
              <CsvMovieUploader
                onDataParsed={(movie) => {
                  setFormData(movie[0]);
                }}
              />

              <CsvEpisodesUploader
                onDataParsed={(parsedVersions) => {
                  setFormData((prev) => ({
                    ...prev,
                    versions: parsedVersions,
                  }));
                }}
              />
            </div>
          )}
        </div>

        {/* Section: Ảnh phim */}
        <section className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-lg font-semibold my-4">Thông tin phim</h2>
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
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
          </h3>

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
                  {formData?.posterPath ? (
                    isValidURL(formData.posterPath) ? (
                      <div className="relative w-auto h-45 aspect-2/3">
                        <Image
                          src={formData.posterPath}
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

                  {formData?.backdropPath ? (
                    isValidURL(formData.backdropPath) ? (
                      <div className="relative w-auto h-45 aspect-16/9">
                        <Image
                          src={formData.backdropPath}
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
              <label htmlFor="posterPath" className="block mb-2 text-sm font-medium">
                Poster URL
              </label>
              <input
                id="posterPath"
                type="text"
                name="posterPath"
                value={formData?.posterPath}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.posterPath && (
                <p className="text-red-500 text-xs mt-1">{errors.posterPath}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="backdropPath" className="block mb-2 text-sm font-medium">
                Backdrop URL
              </label>
              <input
                id="backdropPath"
                type="text"
                name="backdropPath"
                value={formData?.backdropPath}
                onChange={handleChange}
                placeholder="https://example.com/backdrop.jpg"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.backdropPath && (
                <p className="text-red-500 text-xs mt-1">{errors.backdropPath}</p>
              )}
            </div>
          </div>
          <section className="space-y-4 mt-4">
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
                <label htmlFor="originalTitle" className="block mb-2 text-sm font-medium">
                  Tên gốc
                </label>
                <input
                  id="originalTitle"
                  type="text"
                  name="originalTitle"
                  value={formData?.originalTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                {errors.originalTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.originalTitle}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mediaType" className="block mb-2 text-sm font-medium">
                  Loại phim
                </label>
                <select
                  name="mediaType"
                  id="mediaType"
                  value={formData?.mediaType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="movie">Phim lẻ</option>
                  <option value="series">Phim bộ</option>
                </select>
                {errors.mediaType && (
                  <p className="text-red-500 text-xs mt-1">{errors.mediaType}</p>
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
                  <option value="hide">Ẩn</option>
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
                <label htmlFor="numberOfEpisodes" className="block mb-2 text-sm font-medium">
                  Số tập
                </label>
                <input
                  type="number"
                  id="numberOfEpisodes"
                  name="numberOfEpisodes"
                  value={formData?.numberOfEpisodes || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                {errors.numberOfEpisodes && (
                  <p className="text-red-500 text-xs mt-1">{errors.numberOfEpisodes}</p>
                )}
              </div>
              <div>
                <label htmlFor="releaseYear" className="block mb-2 text-sm font-medium">
                  Năm phát hành
                </label>
                <input
                  type="number"
                  id="releaseYear"
                  name="releaseYear"
                  value={formData?.releaseYear || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                {errors.releaseYear && (
                  <p className="text-red-500 text-xs mt-1">{errors.releaseYear}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 ">
              <div>
                <SelectMultiple
                  label="Thể loại"
                  options={genres}
                  selected={formData.genres.map((g) => g.id)}
                  onChange={(ids) => {
                    const selectedGenres = genres.filter((g) => ids.includes(g.id));
                    setFormData((prev) => ({
                      ...prev,
                      genres: selectedGenres,
                    }));
                  }}
                />
                {errors.genres && <p className="text-red-500 text-xs mt-1">{errors.genres}</p>}
              </div>
              <div>
                <SelectMultiple
                  label="Quốc gia"
                  options={countries}
                  selected={formData.countries.map((c) => c.id)}
                  onChange={(ids) => {
                    const selectedCountries = countries.filter((c) => ids.includes(c.id));
                    setFormData((prev) => ({
                      ...prev,
                      countries: selectedCountries,
                    }));
                  }}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="trailerPath" className="block mb-2 text-sm font-medium">
                Trailer URL
              </label>
              <input
                type="text"
                id="trailerPath"
                name="trailerPath"
                placeholder="https://example.com/backdrop.jpg"
                value={formData?.trailerPath}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.trailerPath && (
                <p className="text-red-500 text-xs mt-1">{errors.trailerPath}</p>
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
                {errors.directors && (
                  <p className="text-red-500 text-xs mt-1">{errors.directors}</p>
                )}
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
                rows={5}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
              />
              {errors.overview && <p className="text-red-500 text-xs mt-1">{errors.overview}</p>}
            </div>
          </section>
        </section>

        <section className="p-4 rounded-lg bg-gray-900 border border-gray-800 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Tập phim</h2>

          {formData?.versions?.map((version, vIndex) => (
            <div key={vIndex + version.id} className="border border-gray-700 p-3 rounded space-y-3">
              <div className="flex items-end justify-between gap-2">
                <SelectSingle
                  label={`Version #${vIndex + 1}`}
                  options={versions}
                  selected={version.id}
                  onChange={(id) => {
                    setFormData((prev) => {
                      const newData = { ...prev };
                      if (newData.versions) {
                        newData.versions[vIndex].id = id;
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
                      newData.versions = newData.versions?.filter((_, i) => i !== vIndex);
                      return newData;
                    });
                  }}
                >
                  Xóa
                </button>
              </div>

              {/* Danh sách tập phim */}
              {version.episodes.map((ep, epIndex) => (
                <div
                  key={ep.episodeName + '-' + epIndex}
                  className="border border-gray-600 p-2 rounded space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <label htmlFor="episodeName">Tập:</label>
                    <input
                      id="episodeName"
                      type="text"
                      value={ep.episodeName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => {
                          const newData = { ...prev };
                          if (newData.versions) {
                            newData.versions[vIndex].episodes[epIndex].episodeName = value;
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
                            newData.versions[vIndex].episodes = newData.versions[
                              vIndex
                            ].episodes.filter(
                              (_, i) => !(i === epIndex && _.episodeName === ep.episodeName)
                            );
                          }

                          return newData;
                        });
                      }}
                    >
                      Xóa
                    </button>
                  </div>

                  {/* Danh sách server */}
                  {ep.streamingSources.map((ss, ssIndex) => (
                    <div
                      key={ss.orderIndex + ss.serverId}
                      className="flex flex-col md:flex-row items-end gap-2"
                    >
                      <SelectSingle
                        label={`Server #${ss.orderIndex}`}
                        options={servers}
                        selected={ss.serverId}
                        onChange={(id) => {
                          setFormData((prev) => {
                            const newData = { ...prev };
                            if (newData.versions) {
                              newData.versions[vIndex].episodes[epIndex].streamingSources[
                                ssIndex
                              ].serverId = id;
                            }

                            return newData;
                          });
                        }}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={ss.url}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const newData = { ...prev };
                            if (newData.versions) {
                              newData.versions[vIndex].episodes[epIndex].streamingSources[
                                ssIndex
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
                              newData.versions[vIndex].episodes[epIndex].streamingSources =
                                newData.versions[vIndex].episodes[epIndex].streamingSources.filter(
                                  (_, i) => !(i === ssIndex && _.serverId === ss.serverId)
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
                          const newStreamingSources = [
                            ...episode.streamingSources,
                            {
                              serverId: servers[0].id,
                              url: '',
                              orderIndex: (episode.streamingSources?.length || 0) + 1,
                            },
                          ];

                          // Tạo mảng episodes mới
                          const newEpisodes = version.episodes.map((ep, idx) =>
                            idx === epIndex ? { ...ep, streamingSources: newStreamingSources } : ep
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
                              episodeName: (version.episodes.length + 1).toString(),
                              streamingSources: [
                                { serverId: servers[0].id, url: '', orderIndex: 1 },
                              ],
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
                    id: '',
                    episodes: [
                      {
                        episodeName: '1',
                        streamingSources: [{ serverId: servers[0].id, url: '', orderIndex: 1 }],
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
          {canDelete && (
            <Button
              type="button"
              onClick={() => setOpenDelete(true)}
              className=" rounded-lg bg-red-500 hover:bg-red-400"
            >
              Xóa
            </Button>
          )}
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
      {openDelete && (
        <Modal
          open={openDelete}
          confirmLable="Xóa"
          cancelLable="Hủy"
          onClose={() => setOpenDelete(false)}
          title="Xác nhận xóa"
          onConfirm={handleDelete}
        >
          <p className="text-gray-300">Xác nhận xóa, hành động không thể hoàn tác</p>
        </Modal>
      )}
    </div>
  );
}
