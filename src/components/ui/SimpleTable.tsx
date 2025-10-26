// components/SimpleTable.tsx
'use client';

import React from 'react';
import { Option } from '@/types/utils';

interface SimpleTableProps {
  title?: string;
  data: Option[];
  onEdit?: (item: Option) => void;
  onDelete?: (item: Option) => void;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ title, data, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-white dark:bg-bg-02">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Ngày cập nhật
              </th>
              {onEdit && (
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"></th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-bg-02 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-400">
                  <div className="text-sm">
                    <p>
                      {item.createdAt ? new Date(item.createdAt).toLocaleTimeString('vi-VN') : ''}
                    </p>
                    <p>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : ''}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white dark:text-gray-400">
                  <div className="text-sm">
                    <p>
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleTimeString('vi-VN') : ''}
                    </p>
                    <p>
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('vi-VN') : ''}
                    </p>
                  </div>
                </td>
                {onEdit && (
                  <td className="px-6 py-4 flex flex-col gap-1 items-start text-sm text-gray-900 dark:text-white">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-primary hover:underline whitespace-nowrap"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => onDelete?.(item)}
                      className="text-red-500 hover:underline whitespace-nowrap"
                    >
                      Xóa
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
