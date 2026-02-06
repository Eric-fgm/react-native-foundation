import { RootContext as CheckboxGroupContext } from '@rn-foundation/checkbox-group';
import {
  type PropsWithRender,
  useControllableState,
  useRenderElement,
} from '@rn-foundation/shared';
import { useCallback, useContext, useId, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps<T> extends PropsWithRender<PressableProps, RootContextProps> {
  value?: T;
  parent?: boolean;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Root = <T,>({
  value,
  parent = false,
  disabled = false,
  checked,
  defaultChecked,
  onCheckedChange,
  onPress,
  render,
  ...props
}: RootProps<T>) => {
  const checkboxId = useId();
  const checkboxValue = value ?? checkboxId;
  const checkboxGroupContext = useContext(CheckboxGroupContext);
  const [checkedState = false, setCheckedState] = useControllableState(
    checkboxGroupContext
      ? {
          state: checkboxGroupContext.value.includes(checkboxValue),
          defaultState: undefined,
        }
      : {
          state: checked,
          defaultState: defaultChecked,
        },
  );

  const checkboxDisabled = disabled || !!checkboxGroupContext?.disabled;

  const handleToggleChecked = useCallback(
    (event: GestureResponderEvent) => {
      const newCheckedState = !checkedState;
      onPress?.(event);
      setCheckedState(newCheckedState);
      onCheckedChange?.(newCheckedState);
      if (parent) {
        checkboxGroupContext?.onSetValue?.(
          checkboxGroupContext.allValues.length === checkboxGroupContext.value.length
            ? []
            : checkboxGroupContext.allValues,
        );
      } else {
        checkboxGroupContext?.onToggleValue?.(checkboxValue);
      }
    },
    [
      parent,
      checkboxValue,
      checkboxGroupContext,
      checkedState,
      onPress,
      setCheckedState,
      onCheckedChange,
    ],
  );

  const contextValue = useMemo(
    () => ({
      value: checkboxValue,
      parent,
      disabled: checkboxDisabled,
      checked: checkedState,
    }),
    [checkboxValue, parent, checkboxDisabled, checkedState],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(
        Pressable,
        render,
        {
          accessibilityRole: 'checkbox',
          accessibilityState: {
            checked: checkedState,
            disabled: checkboxDisabled,
          },
          disabled: checkboxDisabled,
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
