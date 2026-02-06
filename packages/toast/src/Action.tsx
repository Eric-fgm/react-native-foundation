import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface ActionProps extends PropsWithRender<PressableProps> {}

const Action = ({ onPress, render, ...props }: ActionProps) => {
  const { onAction } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onAction?.();
    },
    [onPress, onAction],
  );

  return useRenderElement(Pressable, render, {
    onPress: handlePress,
    ...props,
  });
};

Action.displayName = 'ToastAction';

export default Action;
