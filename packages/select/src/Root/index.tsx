import * as Popover from '@rn-foundation/popover';
import { useControllableState } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> extends Omit<Popover.RootProps, 'children'> {
  children: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  multiple?: boolean;
  placeholder?: string;
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (value: T[]) => void;
}

const Root = <T,>({
  children,
  multiple = false,
  placeholder = '',
  value,
  defaultValue,
  onValueChange,
  ...props
}: RootProps<T>) => {
  const [valueState = [], setValueState] = useControllableState({
    state: value,
    defaultState: defaultValue,
  });

  const handleSelectValue = useCallback(
    (value: any) => {
      const newValue = multiple
        ? valueState.includes(value)
          ? valueState.filter((v) => v !== value)
          : [...valueState, value]
        : valueState.includes(value)
          ? valueState
          : [value];
      setValueState(newValue);
      onValueChange?.(newValue);
    },
    [multiple, valueState, setValueState, onValueChange],
  );

  const contextValue = useMemo(
    () => ({ placeholder, value: valueState, onSelectValue: handleSelectValue }),
    [placeholder, valueState, handleSelectValue],
  );

  return (
    <RootContext.Provider value={contextValue}>
      <Popover.Root {...props}>
        {typeof children === 'function' ? children(contextValue) : children}
      </Popover.Root>
    </RootContext.Provider>
  );
};

Root.displayName = 'SelectRoot';

export default Root;
