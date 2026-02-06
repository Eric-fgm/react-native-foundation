import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useRootContext } from '../Root/context';
import ItemContext, { type ItemContextProps } from './context';

export interface ItemProps extends PropsWithRender<PressableProps, ItemContextProps> {
  value: unknown;
  disabled?: boolean;
}

const Item = ({ value, disabled = false, onPress, render, ...props }: ItemProps) => {
  const { value: rootValue, disabled: rootDisabled, onToggleValue } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onToggleValue(value);
    },
    [value, onPress, onToggleValue],
  );

  const contextValue = useMemo(() => ({ selected: rootValue === value }), [rootValue, value]);

  return (
    <ItemContext.Provider value={contextValue}>
      {useRenderElement(
        Pressable,
        render,
        {
          accessibilityRole: 'radio',
          disabled: disabled || rootDisabled,
          onPress: handlePress,
          ...props,
        },
        contextValue,
      )}
    </ItemContext.Provider>
  );
};

Item.displayName = 'RadioGroupItem';

export default Item;
