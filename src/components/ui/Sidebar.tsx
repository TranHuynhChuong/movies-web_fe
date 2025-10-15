'use client';

import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { IconMenu } from '../icon/IconMenu';
import { Logo } from './Logo';

export type SidebarItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];
  title?: string;
};

export default function Sidebar({ items, title = 'Panel' }: Readonly<SidebarProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderItems = (items: SidebarItem[], level = 0) => (
    <ul className="space-y-1">
      {items.map((item, i) => {
        const isActive = pathname === item.href;
        const hasChildren = !!item.children?.length;

        return (
          <li key={i}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center p-2 rounded-lg hover:bg-bg-03/90 text-sm',
                isActive ? 'bg-bg-03' : ''
              )}
            >
              {item.icon && <span className="w-5 h-5 me-3">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
            </Link>

            {/* submenu */}
            {hasChildren && (
              <div className="ml-4 mt-1">{renderItems(item.children!, level + 1)}</div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Nút toggle trên mobile */}
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2  text-sm text-white rounded-lg md:hidden hover:bg-bg-03/90 focus:outline-none focus:ring-2 focus:ring-bg-03 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <IconMenu width={28} height={28} />
      </button>

      {/* Sidebar chính */}
      <aside
        id="logo-sidebar"
        className={cn(
          'fixed top-0 left-0 z-40 w-54 h-screen transition-transform md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900">
          <div className="flex items-center ps-2.5 mb-5 justify-between">
            <div className="flex">
              <Logo href="/admin" />
            </div>
            <button
              onClick={toggleSidebar}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-bg-03/90 focus:outline-none focus:ring-2 focus:ring-bg-03 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Mở thanh bên</span>
              <IconMenu width={28} height={28} className=" rotate-180" />
            </button>
          </div>

          {renderItems(items)}
        </div>
      </aside>
    </>
  );
}
