// 'use client';

// import React from 'react';

// type IframeProps = {
//   src: string;
//   title?: string;
//   className?: string;
// };

// export const Iframe: React.FC<IframeProps> = ({ src, title, className }) => {
//   return (
//     <div className={`w-full bg-black ${className || ''}`}>
//       <div className="relative pt-[56.25%]">
//         <iframe
//           src={src}
//           title={title ?? 'Iframe Player'}
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="absolute top-0 left-0 w-full h-full rounded-lg"
//         />
//       </div>
//     </div>
//   );
// };

'use client';

import React, { useEffect, useState } from 'react';

type IframeProps = {
  src: string;
  title?: string;
  className?: string;
};

export const Iframe: React.FC<IframeProps> = ({ src, title, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Kiểm tra link có hợp lệ trước khi render iframe
  useEffect(() => {
    if (!src || !/^https?:\/\//.test(src)) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Giả lập kiểm tra bằng fetch HEAD (nếu server cho phép CORS)
    fetch(src, { method: 'HEAD', mode: 'no-cors' })
      .then(() => {
        setHasError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [src]);

  return (
    <div className={`w-full bg-black relative ${className || ''}`}>
      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Lỗi */}
      {hasError && !isLoading && (
        <div className="flex items-center justify-center h-64 bg-gray-900 text-gray-400 text-center p-4">
          <div>
            <p className="text-lg font-semibold">Không thể phát video</p>
            <p className="text-sm mt-1">Liên kết có thể không hợp lệ hoặc bị chặn nhúng.</p>
          </div>
        </div>
      )}

      {/* Hiển thị iframe nếu hợp lệ */}
      {!hasError && !isLoading && (
        <div className="relative pt-[56.25%]">
          <iframe
            src={src}
            title={title ?? 'Iframe Player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
