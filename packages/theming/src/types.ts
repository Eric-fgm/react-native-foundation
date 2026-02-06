export interface Register {}

export type AnyThemes = Record<
  string,
  {
    palette: Record<string, any>;
    shadows: Record<string, any>;
  }
>;

export type RegisteredThemes<TRegister = Register> = TRegister extends {
  themes: infer TThemes;
}
  ? TThemes
  : AnyThemes;

export type ThemeVariant = keyof RegisteredThemes;

export type Theme = RegisteredThemes[keyof RegisteredThemes];
