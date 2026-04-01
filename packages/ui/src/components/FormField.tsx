import React from 'react';
import { cn } from '../lib/utils';

export interface FormFieldProps {
  label?: string;
  /** The id of the form control this label points to. */
  labelFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps any form control with a consistent label / error / hint layout.
 * Used internally by Input, Select, and Textarea — but also available
 * directly when composing custom controls.
 */
export function FormField({
  label,
  labelFor,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label
          htmlFor={labelFor}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-300 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
