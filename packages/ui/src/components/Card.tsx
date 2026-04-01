import React from 'react';
import { cn } from '../lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-700',
        paddingClasses[padding],
        'rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm',
        hover && 'hover:shadow-md transition-all',
        className,
      )}
    >
      {children}
    </div>
  );
}
