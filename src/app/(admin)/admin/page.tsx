'use client';

import { getStats } from '@/services/stats/get';
import { useQuery } from '@tanstack/react-query';

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
    select: (res) => res.data,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>;

  const {
    movies,
    genres,
    countries,
    versions,
    servers,
    usedStorageMB,
    remainingStorageMB,
    totalStorageMB,
  } = data;

  const stats = [
    { label: 'Tổng phim', value: movies },
    {
      label: 'Tổng thể loại',
      value: genres,
    },
    {
      label: 'Tổng quốc gia',
      value: countries,
    },
    {
      label: 'Tổng phiên bản',
      value: versions,
    },
    { label: 'Tổng máy chủ', value: servers },
  ];

  const usedPercentage = totalStorageMB ? Math.round((usedStorageMB / totalStorageMB) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Dung lượng */}
      <div className=" shadow-md rounded-lg p-6 bg-gray-900 transition-shadow">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Dung lượng Storage</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-4 bg-blue-500" style={{ width: `${usedPercentage}%` }}></div>
        </div>
        <div className="space-y-2 text-sm text-gray-400 mt-4">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-blue-500"></div>
            <p>Đã dùng: {usedStorageMB} MB</p>
          </div>
          <div className="flex gap-2  items-center">
            <div className="w-3 h-3 bg-gray-200"></div>
            <p>Khả dụng: {remainingStorageMB} MB</p>
          </div>
        </div>
      </div>
      {/* Tổng quan số liệu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className=" shadow-md rounded-lg p-4 flex items-center gap-4 transition-shadow bg-gray-900"
          >
            <div className="flex-1">
              <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value ?? 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
