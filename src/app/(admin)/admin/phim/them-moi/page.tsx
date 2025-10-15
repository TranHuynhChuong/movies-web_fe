'use client';

import FormMovies from '@/components/FormMovies';
import { addNew } from '@/services/movie/post';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function AdminMoviesAddNewPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: MovieFormData) => addNew(payload),
    onSuccess: () => {
      alert('Thêm phim thành công!');
      queryClient.invalidateQueries({ queryKey: ['movies_list'] });
    },
    onError: (error: any) => {
      alert(`Lỗi thêm mới, vui lòng thử lại`);
    },
  });

  const handleSubmit = (payload: MovieFormData) => {
    mutation.mutate(payload);
    router.replace('/admin/phim');
  };

  const handleCancel = () => {
    router.replace('/admin/phim');
  };

  return (
    <div className="p-2 md:p-4 bg-bg-04 rounded-lg">
      <FormMovies onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
