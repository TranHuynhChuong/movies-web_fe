'use client';

import { Modal } from '@/components/ui/Modal';
import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';
import { update } from '@/services/country/patch';
import { addNew } from '@/services/country/post';
import { remove } from '@/services/country/delete';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { useAuthToken } from '@/hooks/useAuthToken';
import Loader from '@/components/ui/loader';

export default function AdmincountrysPage() {
  const { countries, refetchCountries } = useAppData();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const token = useAuthToken();
  const { show } = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);
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
        setIsSubmiting(true);
        await update(editing.id, { name: name }, token);
        show('Cập nhật thành công!', 'success', 'top-center');
        await refetchCountries();
      } catch (error: any) {
        console.error('Lỗi khi cập nhật thể loại:', error);
        show('Cập nhật thất bại!', 'error', 'top-center');
      } finally {
        setIsSubmiting(false);
      }
    } else {
      try {
        setIsSubmiting(true);
        await addNew({ name: name }, token);
        show('Thêm thành công!', 'success', 'top-center');
        await refetchCountries();
      } catch (error: any) {
        console.error('Lỗi khi thêm mới thể loại:', error);
        show('Thêm thất bại!', 'error', 'top-center');
      } finally {
        setIsSubmiting(false);
      }
    }
    await refetchCountries();
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsSubmiting(true);
      await remove(deleting.id, token);
      show('Xóa thành công!', 'success', 'top-center');
      await refetchCountries();
    } catch (error: any) {
      console.error('Lỗi khi xóa:', error);
      show('Xóa thất bại!', 'error', 'top-center');
    } finally {
      setOpenDelete(false);
      setIsSubmiting(false);
    }
  };

  return (
    <div className="space-y-8">
      {isSubmiting && <Loader />}
      <SimpleTable
        title="Danh sách quốc gia"
        data={countries}
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
          <label htmlFor="country-name" className="block text-sm font-medium text-gray-300">
            Tên quốc gia
          </label>
          <input
            id="country-name"
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
