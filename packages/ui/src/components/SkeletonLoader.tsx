import React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonLine {
  width?: string;
  height?: string;
}

export interface SkeletonLoaderProps {
  lines?: SkeletonLine[];
  className?: string;
}

const defaultLines: SkeletonLine[] = [
  { width: 'w-3/4', height: 'h-4' },
  { width: 'w-1/2', height: 'h-3' },
];

export function SkeletonLoader({ lines = defaultLines, className }: SkeletonLoaderProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      {lines.map((line, i) => (
        <div
          key={i}
          className={cn(
            'bg-slate-200 dark:bg-slate-600 rounded',
            line.height ?? 'h-4',
            line.width ?? 'w-full',
            i < lines.length - 1 && 'mb-2',
          )}
        />
      ))}
    </div>
  );
}
