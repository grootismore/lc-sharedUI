import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '../lib/utils';
import type { BadgeColor } from './Badge';

export interface AlertBannerProps {
  color?: BadgeColor;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  emerald:
    'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-200',
  amber:
    'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-200',
  orange:
    'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-200',
  red:
    'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200',
  indigo:
    'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-200',
  sky:
    'bg-sky-50 dark:bg-sky-900/50 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-200',
  purple:
    'bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-200',
  slate:
    'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300',
};

export function AlertBanner({
  color = 'indigo',
  icon,
  children,
  className,
}: AlertBannerProps) {
  return (
    <div
      className={cn(
        'p-3 border rounded-xl text-sm font-medium flex items-center gap-2',
        colorClasses[color],
        className,
      )}
      role="alert"
    >
      <span className="shrink-0">{icon ?? <Info size={18} />}</span>
      <span>{children}</span>
    </div>
  );
}
