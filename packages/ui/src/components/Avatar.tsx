import React from 'react';
import { cn } from '../lib/utils';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export function Avatar({ initials, size = 'lg', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'bg-indigo-100 dark:bg-indigo-900/50',
        'text-indigo-600 dark:text-indigo-300',
        'rounded-full flex items-center justify-center font-bold',
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}
