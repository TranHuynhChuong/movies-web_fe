import React from 'react';

type BadgeGroupProps = {
  pdText: string; // text cho P.Đ
  ltText: string; // text cho L.T
  tmText: string; // text cho T.M
  ignore?: boolean; // nếu true, mobile vẫn giữ kiểu desktop
};

export const BadgeGroup: React.FC<BadgeGroupProps> = ({
  pdText = '',
  ltText = '',
  tmText = '',
  ignore = false,
}) => {
  return (
    <>
      {/* Horizontal: sm trở lên */}
      <div
        className={`absolute top-full left-1/2 flex -translate-x-1/2 -translate-y-full overflow-hidden rounded-t-sm 
          ${ignore ? '' : 'hidden sm:flex'}`}
      >
        <span className="bg-bg-01 px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          P.Đ {pdText}
        </span>
        <span className="bg-blue px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          L.T {ltText}
        </span>
        <span className="bg-teal px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          T.M {tmText}
        </span>
        <span className="bg-white px-2 py-1 text-2xs font-normal whitespace-nowrap text-black sm:text-sm">
          Upcoming
        </span>
      </div>

      {/* Vertical: dưới sm */}
      <div
        className={`absolute left-1.5 flex flex-col gap-1 
          ${ignore ? '' : 'flex sm:hidden'}`}
      >
        <span className="rounded-md bg-bg-01 px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          P.Đ {pdText}
        </span>
        <span className="rounded-md bg-blue px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          L.T {ltText}
        </span>
        <span className="rounded-md bg-teal px-2 py-1 text-2xs font-normal whitespace-nowrap text-white sm:text-sm">
          T.M {tmText}
        </span>
        <span className="rounded-md bg-white px-2 py-1 text-2xs font-normal whitespace-nowrap text-black sm:text-sm">
          Upcoming
        </span>
      </div>
    </>
  );
};
