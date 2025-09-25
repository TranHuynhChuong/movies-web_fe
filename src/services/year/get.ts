import { API_BASE_URL } from '@/libs/api';

export async function getYearList() {
  const res = await fetch(`${API_BASE_URL}/danh-sach-nam`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  const { data } = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const years = data.map((year: number, index: number) => ({
    id: (index + 1).toString(),
    value: year.toString(),
  }));

  return years;
}
