import { useControllableState, useRenderElement } from '@rn-foundation/shared';
import { type PropsWithRender } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> extends PropsWithRender<ViewProps, RootContextProps> {
  value?: T | null;
  defaultValue?: T | null;
  disabled?: boolean;
  onValueChange?: (value: T | null) => void;
}

const Root = <T,>({
  value,
  defaultValue,
  disabled = false,
  onValueChange,
  render,
  ...props
}: RootProps<T>) => {
  const [valueState = null, setValueState] = useControllableState({
    state: value,
    defaultState: defaultValue,
  });

  const handleToggleValue = useCallback(
    (value: any) => {
      setValueState(value);
      onValueChange?.(value);
    },
    [setValueState, onValueChange],
  );

  const contextValue = useMemo(
    () => ({ value: valueState, disabled, onToggleValue: handleToggleValue }),
    [valueState, disabled, handleToggleValue],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(
        View,
        render,
        {
          accessibilityRole: 'radiogroup',
          ...props,
        },
        contextValue,
      )}
    </RootContext.Provider>
  );
};

Root.displayName = 'RadioGroupRoot';

export default Root;
