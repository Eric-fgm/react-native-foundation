import { createContext, useContext } from 'react';
import type { ImageSourcePropType } from 'react-native';

export interface RootContextProps {
  src: ImageSourcePropType;
  alt: string;
  status: 'loading' | 'error' | 'loaded';
  setStatus: (status: RootContextProps['status']) => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used within a Avatar.Root');
  }
  return context;
};

export default RootContext;
