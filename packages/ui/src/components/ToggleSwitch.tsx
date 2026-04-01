import React from 'react';
import { cn } from '../lib/utils';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  icon,
  disabled = false,
  className,
}: ToggleSwitchProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {icon && (
        <span className="text-slate-400">{icon}</span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
        />
        {/* Track */}
        <div
          className={cn(
            'w-10 h-6 rounded-full transition-colors duration-200',
            checked
              ? 'bg-indigo-600'
              : 'bg-slate-200 dark:bg-slate-600',
          )}
        />
        {/* Thumb */}
        <div
          className={cn(
            'absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
            checked && 'translate-x-4',
          )}
        />
      </div>
      {label && (
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      )}
    </label>
  );
}
