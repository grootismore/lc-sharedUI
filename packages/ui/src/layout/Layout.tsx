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
  /** Header slot — right side of the fixed top bar (e.g. notifications + avatar). */
  headerRight?: React.ReactNode;
  /** Callback fired when a nav item is clicked. Use to update the router. */
  onNavigate: (path: string) => void;
  /** The currently active path, used to highlight the active nav item. */
  activePath?: string;
  children: React.ReactNode;
}

export function Layout({
  navItems,
  appName,
  logo,
  headerRight,
  onNavigate,
  activePath,
  children,
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = sidebarExpanded ? 'w-64' : 'w-20';

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
              <span className="font-extrabold text-indigo-600 truncate">
                {appName}
              </span>
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

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {navItems.map(item => {
            const active = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
                  !sidebarExpanded && 'justify-center',
                )}
                title={!sidebarExpanded ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {sidebarExpanded && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="px-2 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={toggleTheme}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
              'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
              !sidebarExpanded && 'justify-center',
            )}
            title={!sidebarExpanded ? 'Toggle theme' : undefined}
          >
            <span className="shrink-0">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </span>
            {sidebarExpanded && (
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            )}
          </button>
        </div>
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
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile nav */}
              <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
                {navItems.map(item => {
                  const active = activePath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        onNavigate(item.path);
                        setMobileOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                        active
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
                      )}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile theme toggle */}
              <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Fixed top header (mobile only) ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
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
        {/* Desktop header bar */}
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
