import { createContext, useContext } from 'react';

export interface RootContextProps {
  multiple: boolean;
  disabled: boolean;
  value: unknown[];
  onToggleValue: (value: unknown) => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used within a Accordion.Root');
  }
  return context;
};

export default RootContext;
