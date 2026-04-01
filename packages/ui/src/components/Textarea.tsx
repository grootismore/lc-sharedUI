import React from 'react';
import { cn } from '../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, rows = 4, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-3 py-2',
          'border border-slate-200 dark:border-slate-500',
          'bg-white dark:bg-slate-600',
          'text-slate-900 dark:text-slate-100',
          'rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none',
          'resize-none',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'text-sm',
          error && 'border-red-400 dark:border-red-500',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-300 mt-1">{error}</p>
      )}
    </div>
  );
}
