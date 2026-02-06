import type { AnyThemes } from './types';

const createThemes = <T extends AnyThemes>(themes: T): T => {
  return themes;
};

export default createThemes;
