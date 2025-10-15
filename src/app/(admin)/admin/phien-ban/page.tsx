'use client';

import { Modal } from '@/components/ui/Modal';
import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';
import { useState } from 'react';

export default function AdminVersionsPage() {
  const { versions } = useAppData();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [editingVersion, setEditingVersion] = useState<any>(null);

  /** Chỉnh sửa Version */
  const handleEdit = (item: any) => {
    setIsEdit(true);
    setEditingVersion(item);
    setVersionName(item.name);
    setOpen(true);
  };

  /** Gửi dữ liệu khi xác nhận */
  const handleConfirm = () => {
    if (isEdit) {
      console.log('Cập nhật version:', { ...editingVersion, name: versionName });
      // TODO: gọi API cập nhật version
    } else {
      console.log('Thêm version mới:', { name: versionName });
      // TODO: gọi API thêm version
    }
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <SimpleTable title="Danh sách phiên bản phim" data={versions} onEdit={handleEdit} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={isEdit ? 'Cập nhật phiên bản' : 'Thêm phiên bản'}
        confirmLable={isEdit ? 'Cập nhật' : 'Thêm mới'}
      >
        <div className="space-y-3">
          <label htmlFor="version-name" className="block text-sm font-medium text-gray-300">
            Tên phiên bản
          </label>
          <input
            id="version-name"
            type="text"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="Nhập tên phiên bản..."
            className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>
      </Modal>
    </div>
  );
}
