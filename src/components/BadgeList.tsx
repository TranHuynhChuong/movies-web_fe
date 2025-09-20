import React from 'react';

type BadgeListProps = {
  texts: string[];
  className?: string; // nếu muốn thêm class cho container
};

export const BadgeList: React.FC<BadgeListProps> = ({ texts, className = '' }) => {
  const baseBadgeClass =
    'rounded-md border border-white bg-white/10 px-2 py-1 text-center text-2xs font-normal whitespace-nowrap text-white sm:text-sm';

  return (
    <div className={`${className} flex flex-wrap gap-1 `}>
      {texts.map((text, index) => (
        <span key={index} className={baseBadgeClass}>
          {text}
        </span>
      ))}
    </div>
  );
};
