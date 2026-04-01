import React from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export interface EmptyStateProps {
  heading?: string;
  subtext?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  heading = 'No items found',
  subtext = 'Try adjusting your search.',
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('py-20 text-center', className)}>
      <div className="bg-slate-100 dark:bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        {icon ?? <SearchIcon size={32} />}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
        {heading}
      </h3>
      {subtext && (
        <p className="text-slate-500 dark:text-slate-400 text-sm">{subtext}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
