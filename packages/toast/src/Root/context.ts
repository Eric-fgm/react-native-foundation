import { createContext, useContext } from 'react';

import type { ManagerObject } from '../manager';

export interface RootContextProps extends ManagerObject {}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Toast.Root');
  }
  return context;
};

export default RootContext;
