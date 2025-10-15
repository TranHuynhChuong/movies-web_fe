'use client';

import { Modal } from '@/components/ui/Modal';
import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';
import { useState } from 'react';

export default function AdminGenresPage() {
  const { genres } = useAppData();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [genreName, setGenreName] = useState('');
  const [editingGenre, setEditingGenre] = useState<any>(null);

  /** Chỉnh sửa genre */
  const handleEdit = (item: any) => {
    setIsEdit(true);
    setEditingGenre(item);
    setGenreName(item.name);
    setOpen(true);
  };

  /** Gửi dữ liệu khi xác nhận */
  const handleConfirm = () => {
    if (isEdit) {
      console.log('Cập nhật genre:', { ...editingGenre, name: genreName });
      // TODO: gọi API cập nhật genre
    } else {
      console.log('Thêm genre mới:', { name: genreName });
      // TODO: gọi API thêm genre
    }
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <SimpleTable title="Danh sách thể loại phim" data={genres} onEdit={handleEdit} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={isEdit ? 'Cập nhật thể loại' : 'Thêm thể loại'}
        confirmLable={isEdit ? 'Cập nhật' : 'Thêm mới'}
      >
        <div className="space-y-3">
          <label htmlFor="genre-name" className="block text-sm font-medium text-gray-300">
            Tên thể loại
          </label>
          <input
            id="genre-name"
            type="text"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            placeholder="Nhập tên máy chủ..."
            className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
          />
        </div>
      </Modal>
    </div>
  );
}
