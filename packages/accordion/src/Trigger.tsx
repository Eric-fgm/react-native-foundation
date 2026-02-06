import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useItemContext } from './Item/context';

export interface TriggerProps extends PropsWithRender<PressableProps> {}

const Trigger = ({ onPress, render, ...props }: TriggerProps) => {
  const { expanded, disabled, onItemToggle, triggerId } = useItemContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onItemToggle();
    },
    [onItemToggle, onPress],
  );

  return useRenderElement(Pressable, render, {
    accessibilityState: { disabled, expanded },
    nativeID: triggerId,
    disabled,
    onPress: handlePress,
    ...props,
  });
};

Trigger.displayName = 'AccordionTrigger';

export default Trigger;
