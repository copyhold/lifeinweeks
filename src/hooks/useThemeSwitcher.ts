import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

const LOCAL_STORAGE_KEY = 'themeMode';

// Function to get the initial theme mode from localStorage or default to 'system'
const getInitialThemeMode = (): ThemeMode => {
  try {
    const storedMode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'system') {
      return storedMode;
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
  }
  return 'system'; // Default theme
};

export const useThemeSwitcher = () => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode);

  // Apply theme to the <html> element whenever themeMode changes
  useLayoutEffect(() => {
    const htmlElement = document.documentElement;
    if (themeMode === 'light') {
      htmlElement.style.colorScheme = 'light';
    } else if (themeMode === 'dark') {
      htmlElement.style.colorScheme = 'dark';
    } else {
      // 'system': Let the browser/OS decide based on CSS `color-scheme: light dark`
      htmlElement.style.colorScheme = 'light dark';
    }
  }, [themeMode]);

  // Function to update theme and persist to localStorage
  const setThemeMode = useCallback((mode: ThemeMode) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, []);

  return { themeMode, setThemeMode };
};