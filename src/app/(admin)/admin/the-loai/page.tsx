'use client';

import { Modal } from '@/components/ui/Modal';
import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';
import { update } from '@/services/genre/patch';
import { addNew } from '@/services/genre/post';
import { remove } from '@/services/genre/delete';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { useAuthToken } from '@/hooks/useAuthToken';

export default function AdminGenresPage() {
  const { genres, refetchGenres } = useAppData();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const token = useAuthToken();
  const { show } = useToast();

  const handleEdit = (item: any) => {
    setIsEdit(true);
    setEditing(item);
    setName(item.name);
    setOpen(true);
  };

  const handleDelete = (item: any) => {
    setDeleting(item);
    setOpenDelete(true);
  };

  const handleConfirm = async () => {
    if (isEdit) {
      try {
        await update(editing.id, { name: name }, token);
        show('Cập nhật thành công!', 'success', 'top-center');
        await refetchGenres();
      } catch (error: any) {
        console.error('Lỗi khi cập nhật thể loại:', error);
        show('Cập nhật thất bại!', 'error', 'top-center');
      }
    } else {
      try {
        await addNew({ name: name }, token);
        show('Thêm thành công!', 'success', 'top-center');
        await refetchGenres();
      } catch (error: any) {
        console.error('Lỗi khi thêm mới thể loại:', error);
        show('Thêm thất bại!', 'error', 'top-center');
      }
    }
    await refetchGenres();
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await remove(deleting.id, token);
      show('Xóa thành công!', 'success', 'top-center');
      await refetchGenres();
    } catch (error: any) {
      console.error('Lỗi khi xóa:', error);
      show('Xóa thất bại!', 'error', 'top-center');
    } finally {
      setOpenDelete(false);
    }
  };

  return (
    <div className="space-y-8">
      <SimpleTable
        title="Danh sách thể loại phim"
        data={genres}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={isEdit ? 'Cập nhật' : 'Thêm mới'}
        confirmLable={isEdit ? 'Cập nhật' : 'Thêm mới'}
      >
        <div className="space-y-3">
          <label htmlFor="genre-name" className="block text-sm font-medium text-gray-300">
            Tên thể loại
          </label>
          <input
            id="genre-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
            className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
          />
        </div>
      </Modal>
      <Modal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        confirmLable="Xóa"
      >
        <p className="text-gray-300">
          Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác!
        </p>
      </Modal>
    </div>
  );
}
