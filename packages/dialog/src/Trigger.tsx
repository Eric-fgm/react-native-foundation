import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface TriggerProps extends PropsWithRender<PressableProps> {}

const Trigger = ({ onPress, render, ...props }: TriggerProps) => {
  const { onToggle } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onToggle();
    },
    [onPress, onToggle],
  );

  return useRenderElement(Pressable, render, {
    onPress: handlePress,
    ...props,
  });
};

Trigger.defaultName = 'DialogTrigger';

export default Trigger;
