import { useControllableState } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> {
  children: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  value?: T[];
  allValues?: T[];
  defaultValue?: T[];
  disabled?: boolean;
  onValueChange?: (value: T[]) => void;
}

const Root = <T,>({
  children,
  value,
  allValues = [],
  defaultValue,
  disabled = false,
  onValueChange,
}: RootProps<T>) => {
  const [valueState = [], setValueState] = useControllableState({
    state: value,
    defaultState: defaultValue,
  });

  const handleToggleValue = useCallback(
    (value: any) => {
      const newValue = valueState.includes(value)
        ? valueState.filter((v) => v !== value)
        : [...valueState, value];
      setValueState(newValue);
      onValueChange?.(newValue);
    },
    [valueState, setValueState, onValueChange],
  );

  const handleSetValue = useCallback(
    (values: any) => {
      setValueState(values);
      onValueChange?.(values);
    },
    [setValueState, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      value: valueState,
      allValues,
      disabled,
      onToggleValue: handleToggleValue,
      onSetValue: handleSetValue,
    }),
    [valueState, allValues, disabled, handleToggleValue, handleSetValue],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RootContext.Provider>
  );
};

Root.displayName = 'CheckboxGroupRoot';

export default Root;
