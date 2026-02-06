import { createContext, useContext } from 'react';

import type { ManagerObject, ManagerPartialObject } from '../manager';

export interface ProviderContextProps {
  toasts: ManagerObject[];
  onAdd: (toast: ManagerPartialObject) => void;
  onUpdate: (id: string, updates: ManagerPartialObject) => void;
  onRemove: (id: string) => void;
}

const ProviderContext = createContext<ProviderContextProps | null>(null);

export const useProviderContext = () => {
  const context = useContext(ProviderContext);
  if (context === null) {
    throw new Error('useProviderContext must be used within a Toast.Provider');
  }
  return context;
};

export default ProviderContext;
