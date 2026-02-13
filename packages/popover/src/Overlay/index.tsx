import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  StyleSheet,
} from 'react-native';

import { useRootContext } from '../Root/context';
import Portal from './Portal';

export interface OverlayProps extends PropsWithRender<PressableProps> {
  closeOnPress?: boolean;
}

const Overlay = ({
  children,
  style,
  closeOnPress = true,
  onPress,
  render,
  ...props
}: OverlayProps) => {
  const { opened, onClose } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (closeOnPress) onClose();
    },
    [closeOnPress, onClose, onPress],
  );

  const overlayElement = useRenderElement(Pressable, render, {
    accessibilityLabel: 'Overlay',
    style: [StyleSheet.absoluteFill, style],
    onPress: closeOnPress || onPress ? handlePress : undefined,
    ...props,
  });

  if (!opened) return null;

  return (
    <Portal>
      {overlayElement}
      {children}
    </Portal>
  );
};

Overlay.displayName = 'PopoverOverlay';

export default Overlay;
