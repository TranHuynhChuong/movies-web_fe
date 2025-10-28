'use client';

import { Button } from './ui/Button';
import Papa from 'papaparse';
import { useAppData } from '@/contexts/AppDataContext';

export default function ButtonDownloadCsvEpisodeListTemplate() {
  const { versions, servers } = useAppData();
  const handleDownload = () => {
    const sample = [
      {
        version: versions.map((v) => v.name).join('/'),
        episodeNumber: 1,
        servers: servers.map((s) => s.name).join('/'),
        url: 'Link nhúng phim',
      },
    ];

    const csv = Papa.unparse(sample);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_episodesList.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="font-normal" size="sm" variant="outline">
      Tải mẫu
    </Button>
  );
}
