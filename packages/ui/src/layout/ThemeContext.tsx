import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Optional server-provided initial theme (e.g. from user profile in DB).
   * Takes priority over localStorage on first render.
   */
  initialTheme?: Theme;
  /**
   * Called whenever the theme changes so the caller can persist it
   * (e.g. sync to the user profile in the database).
   * Also called once on mount with the resolved initial theme.
   */
  onThemeChange?: (theme: Theme) => void;
  /**
   * localStorage key used to persist the theme.
   * Override this if multiple apps share the same domain to avoid key collisions.
   * Defaults to "ui-theme".
   */
  storageKey?: string;
}

export function ThemeProvider({
  children,
  initialTheme,
  onThemeChange,
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
    return 'light';
  });

  // Apply .dark class to <html> and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // localStorage unavailable
    }
    onThemeChange?.(theme);
  }, [theme, storageKey, onThemeChange]);

  // Adopt a server-provided initialTheme when it arrives after first render (e.g. post-auth)
  useEffect(() => {
    if (initialTheme) setThemeState(initialTheme);
  }, [initialTheme]);

  function setTheme(next: Theme) {
    setThemeState(next);
  }

  function toggleTheme() {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
