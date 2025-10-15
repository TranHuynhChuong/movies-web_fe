// components/SimpleTable.tsx
'use client';

import React from 'react';
import { Option } from '@/types/utils';

interface SimpleTableProps {
  title?: string;
  data: Option[];
  onEdit?: (item: Option) => void;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ title, data, onEdit }) => {
  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày cập nhật
              </th>
              {onEdit && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-sm">
                    <p>
                      {item.created_at ? new Date(item.created_at).toLocaleTimeString('vi-VN') : ''}
                    </p>
                    <p>
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : ''}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-sm">
                    <p>
                      {item.updated_at ? new Date(item.updated_at).toLocaleTimeString('vi-VN') : ''}
                    </p>
                    <p>
                      {item.updated_at ? new Date(item.updated_at).toLocaleDateString('vi-VN') : ''}
                    </p>
                  </div>
                </td>
                {onEdit && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <button onClick={() => onEdit(item)} className="text-blue-500 hover:underline">
                      Chỉnh sửa
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
