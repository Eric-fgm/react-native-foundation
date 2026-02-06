import { useRootContext as usePopoverContext } from '@rn-foundation/popover';
import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useContext } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import GroupContext from './Group/context';

export interface ItemProps extends PropsWithRender<PressableProps> {
  closeOnPress?: boolean;
}

const Item = ({ disabled = false, closeOnPress = true, onPress, render, ...props }: ItemProps) => {
  const groupContext = useContext(GroupContext);
  const { onClose } = usePopoverContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (closeOnPress) {
        onClose();
      }
    },
    [closeOnPress, onPress, onClose],
  );

  return useRenderElement(Pressable, render, {
    accessibilityRole: 'menuitem',
    disabled: disabled || !!groupContext?.disabled,
    onPress: handlePress,
    ...props,
  });
};

Item.displayName = 'MenuItem';

export default Item;
