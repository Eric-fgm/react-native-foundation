import { createThemes, ThemeProvider } from '@rn-foundation/theming';
import { Slot } from 'expo-router';

const themes = createThemes({
  light: {
    palette: {
      text: '#000000',
      background: '#ffffff',
      card: {
        background: '#f0f0f0',
      },
    },
    shadows: {},
  },
  dark: {
    palette: {
      text: '#ffffff',
      background: '#000000',
      card: {
        background: '#f0f0f0',
      },
    },
    shadows: {},
  },
  custom: {
    palette: {
      text: '#ff00ff',
      background: '#00ffff',
      card: {
        background: '#f0f0f0',
      },
    },
    shadows: {},
  },
});

declare module '@rn-foundation/theming' {
  export interface Register {
    themes: typeof themes;
  }
}

const ThemingLayout = () => {
  return (
    <ThemeProvider themes={themes}>
      <Slot />
    </ThemeProvider>
  );
};

export default ThemingLayout;
