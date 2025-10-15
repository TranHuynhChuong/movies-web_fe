import FabActions from '@/components/FabActions';
import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';

const sidebarItems: SidebarItem[] = [
  {
    label: 'Phim',
    href: '/admin/phim',
  },
  {
    label: 'Thể loại',
    href: '/admin/the-loai',
  },
  {
    label: 'Máy chủ',
    href: '/admin/may-chu',
  },
  {
    label: 'Phiên bản',
    href: '/admin/phien-ban',
  },
  {
    label: 'Quốc gia',
    href: '/admin/quoc-gia',
  },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar items={sidebarItems} />
      <div className="md:ml-54">
        {children}
        <FabActions />
      </div>
    </div>
  );
}
