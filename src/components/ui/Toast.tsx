'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';
type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

interface ToastContextType {
  show: (message: string, type?: ToastType, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback(
    (message: string, type: ToastType = 'info', position: ToastPosition = 'bottom-right') => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, position }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 1500);
    },
    []
  );

  const groupedToasts = toasts.reduce<Record<ToastPosition, Toast[]>>((acc, toast) => {
    acc[toast.position] = acc[toast.position] || [];
    acc[toast.position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, Toast[]>);

  const getPositionClasses = (pos: ToastPosition) => {
    const map: Record<ToastPosition, string> = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };
    return map[pos];
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {Object.entries(groupedToasts).map(([position, toastGroup]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 ${getPositionClasses(
            position as ToastPosition
          )}`}
        >
          {toastGroup.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-2 text-white rounded-lg shadow-lg transform transition-all duration-200 ease-out
                ${getBgColor(toast.type)} animate-slide-in-down`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      ))}

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes slideInDown {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in-down {
          animation: slideInDown 0.2s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
