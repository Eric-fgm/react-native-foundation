import type { ElementMeasurement } from '@rn-foundation/shared';
import { createContext, useContext } from 'react';

export interface RootContextProps {
  anchorMeasurement: ElementMeasurement | null;
  opened: boolean;
  onOpen: (anchorMeasurement: ElementMeasurement) => void;
  onClose: () => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Popover.Root');
  }
  return context;
};

export default RootContext;
