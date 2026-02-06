import { useCallback } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

import { useRootContext } from '../Root/context';
import Portal from './Portal';

export interface OverlayProps extends Omit<PressableProps, 'children' | 'style'> {
  children: React.ReactNode;
  style?: ViewStyle;
  closeOnPress?: boolean;
}

const Overlay = ({ children, style, closeOnPress = true, onPress, ...props }: OverlayProps) => {
  const { opened, onClose } = useRootContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (closeOnPress) onClose();
    },
    [closeOnPress, onClose, onPress],
  );

  if (!opened) return null;

  return (
    <Portal>
      <Pressable
        accessibilityLabel="Overlay"
        style={[StyleSheet.absoluteFill, style]}
        onPress={closeOnPress || onPress ? handlePress : undefined}
        {...props}
      />
      {children}
    </Portal>
  );
};

Overlay.displayName = 'PopoverOverlay';

export default Overlay;
