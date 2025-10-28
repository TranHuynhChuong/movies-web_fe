'use client';

import { useRef, useState } from 'react';
import Papa from 'papaparse';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { useAppData } from '@/contexts/AppDataContext';
import ButtonDownloadCsvEpisodeListTemplate from './ButtonDownloadCsvEpisodeListTemplate copy';

interface CsvEpisodesUploaderProps {
  onDataParsed: (versions: VersionsFormData[]) => void;
}

export default function CsvEpisodesUploader({ onDataParsed }: Readonly<CsvEpisodesUploaderProps>) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { servers, versions } = useAppData();
  const { show } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleParseCsv = () => {
    if (!file) {
      show('Vui lòng chọn file CSV', 'error', 'top-right');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        if (!data.length) {
          show('File CSV trống', 'error', 'top-right');
          return;
        }

        // Map để nhóm versions → episodes → streamingSources
        const versionsMap: Record<string, VersionsFormData> = {};
        const versionErrors = new Set<string>();
        const serverErrors = new Set<string>();

        for (const row of data) {
          const versionName = row.version || row.versionName || '';
          const versionNameSlug = versionName;
          const matchedVersion = versions.find((v) => v.name === versionNameSlug);
          const versionId = matchedVersion?.id || row.versionId;

          if (!matchedVersion && !versionId) {
            versionErrors.add(versionName || '(trống)');
            continue; // bỏ qua dòng lỗi này
          }

          const episodeName = row.episodeName;

          const serverName = row.server || row.serverName || '';
          const serverNameSlug = serverName;
          const matchedServer = servers.find((s) => s.name === serverNameSlug);
          const serverId = matchedServer?.id || row.serverId;

          if (!matchedServer && !serverId) {
            serverErrors.add(serverName || '(trống)');
            continue; // bỏ qua dòng lỗi này
          }

          const url = row.url;

          if (!versionsMap[versionId]) {
            versionsMap[versionId] = { id: versionId, episodes: [] };
          }

          const version = versionsMap[versionId];

          let episode = version.episodes.find((ep) => ep.episodeName === episodeName);
          if (!episode) {
            episode = { episodeName, streamingSources: [] };
            version.episodes.push(episode);
          }

          episode.streamingSources.push({
            serverId,
            url,
            orderIndex: episode.streamingSources.length + 1,
          });
        }

        if (versionErrors.size || serverErrors.size) {
          let msg = '';
          if (versionErrors.size) {
            msg += `Không tìm thấy version: ${[...versionErrors].join(', ')}. `;
          }
          if (serverErrors.size) {
            msg += `Không tìm thấy server: ${[...serverErrors].join(', ')}.`;
          }
          show(msg.trim(), 'error', 'top-right');
          return;
        }

        const parsedVersions = Object.values(versionsMap);
        onDataParsed(parsedVersions);
      },
      error: (err) => {
        console.error(err);
        show('Không thể đọc file CSV', 'error', 'top-right');
      },
    });
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // reset input
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg space-y-6 w-full mx-auto border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-2">Thông tin tập phim</h3>
      <div className="flex flex-wrap gap-2 items-center">
        <ButtonDownloadCsvEpisodeListTemplate />
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-fit text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:text-gray-300 file:py-2 file:px-4 file:rounded hover:file:bg-gray-700"
        />
      </div>

      {file && (
        <div className="flex gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" onClick={handleRemoveFile} className="w-full rounded-lg">
              Xóa file
            </Button>
          </div>
          <Button type="button" onClick={handleParseCsv} className="w-full rounded-lg">
            Nhập
          </Button>
        </div>
      )}
    </div>
  );
}
