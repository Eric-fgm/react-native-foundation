import { useCallback, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import ThemeContext from './context';
import type { RegisteredThemes, ThemeVariant } from './types';

interface ThemeProviderProps {
  children: React.ReactNode;
  themes: RegisteredThemes;
  defaultVariant?: ThemeVariant;
}

const ThemeProvider = ({ children, themes, defaultVariant }: ThemeProviderProps) => {
  const colorSchema = useColorScheme();
  const [variant, setVariant] = useState<ThemeVariant>(
    defaultVariant ? defaultVariant : colorSchema,
  );

  const setTheme = useCallback(
    (variant?: ThemeVariant) => setVariant(variant ? variant : colorSchema),
    [colorSchema, setVariant],
  );

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          variant,
          theme: themes[variant],
          themes,
          setTheme,
        }),
        [variant, themes, setTheme],
      )}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
