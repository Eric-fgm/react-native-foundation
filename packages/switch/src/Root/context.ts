import { createContext, useContext } from 'react';

export interface RootContextProps {
  disabled: boolean;
  checked: boolean;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Switch.Root');
  }
  return context;
};

export default RootContext;
