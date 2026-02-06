import {
  type PropsWithRender,
  useControllableState,
  useRenderElement,
} from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps extends PropsWithRender<PressableProps, RootContextProps> {
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

const Root = ({
  disabled = false,
  checked,
  defaultChecked,
  onCheckedChange,
  onPress,
  render,
  ...props
}: RootProps) => {
  const [checkedState = false, setCheckedState] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
  });

  const handleToggleChecked = useCallback(
    (event: GestureResponderEvent) => {
      const newCheckedState = !checkedState;
      onPress?.(event);
      setCheckedState(newCheckedState);
      onCheckedChange?.(newCheckedState);
    },
    [checkedState, onPress, setCheckedState, onCheckedChange],
  );

  const contextValue = useMemo(
    () => ({
      disabled,
      checked: checkedState,
    }),
    [disabled, checkedState],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(
        Pressable,
        render,
        {
          accessibilityRole: 'switch',
          accessibilityState: {
            checked: checkedState,
            disabled,
          },
          disabled,
          onPress: handleToggleChecked,
          ...props,
        },
        contextValue,
      )}
    </RootContext.Provider>
  );
};

Root.displayName = 'CheckboxRoot';

export default Root;
