'use client';

import FormMovies from '@/components/FormMovies';
import { getMovieDetail } from '@/services/movie/get';
import { update } from '@/services/movie/patch';
import { remove } from '@/services/movie/delete';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { useAuthToken } from '@/hooks/useAuth';
import { Suspense, useState } from 'react';
import Loader from '@/components/ui/loader';

function AdminMoviesDetail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthToken();
  const { show } = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie_detail', id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: MovieFormData }) =>
      update(id, payload, token),
    onSuccess: () => {
      show('Cập nhật thành công!', 'success', 'top-center');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
      queryClient.invalidateQueries({ queryKey: ['movie_detail', id] });
      router.back();
    },
    onError: (error: any) => {
      console.error('Lỗi cập nhật phim', error.message);
      show('Cập nhật thất bại!', 'error', 'top-center');
    },
    onSettled: () => {
      setIsSubmiting(false);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: ({ id }: { id: string }) => remove(id, token),
    onSuccess: () => {
      show('Xóa thành công!', 'success', 'top-center');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
      queryClient.invalidateQueries({ queryKey: ['movie_detail', id] });
      router.back();
    },
    onError: (error: any) => {
      console.error('Lỗi xóa phim', error.message);
      show('Xóa thất bại!', 'error', 'top-center');
    },
    onSettled: () => {
      setIsSubmiting(false);
    },
  });

  const handleSubmit = (payload: MovieFormData) => {
    setIsSubmiting(true);
    mutationUpdate.mutate({ id, payload });
  };

  const handleDelete = () => {
    setIsSubmiting(true);
    mutationDelete.mutate({ id });
  };

  const handleCancel = () => {
    router.replace('/admin/phim');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600">
        <p className="text-lg font-medium">Đang tải dữ liệu phim...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Lỗi khi tải dữ liệu</h2>
        <p className="text-gray-600 mb-4">Không thể tải thông tin phim. Vui lòng thử lại sau.</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['movie_detail', id] })}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-transform"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4 bg-bg-04 rounded-lg">
      {isSubmiting && <Loader />}
      <FormMovies
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        data={data.data}
        onDelete={handleDelete}
      />
    </div>
  );
}
export default function AdminMoviesDetailPage() {
  return (
    <Suspense fallback={null}>
      <AdminMoviesDetail />
    </Suspense>
  );
}
