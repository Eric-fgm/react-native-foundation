import { useControllableState } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> {
  children: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  value?: T[];
  defaultValue?: T[];
  disabled?: boolean;
  multiple?: boolean;
  onValueChange?: (value: T[]) => void;
}

const Root = <T,>({
  children,
  value,
  defaultValue,
  disabled = false,
  multiple = false,
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
        : multiple
          ? [...valueState, value]
          : [value];
      setValueState(newValue);
      onValueChange?.(newValue);
    },
    [multiple, valueState, setValueState, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      value: valueState,
      disabled,
      onToggleValue: handleToggleValue,
    }),
    [valueState, disabled, handleToggleValue],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RootContext.Provider>
  );
};

Root.displayName = 'ToggleGroupRoot';

export default Root;
