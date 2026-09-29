// src/theme/ThemeContext.js
// Theme Context & Provider untuk PengeluaranKu
// Mendukung light/dark mode, token access via hook

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { colors, spacing, radius, typography, shadows, transitions, zIndex, currency } from './tokens';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(systemColorScheme);

  // Sync with system changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
      setColorScheme(newScheme);
    });
    return () => subscription.remove();
  }, []);

  const isDark = colorScheme === 'dark';

  const theme = useMemo(() => ({
    colors: isDark ? { ...colors, ...colors.dark } : colors,
    spacing,
    radius,
    typography,
    shadows,
    transitions,
    zIndex,
    currency,
    isDark,
    toggleTheme: () => setColorScheme(prev => prev === 'dark' ? 'light' : 'dark'),
    setTheme: (scheme) => setColorScheme(scheme),
  }), [isDark]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Convenience hooks untuk token akses cepat
export function useColors() {
  const { colors } = useTheme();
  return colors;
}

export function useSpacing() {
  const { spacing } = useTheme();
  return spacing;
}

export function useRadius() {
  const { radius } = useTheme();
  return radius;
}

export function useTypography() {
  const { typography } = useTheme();
  return typography;
}

export function useShadows() {
  const { shadows } = useTheme();
  return shadows;
}