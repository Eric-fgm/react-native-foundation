import type { Insets } from '@rn-foundation/shared';
import { createContext, useContext } from 'react';

export interface RootContextProps {
  insets: Insets;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Preview.Root');
  }
  return context;
};

export default RootContext;
