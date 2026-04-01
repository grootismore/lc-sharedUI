import React from 'react';
import { cn } from '../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export function Select({ label, error, children, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'bg-slate-50 dark:bg-slate-600',
          'border border-slate-200 dark:border-slate-500',
          'rounded-xl px-4 py-2',
          'text-slate-600 dark:text-slate-200',
          'outline-none focus:ring-2 focus:ring-indigo-500 text-sm',
          'w-full',
          error && 'border-red-400 dark:border-red-500',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-300 mt-1">{error}</p>
      )}
    </div>
  );
}
