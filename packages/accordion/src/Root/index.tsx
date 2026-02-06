import {
  type PropsWithRender,
  useControllableState,
  useRenderElement,
} from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> extends PropsWithRender<ViewProps, RootContextProps> {
  multiple?: boolean;
  disabled?: boolean;
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (value: T[]) => void;
}

const Root = <T,>({
  multiple = false,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
  render,
  ...props
}: RootProps<T>) => {
  const [valueState = [], setValueState] = useControllableState({
    state: value,
    defaultState: defaultValue,
  });

  const handleToggleValue = useCallback(
    (value: any) => {
      const newValue = valueState.includes(value)
        ? valueState.filter((v) => v !== value)
        : multiple
          ? [...valueState, value]
          : [value];
      setValueState(newValue);
      onValueChange?.(newValue);
    },
    [multiple, valueState, onValueChange, setValueState],
  );

  const contextValue = useMemo(
    () => ({
      multiple,
      disabled,
      value: valueState,
      onToggleValue: handleToggleValue,
    }),
    [multiple, disabled, valueState, handleToggleValue],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(View, render, { role: 'region', ...props }, contextValue)}
    </RootContext.Provider>
  );
};

Root.displayName = 'AccordionRoot';

export default Root;
