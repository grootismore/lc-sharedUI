import React from 'react';
import { cn } from '../lib/utils';

export interface IconTextRowProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  /** Extra classes applied to the icon wrapper. */
  iconClassName?: string;
  className?: string;
}

/**
 * A simple flex row that pairs an icon with text or any content.
 * Used throughout the design system for labelled metadata rows.
 *
 * @example
 * <IconTextRow icon={<Mail size={16} />}>jane@example.com</IconTextRow>
 */
export function IconTextRow({ icon, children, iconClassName, className }: IconTextRowProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className={cn('shrink-0 text-slate-400', iconClassName)}>{icon}</span>
      <span className="text-sm text-slate-600 dark:text-slate-300">{children}</span>
    </div>
  );
}
