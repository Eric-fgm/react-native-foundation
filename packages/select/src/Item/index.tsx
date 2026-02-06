import { useRootContext as usePopoverContext } from '@rn-foundation/popover';
import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useRootContext } from '../Root/context';
import ItemContext, { type ItemContextProps } from './context';

export interface ItemProps extends PropsWithRender<PressableProps, ItemContextProps> {
  value: string;
  disabled?: boolean;
  closeOnPress?: boolean;
}

const Item = ({ value, disabled, closeOnPress = true, onPress, render, ...props }: ItemProps) => {
  const { value: rootValue, onSelectValue } = useRootContext();
  const { onClose } = usePopoverContext();

  const selected = rootValue.includes(value);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onSelectValue(value);
      onPress?.(event);
      if (closeOnPress) {
        onClose();
      }
    },
    [value, closeOnPress, onSelectValue, onClose, onPress],
  );

  const contextValue = useMemo(() => ({ selected }), [selected]);

  return (
    <ItemContext.Provider value={contextValue}>
      {useRenderElement(
        Pressable,
        render,
        {
          role: 'option',
          accessibilityRole: 'menuitem',
          accessibilityLabel: value,
          accessibilityState: {
            selected,
            disabled,
          },
          disabled,
          onPress: handlePress,
          ...props,
        },
        contextValue,
      )}
    </ItemContext.Provider>
  );
};

Item.displayName = 'SelectItem';

export default Item;
