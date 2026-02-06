import type { ElementMeasurement, Orientation } from '@rn-foundation/shared';
import { createContext, useContext } from 'react';

export interface RootContextProps {
  min: number;
  max: number;
  value: number[];
  orientation: Orientation;
  trackMeasurement: ElementMeasurement | null;
  setTrackMeasurement: (measurement: ElementMeasurement) => void;
  onProgressChange: (progress: number, index: number) => void;
  onProgressCommit: () => void;
}

const RootContext = createContext<RootContextProps | null>(null);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (context === null) {
    throw new Error('useRootContext must be used within a Slider.Root');
  }
  return context;
};

export default RootContext;
