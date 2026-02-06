import {
  type ElementMeasurement,
  type Orientation,
  useControllableState,
} from '@rn-foundation/shared';
import { useCallback, useMemo, useState } from 'react';

import { getSnappedValue, getUpdatedValue, normalizeValue } from '../utils';
import RootContext, { type RootContextProps } from './context';

export interface RootProps {
  children: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  min?: number;
  max?: number;
  value?: number | number[];
  defaultValue?: number | number[];
  step?: number;
  stepsBetweenThumbs?: number;
  orientation?: Orientation;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
}

const Root = ({
  children,
  min = 0,
  max = 100,
  value,
  defaultValue,
  step = 1,
  stepsBetweenThumbs = 0,
  orientation = 'horizontal',
  onValueChange,
  onValueCommit,
}: RootProps) => {
  const [valueState = [min], setValueState] = useControllableState({
    state: normalizeValue(value, min, max),
    defaultState: normalizeValue(defaultValue, min, max),
  });
  const [trackMeasurement, setTrackMeasurement] = useState<ElementMeasurement | null>(null);

  const handleProgressChange = useCallback(
    (value: number, index: number) => {
      if (index >= valueState.length) return;

      const updatedValue = getUpdatedValue({
        values: valueState,
        value,
        index,
        step,
        stepsBetweenThumbs,
        min,
        max,
      });
      const snappedValue = getSnappedValue(updatedValue, step);

      setValueState(snappedValue);
      onValueChange?.(snappedValue);
    },
    [valueState, step, min, max, stepsBetweenThumbs, onValueChange, setValueState],
  );

  const handleProgressCommit = useCallback(() => {
    onValueCommit?.(valueState);
  }, [valueState, onValueCommit]);

  const contextValue = useMemo(
    () => ({
      min,
      max,
      value: valueState,
      orientation,
      trackMeasurement,
      setTrackMeasurement,
      onProgressChange: handleProgressChange,
      onProgressCommit: handleProgressCommit,
    }),
    [
      min,
      max,
      valueState,
      orientation,
      trackMeasurement,
      setTrackMeasurement,
      handleProgressChange,
      handleProgressCommit,
    ],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RootContext.Provider>
  );
};

Root.displayName = 'SliderRoot';

export default Root;
