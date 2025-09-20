'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { IconArrowDownTriangle } from './icon/IconArrowDownTriangle';
import { useSearchBar } from '@/contexts/SearchBarContext';
type MenuItemProps = {
  children: React.ReactNode;
  type?: 'dropdown' | 'accordion';
  className?: string;
  listClassName?: string;
  ItemClassName?: string;
  itemList?: {
    id: string;
    value: string;
  }[];
};

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  type = 'dropdown',
  className = '',
  listClassName = '',
  ItemClassName = '',
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
              onClick={toggle}
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
              className={`absolute w-max top-full mt-1 left-1/2 -translate-x-1/2 z-50 rounded-b-lg bg-bg-06/50 shadow-lg overflow-hidden transition-all duration-200 ease-out pr-1 ${
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
                    className={`rounded-md w-full font-normal whitespace-nowrap truncate text-left ${ItemClassName}`}
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
        <details className="group space-y-2" open>
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-medium text-white">
            {children}
            {itemList && itemList.length > 0 && (
              <div className="transition-all duration-300 group-open:rotate-180">
                <IconArrowDownTriangle height={10} width={10} />
              </div>
            )}
          </summary>
          <div className={`overflow-auto h-full grid grid-cols-1 gap-2 ${listClassName}`}>
            {itemList &&
              itemList.map((item, index) => (
                <Button
                  size="xs"
                  variant="ghost"
                  type="button"
                  key={index}
                  className={`rounded-md w-full font-normal whitespace-nowrap truncate text-left ${ItemClassName}`}
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

const genres = [
  { id: 'Anime', value: 'Anime' },
  { id: 'Bí Ẩn', value: 'Bí Ẩn' },
  { id: 'Chiến Tranh', value: 'Chiến Tranh' },
  { id: 'Chiếu Rạp', value: 'Chiếu Rạp' },
  { id: 'Chuyển Thể', value: 'Chuyển Thể' },
  { id: 'Chính Kịch', value: 'Chính Kịch' },
  { id: 'Chính Luận', value: 'Chính Luận' },
  { id: 'Chính Trị', value: 'Chính Trị' },
  { id: 'Chương Trình Truyền Hình', value: 'Chương Trình Truyền Hình' },
  { id: 'Cung Đấu', value: 'Cung Đấu' },
  { id: 'Cuối Tuần', value: 'Cuối Tuần' },
  { id: 'Cách Mạng', value: 'Cách Mạng' },
  { id: 'Cổ Trang', value: 'Cổ Trang' },
  { id: 'Cổ Tích', value: 'Cổ Tích' },
  { id: 'Cổ Điển', value: 'Cổ Điển' },
  { id: 'DC', value: 'DC' },
  { id: 'Disney', value: 'Disney' },
  { id: 'Gay Cấn', value: 'Gay Cấn' },
  { id: 'Gia Đình', value: 'Gia Đình' },
  { id: 'Giáng Sinh', value: 'Giáng Sinh' },
  { id: 'Giả Tưởng', value: 'Giả Tưởng' },
  { id: 'Hoàng Cung', value: 'Hoàng Cung' },
  { id: 'Hoạt Hình', value: 'Hoạt Hình' },
  { id: 'Hài', value: 'Hài' },
  { id: 'Hành Động', value: 'Hành Động' },
  { id: 'Hình Sự', value: 'Hình Sự' },
  { id: 'Học Đường', value: 'Học Đường' },
  { id: 'Khoa Học', value: 'Khoa Học' },
  { id: 'Kinh Dị', value: 'Kinh Dị' },
  { id: 'Kinh Điển', value: 'Kinh Điển' },
  { id: 'Kịch Nói', value: 'Kịch Nói' },
  { id: 'Kỳ Ảo', value: 'Kỳ Ảo' },
  { id: 'LGBT+', value: 'LGBT+' },
  { id: 'Live Action', value: 'Live Action' },
  { id: 'Lãng Mạn', value: 'Lãng Mạn' },
  { id: 'Lịch Sử', value: 'Lịch Sử' },
  { id: 'Marvel', value: 'Marvel' },
  { id: 'Miền Viễn Tây', value: 'Miền Viễn Tây' },
  { id: 'Nghề Nghiệp', value: 'Nghề Nghiệp' },
  { id: 'Người Mẫu', value: 'Người Mẫu' },
  { id: 'Nhạc Kịch', value: 'Nhạc Kịch' },
  { id: 'Phiêu Lưu', value: 'Phiêu Lưu' },
  { id: 'Phép Thuật', value: 'Phép Thuật' },
  { id: 'Siêu Anh Hùng', value: 'Siêu Anh Hùng' },
  { id: 'Thiếu Nhi', value: 'Thiếu Nhi' },
  { id: 'Thần Thoại', value: 'Thần Thoại' },
  { id: 'Thể Thao', value: 'Thể Thao' },
  { id: 'Truyền Hình Thực Tế', value: 'Truyền Hình Thực Tế' },
  { id: 'Tuổi Trẻ', value: 'Tuổi Trẻ' },
  { id: 'Tài Liệu', value: 'Tài Liệu' },
  { id: 'Tâm Lý', value: 'Tâm Lý' },
  { id: 'Tình Cảm', value: 'Tình Cảm' },
  { id: 'Tập Luyện', value: 'Tập Luyện' },
  { id: 'Viễn Tưởng', value: 'Viễn Tưởng' },
  { id: 'Võ Thuật', value: 'Võ Thuật' },
  { id: 'Xuyên Không', value: 'Xuyên Không' },
  { id: 'Đau Thương', value: 'Đau Thương' },
  { id: 'Đời Thường', value: 'Đời Thường' },
  { id: 'Ẩm Thực', value: 'Ẩm Thực' },
];

const years = [
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
  { id: '2020', value: '2020' },
];

type MenuProps = {
  type?: 'main' | 'secondary';
  className?: string;
};

export const Menu: React.FC<MenuProps> = ({ type = 'main', className = '' }) => {
  const { open } = useSearchBar();
  switch (type) {
    case 'main': {
      return (
        <div
          className={` ${
            open ? 'hidden' : 'hidden lg:flex'
          }  font-normal w-fit h-full items-center justify-center gap-2 pr-5 ${className} `}
        >
          <MenuItem> Phim Bộ </MenuItem>
          <MenuItem> Phim Lẻ </MenuItem>
          <MenuItem>Chủ Đề</MenuItem>
          <MenuItem itemList={genres} listClassName="grid-cols-4" ItemClassName="max-w-24">
            Thể Loại
          </MenuItem>
          <MenuItem>Quốc Gia</MenuItem>
          <MenuItem itemList={years}>Năm</MenuItem>
        </div>
      );
    }
    case 'secondary': {
      return (
        <div className="w-full space-y-2">
          <MenuItem type="accordion"> Phim Bộ </MenuItem>
          <MenuItem type="accordion"> Phim Lẻ </MenuItem>
          <MenuItem type="accordion">Chủ Đề</MenuItem>
          <MenuItem itemList={genres} type="accordion" listClassName="grid-cols-2">
            Thể Loại
          </MenuItem>
          <MenuItem type="accordion">Quốc Gia</MenuItem>
          <MenuItem itemList={years} type="accordion">
            Năm
          </MenuItem>
        </div>
      );
    }
  }
};
