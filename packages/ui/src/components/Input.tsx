import React from 'react';
import { cn } from '../lib/utils';
import { FormField } from './FormField';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  /** Icon placed on the right side (e.g. clear button, eye toggle). */
  iconRight?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  iconRight,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <FormField label={label} labelFor={inputId} error={error} hint={hint}>
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
            icon ? 'pl-10' : 'pl-4',
            iconRight ? 'pr-10' : 'pr-4',
            error && 'border-red-400 dark:border-red-500',
            className,
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
            {iconRight}
          </div>
        )}
      </div>
    </FormField>
  );
}
