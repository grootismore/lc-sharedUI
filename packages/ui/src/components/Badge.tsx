import React from 'react';
import { cn } from '../lib/utils';

export type BadgeColor =
  | 'emerald'
  | 'amber'
  | 'orange'
  | 'red'
  | 'indigo'
  | 'sky'
  | 'purple'
  | 'slate';

export interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  emerald:
    'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300',
  amber:
    'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300',
  orange:
    'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300',
  red:
    'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300',
  indigo:
    'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300',
  sky:
    'bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300',
  purple:
    'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
  slate:
    'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500',
};

export function Badge({ color = 'slate', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-lg text-xs font-bold',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
