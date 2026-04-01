import React from 'react';
import { cn } from '../lib/utils';
import { FormField } from './FormField';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export function Select({
  label,
  error,
  hint,
  children,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <FormField label={label} labelFor={selectId} error={error} hint={hint}>
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-2',
          'bg-slate-50 dark:bg-slate-600',
          'border border-slate-200 dark:border-slate-500',
          'rounded-xl text-sm',
          'text-slate-600 dark:text-slate-200',
          'outline-none focus:ring-2 focus:ring-indigo-500 transition-all',
          error && 'border-red-400 dark:border-red-500',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </FormField>
  );
}
