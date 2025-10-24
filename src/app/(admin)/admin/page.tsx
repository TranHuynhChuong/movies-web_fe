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

  const { movies, genres, countries, versions, servers, usedStorageMB } = data;

  const stats = [
    { label: 'Tổng dung lượng', value: usedStorageMB },
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

  return (
    <div className="p-6 space-y-6">
      {/* Tổng quan số liệu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
