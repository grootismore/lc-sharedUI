import React from 'react';
import { cn } from '../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors',
  secondary:
    'bg-slate-50 dark:bg-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-200 font-bold rounded-xl transition-all',
  danger:
    'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all',
  icon:
    'bg-slate-50 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors',
  link:
    'text-indigo-600 dark:text-indigo-400 hover:underline font-medium',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1 px-2 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const sizeClass =
    variant === 'icon' ? iconSizeClasses[size] : sizeClasses[size];

  return (
    <button
      className={cn(variantClasses[variant], sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
