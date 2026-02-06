import { createContext, useContext } from 'react';

export interface RootContextProps {
  value: unknown[];
  allValues: unknown[];
  disabled: boolean;
  onToggleValue: (value: unknown) => void;
  onSetValue: (value: unknown[]) => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a CheckboxGroup.Root');
  }
  return context;
};

export default RootContext;
