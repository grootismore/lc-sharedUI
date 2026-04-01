import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { alertColorClasses, type SemanticColor } from '../lib/colors';

export type AlertColor = SemanticColor;

export interface AlertBannerProps {
  color?: AlertColor;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

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
        alertColorClasses[color],
        className,
      )}
      role="alert"
    >
      <span className="shrink-0">{icon ?? <Info size={18} />}</span>
      <span>{children}</span>
    </div>
  );
}
