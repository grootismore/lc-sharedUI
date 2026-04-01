import React from 'react';
import { cn } from '../lib/utils';
import { badgeColorClasses, type SemanticColor } from '../lib/colors';

export type BadgeColor = SemanticColor;

export interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ color = 'slate', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-lg text-xs font-bold',
        badgeColorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
