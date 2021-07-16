import React, { useState, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export default function useThemeMode() {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme');
  const [theme, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setStoredTheme('dark');
      setTheme('dark');
    } else {
      setStoredTheme('light');
      setTheme('light');
    }
  };

  useEffect(() => {
    storedTheme ? setTheme(storedTheme) : setTheme('light');
    setMountedComponent(true);
  }, []);

  return [theme, toggleTheme, mountedComponent];
}
