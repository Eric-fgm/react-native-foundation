import { createContext, useContext } from 'react';

import type { RegisteredThemes, Theme, ThemeVariant } from './types';

interface ThemeContextProps {
  variant: ThemeVariant;
  theme: Theme;
  themes: RegisteredThemes;
  setTheme: (variant?: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
