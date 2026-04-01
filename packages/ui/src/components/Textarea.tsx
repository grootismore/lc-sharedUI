import React from 'react';
import { cn } from '../lib/utils';
import { FormField } from './FormField';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <FormField label={label} labelFor={textareaId} error={error} hint={hint}>
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-4 py-2',
          'bg-slate-50 dark:bg-slate-600',
          'border border-slate-200 dark:border-slate-500',
          'rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all',
          'text-slate-900 dark:text-slate-100 text-sm',
          'resize-none',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          error && 'border-red-400 dark:border-red-500',
          className,
        )}
        {...props}
      />
    </FormField>
  );
}
