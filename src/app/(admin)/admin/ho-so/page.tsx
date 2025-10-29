'use client';

import { useState } from 'react';
import AccountForm from '@/components/AccountForm';
import { updateAccount } from '@/services/auth/patch';
import { useAuthToken } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import Loader from '@/components/ui/loader';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, token } = useAuthToken();
  const { show } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleUpdate = async (payload: { username: string; password?: string }) => {
    try {
      setIsSubmitting(true);
      await updateAccount(user.id, payload, token);
      show('Cập nhật thành công!', 'success', 'top-center');
    } catch (error: any) {
      console.error('Lỗi khi cập nhậ:', error);
      show(error?.message || 'Cập nhật thất bại!', 'error', 'top-center');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {isSubmitting && <Loader />}
      <AccountForm account={user} onUpdate={handleUpdate} onCancel={() => router.back()} />
    </div>
  );
}
