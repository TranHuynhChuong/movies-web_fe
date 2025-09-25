import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizeClasses: Record<string, string> = {
  '2xs': 'px-2 py-1 text-2xs',
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
  xl: 'px-6 py-3 text-xl',
};

const variantClasses: Record<string, string> = {
  default: 'bg-primary text-black hover:bg-primary-dark disabled:bg-gray disabled:text-white',
  outline: 'border border-white text-white hover:text-primary disabled:bg-gray disabled:text-white',
  ghost: 'text-white hover:bg-white/10 hover:text-primary disabled:bg-gray disabled:text-white',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`h-fit w-fit cursor-pointer rounded-full font-medium text-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
