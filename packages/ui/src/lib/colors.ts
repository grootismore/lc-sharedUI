/**
 * Semantic color tokens shared across Badge, AlertBanner, and any other
 * component that maps a BadgeColor to Tailwind classes.
 */

export type SemanticColor =
  | 'emerald'
  | 'amber'
  | 'orange'
  | 'red'
  | 'indigo'
  | 'sky'
  | 'purple'
  | 'slate';

/** bg + text only — used by Badge */
export const badgeColorClasses: Record<SemanticColor, string> = {
  emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300',
  amber:   'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300',
  orange:  'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300',
  red:     'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300',
  indigo:  'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300',
  sky:     'bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300',
  purple:  'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300',
  slate:   'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500',
};

/** bg + border + text — used by AlertBanner */
export const alertColorClasses: Record<SemanticColor, string> = {
  emerald: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-200',
  amber:   'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-200',
  orange:  'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-200',
  red:     'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200',
  indigo:  'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-200',
  sky:     'bg-sky-50 dark:bg-sky-900/50 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-200',
  purple:  'bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-200',
  slate:   'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300',
};
