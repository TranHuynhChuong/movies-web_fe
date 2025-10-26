'use client';

import CsvMovieUploader from '@/components/CsvMovieUploader';
import FormMovies from '@/components/FormMovies';
import MovieList from '@/components/ListMovieCsv';
import { Button } from '@/components/ui/Button';
import Loader from '@/components/ui/loader';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useAuthToken } from '@/hooks/useAuthToken';
import { addNew, importFromFile } from '@/services/movie/post';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function AdminMoviesAddNew() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useAuthToken();
  const { show } = useToast();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<MovieFormData[]>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
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
    onSettled: () => {
      setIsSubmiting(false);
    },
  });

  const handleSubmit = (payload: MovieFormData) => {
    setIsSubmiting(true);
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
    onSettled: () => {
      setIsSubmiting(false);
    },
  });

  const handleSubmitFile = () => {
    if (file) {
      setIsSubmiting(true);
      mutationFile.mutate({ file });
    }
  };

  const handleCancel = () => {
    router.replace('/admin/phim');
  };

  return (
    <div className="p-2 md:p-4 bg-bg-04 rounded-lg">
      {isSubmiting && <Loader />}
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
                if (file) {
                  setOpenConfirm(true);
                }
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

export default function AdminMoviesAddNewPage() {
  return (
    <Suspense fallback={null}>
      <AdminMoviesAddNew />
    </Suspense>
  );
}
