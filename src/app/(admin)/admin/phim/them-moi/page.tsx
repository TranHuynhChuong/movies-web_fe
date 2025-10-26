'use client';

import CsvMovieUploader from '@/components/CsvMovieUploader';
import FormMovies from '@/components/FormMovies';
import MovieList from '@/components/ListMovieCsv';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useAuthToken } from '@/hooks/useAuthToken';
import { addNew, importFromFile } from '@/services/movie/post';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminMoviesAddNewPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useAuthToken();
  const { show } = useToast();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<MovieFormData[]>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const isMultiple = searchParams.get('multiple') === 'true';

  const mutation = useMutation({
    mutationFn: ({ payload }: { payload: MovieFormData }) => addNew(payload, token),
    onSuccess: () => {
      show('Thêm thành công!', 'success', 'top-center');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
      router.replace('/admin/phim');
    },
    onError: (error: any) => {
      console.error('Lỗi thêm mới phim', error.message);
      show('Thêm thất bại!', 'error', 'top-center');
    },
  });

  const handleSubmit = (payload: MovieFormData) => {
    mutation.mutate({ payload });
  };

  const mutationFile = useMutation({
    mutationFn: ({ file }: { file: File }) => importFromFile(file, token),
    onSuccess: () => {
      show('Thêm thành công!', 'success', 'top-center');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
      router.replace('/admin/phim');
    },
    onError: (error: any) => {
      console.error('Lỗi thêm mới phim', error.message);
      show('Thêm thất bại!', 'error', 'top-center');
    },
  });

  const handleSubmitFile = () => {
    if (file) {
      mutationFile.mutate({ file });
    }
  };

  const handleCancel = () => {
    router.replace('/admin/phim');
  };

  return (
    <div className="p-2 md:p-4 bg-bg-04 rounded-lg">
      {!isMultiple ? (
        <FormMovies onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <div className="space-y-4">
          <CsvMovieUploader
            onDataParsed={(movie) => {
              setMovies(movie);
            }}
            onSetFile={setFile}
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={() => {
                file && setOpenConfirm(true);
              }}
              className=" rounded-lg "
            >
              Lưu
            </Button>
            <Button type="button" onClick={handleCancel} className="rounded-lg " variant="outline">
              Hủy
            </Button>
          </div>
          {openConfirm && (
            <Modal
              open={openConfirm}
              confirmLable="Lưu"
              cancelLable="Hủy"
              onClose={() => setOpenConfirm(false)}
              title="Xác nhận lưu"
              onConfirm={handleSubmitFile}
            >
              <p className="text-gray-300">Xác nhận lưu, hành động không thể hoàn tác</p>
            </Modal>
          )}
          {file && <MovieList movies={movies} />}
        </div>
      )}
    </div>
  );
}
