'use client';

import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';

export default function AdminVersionsPage() {
  const { versions } = useAppData();
  const handleEdit = (item: any) => {
    console.log('Edit item:', item);
    // ở đây bạn có thể mở modal chỉnh sửa
  };

  return (
    <div className="space-y-8">
      <SimpleTable title="Danh sách phiên bản phim" data={versions} onEdit={handleEdit} />
    </div>
  );
}
