import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useRef } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type View,
} from 'react-native';

import { useRootContext } from './Root/context';

export interface TriggerProps extends PropsWithRender<PressableProps> {
  withLongPress?: boolean;
}

const Trigger = ({ onPress, onLongPress, render, withLongPress, ...props }: TriggerProps) => {
  const { onOpen } = useRootContext();
  const ref = useRef<View>(null);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      ref.current?.measure((_x, _y, width, height, pageX, pageY) => {
        onOpen({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    },
    [onPress, onOpen],
  );

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
    ref,
    ...(withLongPress ? { onLongPress: handleLongPress } : { onPress: handlePress }),
    ...props,
  });
};

Trigger.defaultName = 'PopoverTrigger';

export default Trigger;
