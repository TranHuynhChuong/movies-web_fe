'use client';

import FormMovies from '@/components/FormMovies';
import { getMovieDetail } from '@/services/movie/get';
import { update } from '@/services/movie/patch';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function AdminMoviesDetailPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie_detail', id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: MovieFormData }) => update(id, payload),
    onSuccess: () => {
      alert('Thêm phim thành công!');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
    },
    onError: (error: any) => {
      alert(`Lỗi thêm mới, vui lòng thử lại`);
    },
  });

  const handleSubmit = (payload: MovieFormData) => {
    mutation.mutate({ id, payload });
    router.replace('/admin/phim');
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
      <FormMovies onSubmit={handleSubmit} onCancel={handleCancel} data={data.data} />
    </div>
  );
}
