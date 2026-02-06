import { createContext, useContext } from 'react';

export interface RootContextProps {
  value: unknown;
  parent: boolean;
  disabled: boolean;
  checked: boolean;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Checkbox.Root');
  }
  return context;
};

export default RootContext;
