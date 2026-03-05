import { createContext, useContext } from 'react';
import type { View } from 'react-native';
import type { AnimatedRef } from 'react-native-reanimated';

export interface RootContextProps {
  triggerRef: AnimatedRef<View>;
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
