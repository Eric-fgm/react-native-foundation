import { createContext, useContext } from 'react';

export interface RootContextProps {
  value: unknown[];
  disabled: boolean;
  onToggleValue: (value: unknown) => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a ToggleGroup.Root');
  }
  return context;
};

export default RootContext;
