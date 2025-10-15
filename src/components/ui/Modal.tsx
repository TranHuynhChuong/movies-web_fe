'use client';
import React from 'react';
import { IconX } from '../icon/IconX';

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  confirmLable?: string;
  cancelLable?: string;
  children?: React.ReactNode;
}> = ({
  open,
  onClose,
  onConfirm,
  title = 'Xác nhận',
  children,
  confirmLable = ' Xác nhận',
  cancelLable = ' Hủy',
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      // Ngăn đóng khi click nền ngoài
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-bg-03 rounded-2xl shadow-xl w-11/12 max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          aria-label="Đóng"
        >
          <IconX />
        </button>

        {/* Nội dung */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-3">{title}</h2>
          <div className="text-gray-700 mb-6">{children}</div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3">
            {/* Hủy */}
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-700 transition"
            >
              {cancelLable}
            </button>
            {/* Xác nhận */}
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className="rounded-lg bg-primary text-black px-4 py-2 text-sm hover:bg-primary-dark transition"
            >
              {confirmLable}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
