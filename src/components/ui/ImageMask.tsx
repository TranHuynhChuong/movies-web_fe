import React from 'react';

const Mask1 = () => {};

type ImageMaskProps = {};

export const ImageMask: React.FC<ImageMaskProps> = () => {
  const baseClassName = `absolute top-0 left-0 w-full h-full`;
  return (
    <>
      <div className={`${baseClassName} hidden md:block bg-dots`}></div>
      <div
        className={`${baseClassName}  hidden md:block  bg-gradient-to-r from-bg-04/80 from-0% to-transparent to-30% `}
      />
      <div
        className={`${baseClassName}  hidden md:block  bg-gradient-to-l from-bg-04/80 from-0% to-transparent to-20%`}
      />
      <div
        className={`${baseClassName}  hidden md:block bg-gradient-to-b from-bg-04/60 from-0% to-transparent to-20%`}
      />
      <div
        className={`${baseClassName} bg-gradient-to-t from-bg-04 from-0% to-transparent to-$20%`}
      />
    </>
  );
};
