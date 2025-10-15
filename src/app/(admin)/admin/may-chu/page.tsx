'use client';

import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';

export default function AdminServersPage() {
  const { servers } = useAppData();
  const handleEdit = (item: any) => {
    console.log('Edit item:', item);
    // ở đây bạn có thể mở modal chỉnh sửa
  };

  return (
    <div className="space-y-8">
      <SimpleTable title="Danh sách máy chủ phim" data={servers} onEdit={handleEdit} />
    </div>
  );
}
