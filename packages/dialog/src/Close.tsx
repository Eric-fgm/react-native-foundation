import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface CloseProps extends PropsWithRender<PressableProps> {}

const Close = ({ onPress, render, ...props }: CloseProps) => {
  const { onClose } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onClose();
      onPress?.(event);
    },
    [onClose, onPress],
  );

  return useRenderElement(Pressable, render, {
    onPress: handlePress,
    ...props,
  });
};

Close.displayName = 'DialogClose';

export default Close;
