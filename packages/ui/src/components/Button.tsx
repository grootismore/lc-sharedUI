import React from 'react';
import { cn } from '../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows an inline spinner and disables the button. */
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors',
  secondary:
    'bg-slate-50 dark:bg-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-200 font-bold rounded-xl transition-all',
  danger:
    'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-xl transition-all',
  icon:
    'bg-slate-50 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors',
  link:
    'text-indigo-600 dark:text-indigo-400 hover:underline font-medium',
};

/** Padding + text size — for primary, secondary, danger, icon */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1 px-2 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
};

/** Padding only — for icon buttons */
const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

/** Text size only — for link buttons (no padding) */
const linkSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function getSizeClass(variant: ButtonVariant, size: ButtonSize): string {
  if (variant === 'icon') return iconSizeClasses[size];
  if (variant === 'link') return linkSizeClasses[size];
  return sizeClasses[size];
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variantClasses[variant],
        getSizeClass(variant, size),
        (loading || disabled) && 'opacity-60 cursor-not-allowed',
        'inline-flex items-center justify-center gap-2',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
