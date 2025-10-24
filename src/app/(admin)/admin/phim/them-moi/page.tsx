'use client';

import FormMovies from '@/components/FormMovies';
import { useToast } from '@/components/ui/Toast';
import { addNew } from '@/services/movie/post';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminMoviesAddNewPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const { show } = useToast();

  const mutation = useMutation({
    mutationFn: ({ payload, accessToken }: { payload: MovieFormData; accessToken: string }) =>
      addNew(payload, accessToken),
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
    if (!session?.accessToken) {
      router.replace('/admin-login');
      return;
    }
    mutation.mutate({ payload, accessToken: session.accessToken });
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
