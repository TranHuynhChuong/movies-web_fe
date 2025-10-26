'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

interface AccountFormProps {
  account: Account;
  onUpdate: (payload: { username: string; password?: string }) => void;
  onCancel?: () => void;
}

export default function AccountForm({ account, onUpdate, onCancel }: Readonly<AccountFormProps>) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [errors, setErrors] = useState<{ password?: string }>({});

  useEffect(() => {
    if (account) {
      setUsername(account.username);
      setRole(account.role);
    }
  }, [account]);

  const validate = () => {
    const newErrors: { password?: string } = {};
    if (password && password !== confirmPassword) {
      newErrors.password = 'Mật khẩu xác nhận không khớp';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    onUpdate({
      username: username.trim(),
      password: password ? password : undefined,
    });
    setOpenConfirm(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-900 rounded-lg border border-gray-800 text-white space-y-4">
      <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
      <div>
        <label htmlFor="username" className="block mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="role" className="block mb-1">
          Vai trò
        </label>
        <input
          id="role"
          type="text"
          value={role}
          readOnly
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1">
          Mật khẩu mới
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Để trống nếu không đổi"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Xác nhận mật khẩu"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={() => setOpenConfirm(true)}>Cập nhật</Button>
      </div>

      {openConfirm && (
        <Modal
          open={openConfirm}
          title="Xác nhận cập nhật"
          confirmLable="Cập nhật"
          cancelLable="Hủy"
          onClose={() => setOpenConfirm(false)}
          onConfirm={handleConfirm}
        >
          <p className="text-gray-300">
            Bạn có chắc chắn muốn cập nhật thông tin tài khoản? Hành động này không thể hoàn tác.
          </p>
        </Modal>
      )}
    </div>
  );
}
