import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';

const sidebarItems: SidebarItem[] = [
  {
    label: 'Phim',
    href: '/admin/phim',
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
