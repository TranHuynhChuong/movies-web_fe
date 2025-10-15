'use client';

import { Modal } from '@/components/ui/Modal';
import { SimpleTable } from '@/components/ui/SimpleTable';
import { useAppData } from '@/contexts/AppDataContext';
import { useState } from 'react';

export default function AdminCountryPage() {
  const { countries } = useAppData();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [editingCountry, setEditingCountry] = useState<any>(null);

  /** Chỉnh sửa country */
  const handleEdit = (item: any) => {
    setIsEdit(true);
    setEditingCountry(item);
    setCountryName(item.name);
    setOpen(true);
  };

  /** Gửi dữ liệu khi xác nhận */
  const handleConfirm = () => {
    if (isEdit) {
      console.log('Cập nhật country:', { ...editingCountry, name: countryName });
      // TODO: gọi API cập nhật country
    } else {
      console.log('Thêm country mới:', { name: countryName });
      // TODO: gọi API thêm country
    }
    setOpen(false);
  };
  return (
    <div className="space-y-8">
      <SimpleTable title="Danh sách quốc gia" data={countries} onEdit={handleEdit} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={isEdit ? 'Cập nhật quốc gia' : 'Thêm quốc gia'}
        confirmLable={isEdit ? 'Cập nhật' : 'Thêm mới'}
      >
        <div className="space-y-3">
          <label htmlFor="country-name" className="block text-sm font-medium text-gray-300">
            Tên quốc gia
          </label>
          <input
            id="country-name"
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Nhập tên quốc gia..."
            className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
          />
        </div>
      </Modal>
    </div>
  );
}
