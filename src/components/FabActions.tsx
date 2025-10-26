'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { useMutation } from '@tanstack/react-query';
import { addNew as addServer } from '@/services/server/post';
import { addNew as addVersion } from '@/services/version/post';
import { addNew as addGenre } from '@/services/genre/post';
import { addNew as addCountry } from '@/services/country/post';
import { useToast } from './ui/Toast';
import { useAuthToken } from '@/hooks/useAuth';
import { useAppData } from '@/contexts/AppDataContext';
import Loader from './ui/loader';

export default function FabActions() {
  const router = useRouter();
  const { refetchCountries, refetchServers, refetchVersions, refetchGenres } = useAppData();
  const [open, setOpen] = useState(false);
  const [openServerModal, setOpenServerModal] = useState(false);
  const [openVersionModal, setOpenVersionModal] = useState(false);
  const [openGenreModal, setOpenGenreModal] = useState(false);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [serverName, setServerName] = useState('');
  const [versionName, setVersionName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [countryName, setCountryName] = useState('');
  const pathname = usePathname();
  const { token } = useAuthToken();
  const { show } = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const isBaseAdminPage = /^\/admin\/[^\/]+$/.test(pathname);

  const handleAddMovie = () => {
    router.push('/admin/phim/them-moi');
    setOpen(false);
  };

  const handleAddServer = () => {
    setOpenServerModal(true);
    setOpen(false);
  };

  const handleAddVersion = () => {
    setOpenVersionModal(true);
    setOpen(false);
  };

  const handleAddGenre = () => {
    setOpenGenreModal(true);
    setOpen(false);
  };

  const handleAddCountry = () => {
    setOpenCountryModal(true);
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async ({ type, payload }: { type: string; payload: any }) => {
      setIsSubmiting(true);

      switch (type) {
        case 'server':
          return addServer(payload, token);
        case 'version':
          return addVersion(payload, token);
        case 'genre':
          return addGenre(payload, token);
        case 'country':
          return addCountry(payload, token);
        default:
          throw new Error('Loại không hợp lệ');
      }
    },
    onSuccess: (_data, variables) => {
      const { type } = variables;

      switch (type) {
        case 'server':
          refetchServers();
          break;
        case 'version':
          refetchVersions();
          break;
        case 'genre':
          refetchGenres();
          break;
        case 'country':
          refetchCountries();
          break;
      }

      show('Thêm thành công!', 'success', 'top-center');
    },
    onError: (error) => {
      console.error(error);
      show('Lỗi thêm mới!', 'error', 'top-center');
    },
    onSettled: () => {
      setIsSubmiting(false);
    },
  });

  return (
    <>
      {/* Nút nổi */}
      {isBaseAdminPage && (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3  items-end">
          {isSubmiting && <Loader />}
          {open && (
            <div className="flex flex-col mb-3 space-y-1 transition-all duration-300 bg-gray-700 w-48 py-2 rounded-md overflow-hidden">
              <div className="w-full h-fit " title="Thêm phim mới">
                <button
                  onClick={handleAddMovie}
                  className="w-full px-8 py-2 hover:bg-gray-600 text-left"
                >
                  Thêm phim
                </button>
              </div>
              <div className="w-full h-fit" title="Thêm thể loại">
                <button
                  onClick={handleAddGenre}
                  className="w-full px-8 py-2 hover:bg-gray-600 text-left"
                >
                  Thêm thể loại
                </button>
              </div>
              <div className="w-full h-fit" title="Thêm server">
                <button
                  onClick={handleAddServer}
                  className="w-full px-8 py-2 hover:bg-gray-600 text-left"
                >
                  Thêm server
                </button>
              </div>
              <div className="w-full h-fit" title="Thêm quốc gia">
                <button
                  onClick={handleAddCountry}
                  className="w-full px-8 py-2 hover:bg-gray-600 text-left"
                >
                  Thêm quốc gia
                </button>
              </div>
              <div className="w-full h-fit" title="Thêm version">
                <button
                  onClick={handleAddVersion}
                  className="w-full px-8 py-2 hover:bg-gray-600 text-left"
                >
                  Thêm version
                </button>
              </div>
            </div>
          )}

          {/* Nút chính */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-primary hover:bg-primary-dark text-black  shadow-lg transition-transform transform"
            aria-label="Menu hành động"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                open ? 'rotate-45' : 'rotate-0'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Modal thêm genre */}
      <Modal
        open={openGenreModal}
        onClose={() => setOpenGenreModal(false)}
        onConfirm={async () => {
          if (!genreName.trim()) return alert('Vui lòng nhập tên thể loại');
          mutation.mutate({
            type: 'genre',
            payload: { name: genreName },
          });
          setGenreName('');
          setOpenGenreModal(false);
        }}
        title="Thêm thể loại phim"
        confirmLable="Thêm mới"
      >
        <input
          type="text"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          placeholder="Nhập tên thể loại..."
          className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
        />
      </Modal>

      {/* Modal thêm version */}
      <Modal
        open={openVersionModal}
        onClose={() => setOpenVersionModal(false)}
        onConfirm={async () => {
          if (!versionName.trim()) return alert('Vui lòng nhập tên version');
          mutation.mutate({
            type: 'version',
            payload: { name: versionName },
          });
          setVersionName('');
          setOpenVersionModal(false);
        }}
        title="Thêm version phim"
        confirmLable="Thêm mới"
      >
        <input
          type="text"
          value={versionName}
          onChange={(e) => setVersionName(e.target.value)}
          placeholder="Nhập tên version..."
          className="w-full border text-gray-300 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
        />
      </Modal>

      {/* Modal thêm server */}
      <Modal
        open={openServerModal}
        onClose={() => setOpenServerModal(false)}
        onConfirm={async () => {
          if (!serverName.trim()) return alert('Vui lòng nhập tên máy chủ');
          mutation.mutate({
            type: 'server',
            payload: { name: serverName },
          });
          setServerName('');
          setOpenServerModal(false);
        }}
        title="Thêm máy chủ"
        confirmLable="Thêm mới"
      >
        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          placeholder="Nhập tên máy chủ..."
          className="w-full text-gray-300 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
        />
      </Modal>

      {/* Modal thêm quốc gia */}
      <Modal
        open={openCountryModal}
        onClose={() => setOpenCountryModal(false)}
        onConfirm={async () => {
          if (!countryName.trim()) return alert('Vui lòng nhập tên quốc gia');
          mutation.mutate({
            type: 'country',
            payload: { name: countryName },
          });
          setCountryName('');
          setOpenCountryModal(false);
        }}
        title="Thêm máy chủ"
        confirmLable="Thêm mới"
      >
        <input
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Nhập tên quốc gia..."
          className="w-full text-gray-300 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 "
        />
      </Modal>
    </>
  );
}
