import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeContext';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export interface LayoutProps {
  /** Nav links shown in the sidebar / mobile drawer. */
  navItems: NavItem[];
  /** The app name shown next to the logo. */
  appName: string;
  /** Optional logo element (overrides the default indigo initials box). */
  logo?: React.ReactNode;
  /** Slot on the right side of the sticky header bar (notifications, avatar, etc.). */
  headerRight?: React.ReactNode;
  /** Callback fired when a nav item is clicked. Use to update the router. */
  onNavigate: (path: string) => void;
  /** The currently active path, used to highlight the active nav item. */
  activePath?: string;
  /**
   * Whether to render the built-in dark/light toggle at the bottom of the
   * sidebar. Set to false when your app handles theme switching elsewhere
   * (e.g. inside a user settings page or the headerRight slot).
   * Defaults to true.
   */
  showThemeToggle?: boolean;
  children: React.ReactNode;
}

export function Layout({
  navItems,
  appName,
  logo,
  headerRight,
  onNavigate,
  activePath,
  showThemeToggle = true,
  children,
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = sidebarExpanded ? 'w-64' : 'w-20';

  // ── Shared nav item renderer ──────────────────────────────────────────────
  function NavButton({
    item,
    compact = false,
    extraPy = false,
    onClick,
  }: {
    item: NavItem;
    compact?: boolean;
    extraPy?: boolean;
    onClick?: () => void;
  }) {
    const active = activePath === item.path;
    return (
      <button
        key={item.path}
        onClick={() => {
          onNavigate(item.path);
          onClick?.();
        }}
        className={cn(
          'w-full flex items-center gap-3 px-3 rounded-xl text-sm font-medium transition-all',
          extraPy ? 'py-2.5' : 'py-2',
          active
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
          compact && 'justify-center',
        )}
        title={compact ? item.label : undefined}
        aria-current={active ? 'page' : undefined}
      >
        <span className="shrink-0">{item.icon}</span>
        {!compact && <span className="truncate">{item.label}</span>}
      </button>
    );
  }

  // ── Theme toggle button ───────────────────────────────────────────────────
  function ThemeToggle({ compact = false, extraPy = false }: { compact?: boolean; extraPy?: boolean }) {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'w-full flex items-center gap-3 px-3 rounded-xl text-sm font-medium transition-all',
          extraPy ? 'py-2.5' : 'py-2',
          'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
          compact && 'justify-center',
        )}
        title={compact ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
      >
        <span className="shrink-0">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </span>
        {!compact && (
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        )}
      </button>
    );
  }

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-800 overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed top-0 left-0 h-full z-30',
          'bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700',
          'transition-all duration-300',
          sidebarWidth,
        )}
      >
        {/* Logo row */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-slate-200 dark:border-slate-700">
          <div
            className={cn(
              'flex items-center gap-2 overflow-hidden',
              !sidebarExpanded && 'justify-center',
            )}
          >
            {logo ?? (
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-extrabold">
                  {appName.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            {sidebarExpanded && (
              <span className="font-extrabold text-indigo-600 truncate">{appName}</span>
            )}
          </div>
          <button
            onClick={() => setSidebarExpanded(p => !p)}
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
            aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2" aria-label="Main navigation">
          {navItems.map(item => (
            <NavButton key={item.path} item={item} compact={!sidebarExpanded} />
          ))}
        </nav>

        {/* Theme toggle (opt-out via showThemeToggle={false}) */}
        {showThemeToggle && (
          <div className="px-2 py-4 border-t border-slate-200 dark:border-slate-700">
            <ThemeToggle compact={!sidebarExpanded} />
          </div>
        )}
      </aside>

      {/* ── Mobile overlay drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 z-50 bg-white dark:bg-slate-900 flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  {logo ?? (
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-extrabold">
                        {appName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="font-extrabold text-indigo-600">{appName}</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile nav */}
              <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3" aria-label="Main navigation">
                {navItems.map(item => (
                  <NavButton
                    key={item.path}
                    item={item}
                    extraPy
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              {/* Mobile theme toggle */}
              {showThemeToggle && (
                <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700">
                  <ThemeToggle extraPy />
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Fixed top bar (mobile) ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <span className="font-extrabold text-indigo-600">{appName}</span>
        {headerRight ?? <div className="w-9" />}
      </header>

      {/* ── Scrollable main content ── */}
      <main
        className={cn(
          'flex-1 overflow-y-auto',
          'pt-16 md:pt-0',
          'transition-all duration-300',
          sidebarExpanded ? 'md:ml-64' : 'md:ml-20',
        )}
      >
        {/* Desktop sticky header bar */}
        {headerRight && (
          <div className="hidden md:flex items-center justify-end px-8 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
            {headerRight}
          </div>
        )}
        <div className="max-w-7xl mx-auto p-4 md:p-8">{children}</div>
      </main>

    </div>
  );
}
