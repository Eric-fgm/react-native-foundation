import { useRootContext as usePopoverContext } from '@rn-foundation/popover';
import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

export interface TriggerProps extends PropsWithRender<PressableProps> {}

const Trigger = ({ onLongPress, render, ...props }: TriggerProps) => {
  const { onOpen } = usePopoverContext();

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      onLongPress?.(event);
      onOpen({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
        width: 0,
        height: 0,
      });
    },
    [onLongPress, onOpen],
  );

  return useRenderElement(Pressable, render, {
    onLongPress: handleLongPress,
    ...props,
  });
};

Trigger.defaultName = 'MenuTrigger';

export default Trigger;
