import {
  type PropsWithRender,
  useControllableState,
  useRenderElement,
} from '@rn-foundation/shared';
import * as ToggleGroup from '@rn-foundation/toggle-group';
import { useCallback, useContext, useId, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> extends PropsWithRender<PressableProps, RootContextProps> {
  value?: T;
  disabled?: boolean;
  activated?: boolean;
  defaultActivated?: boolean;
  onActivatedChange?: (activated: boolean) => void;
}

const Root = <T,>({
  value,
  disabled = false,
  activated,
  defaultActivated,
  onActivatedChange,
  onPress,
  render,
  ...props
}: RootProps<T>) => {
  const toggleId = useId();
  const toggleValue = value ?? toggleId;
  const toggleGroupContext = useContext(ToggleGroup.RootContext);
  const [activatedState = false, setActivatedState] = useControllableState(
    toggleGroupContext
      ? {
          state: toggleGroupContext.value.includes(toggleValue),
          defaultState: undefined,
        }
      : {
          state: activated,
          defaultState: defaultActivated,
        },
  );

  const toggleDisabled = disabled || !!toggleGroupContext?.disabled;

  const handleActivatedChange = useCallback(
    (event: GestureResponderEvent) => {
      const newActivatedState = !activatedState;
      onPress?.(event);
      setActivatedState(newActivatedState);
      onActivatedChange?.(newActivatedState);
      toggleGroupContext?.onToggleValue?.(toggleValue);
    },
    [
      activatedState,
      toggleValue,
      toggleGroupContext,
      onPress,
      setActivatedState,
      onActivatedChange,
    ],
  );

  const contextValue = useMemo(
    () => ({
      value: toggleValue,
      disabled: toggleDisabled,
      activated: activatedState,
    }),
    [toggleValue, toggleDisabled, activatedState],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(
        Pressable,
        render,
        {
          accessibilityRole: 'togglebutton',
          accessibilityState: {
            checked: activatedState,
            disabled: toggleDisabled,
          },
          disabled: toggleDisabled,
          onPress: handleActivatedChange,
          ...props,
        },
        contextValue,
      )}
    </RootContext.Provider>
  );
};

Root.displayName = 'ToggleRoot';

export default Root;
