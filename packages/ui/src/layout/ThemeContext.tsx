import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'ui-theme';

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
   */
  onThemeChange?: (theme: Theme) => void;
}

export function ThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // localStorage unavailable
    }
    return 'light';
  });

  // Apply .dark class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable
    }
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  // If a server-provided initialTheme arrives later (e.g. after auth), adopt it
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
