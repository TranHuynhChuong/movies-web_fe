'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { IconArrowDownTriangle } from './icon/IconArrowDownTriangle';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { useRouter } from 'next/navigation';
import { getLink } from '@/utils/getLink';
type MenuItemProps = {
  children: React.ReactNode;
  onClick: (id?: string, name?: string) => void;
  type?: 'dropdown' | 'accordion';
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  itemList?:
    | {
        id: string;
        value: string;
      }[]
    | [];
};

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  type = 'dropdown',
  className = '',
  listClassName = '',
  itemClassName = '',
  itemList,
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click ngoài để đóng
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = () => setOpen((prev) => !prev);
  switch (type) {
    case 'dropdown': {
      return (
        <div className="relative inline-block">
          <div ref={buttonRef}>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                if (itemList && itemList.length > 0) {
                  toggle();
                } else onClick?.(undefined, undefined);
              }}
              className={` font-normal flex gap-2 items-center hover:bg-transparent!`}
            >
              {children}
              {itemList && itemList.length > 0 && (
                <div className={`transition-all duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}>
                  <IconArrowDownTriangle height={10} width={10} />
                </div>
              )}
            </Button>
          </div>

          {itemList && itemList.length > 0 && (
            <div
              ref={dropdownRef}
              className={`absolute w-max top-full mt-1 left-1/2 -translate-x-1/2 z-50 rounded-b-lg bg-bg-06/90 shadow-lg overflow-hidden transition-all duration-200 ease-out pr-1 ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div
                className={`p-2 h-fit max-h-[80vh] min-w-32 overflow-auto grid grid-cols-1 gap-2 scrollbar-sm ${listClassName}`}
              >
                {itemList.map((item, index) => (
                  <Button
                    size="xs"
                    variant="ghost"
                    type="button"
                    key={index}
                    className={`rounded-md w-full font-normal whitespace-nowrap truncate text-left ${itemClassName}`}
                    onClick={() => onClick(item.id, item.value)}
                  >
                    {item.value}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    case 'accordion': {
      return (
        <details className="space-y-2 group">
          <summary
            className="flex items-center justify-between text-xs font-medium text-white list-none cursor-pointer"
            onClick={() => {
              if (!itemList) {
                onClick?.(undefined, undefined);
              }
            }}
          >
            {children}
            {itemList && itemList.length > 0 && (
              <div className="transition-all duration-300 group-open:rotate-180">
                <IconArrowDownTriangle height={10} width={10} />
              </div>
            )}
          </summary>
          <div className={`overflow-auto h-full grid grid-cols-1 gap-2 ${listClassName}`}>
            {itemList &&
              itemList.length > 0 &&
              itemList?.map((item, index) => (
                <Button
                  size="xs"
                  variant="ghost"
                  type="button"
                  key={index.toString() + item.id}
                  className={`rounded-md w-full font-normal whitespace-nowrap truncate text-left ${itemClassName}`}
                  onClick={() => onClick(item.id, item.value)}
                >
                  {item.value}
                </Button>
              ))}
          </div>
        </details>
      );
    }
    default:
      return null;
  }
};

type MenuProps = {
  genres?: { id: string; value: string }[] | [];
  countries?: { id: string; value: string }[] | [];
  type?: 'main' | 'secondary';
  className?: string;
};

export const Menu: React.FC<MenuProps> = ({ genres, countries, type = 'main', className = '' }) => {
  const { open } = useSearchBar();
  const router = useRouter();

  const items = [
    { label: 'Phim Bộ', path: '/phim-bo' },
    { label: 'Phim Lẻ', path: '/phim-le' },
    {
      label: 'Thể Loại',
      path: '/the-loai',
      list: genres,
      listClass: 'grid-cols-4',
      itemClass: 'max-w-24',
    },
    { label: 'Quốc Gia', path: '/quoc-gia', list: countries },
  ];

  const Wrapper =
    type === 'main'
      ? ({ children }: { children: React.ReactNode }) => (
          <div
            className={`${
              open ? 'hidden' : 'hidden lg:flex'
            } w-fit h-full items-center gap-2 pr-5 ${className}`}
          >
            {children}
          </div>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <div className={`w-full space-y-2 ${className}`}>{children}</div>
        );

  return (
    <Wrapper>
      {items.map(({ label, path, list, listClass, itemClass }) => (
        <MenuItem
          key={label}
          type={type === 'main' ? 'dropdown' : 'accordion'}
          itemList={list}
          listClassName={listClass}
          itemClassName={itemClass}
          onClick={(id, value) => {
            router.push(getLink(path, value, id));
          }}
        >
          {label}
        </MenuItem>
      ))}
    </Wrapper>
  );
};
