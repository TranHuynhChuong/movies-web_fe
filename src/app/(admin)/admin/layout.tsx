import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';

const sidebarItems: SidebarItem[] = [
  {
    label: 'Phim',
    href: '/admin/phim',
    children: [
      {
        label: 'Thêm phim mới',
        href: '/admin/phim/them-moi',
      },
    ],
  },
  {
    label: 'Máy chủ',
    href: '/admin/may-chu',
    children: [
      {
        label: 'Thêm máy chủ mới',
        href: '/admin/may-chu/them-moi',
      },
    ],
  },
  {
    label: 'Phiên bản',
    href: '/admin/phien-ban',
    children: [
      {
        label: 'Thêm phiên bản mới',
        href: '/admin/phien-ban/them-moi',
      },
    ],
  },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar items={sidebarItems} />
      <div className="md:ml-54">{children}</div>
    </div>
  );
}
