import React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full py-2 bg-slate-50 dark:bg-slate-600',
            'border border-slate-200 dark:border-slate-500',
            'rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm',
            'text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            icon ? 'pl-10 pr-4' : 'px-4',
            error && 'border-red-400 dark:border-red-500',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-300 mt-1">{error}</p>
      )}
    </div>
  );
}
