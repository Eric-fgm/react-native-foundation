import { useCallback } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
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
      if (closeOnPress) onClose();
      onPress?.(event);
    },
    [closeOnPress, onClose, onPress],
  );

  if (!opened) return null;

  return (
    <Portal>
      <View accessibilityRole="none" style={[StyleSheet.absoluteFill, styles.container]}>
        <Pressable
          accessibilityLabel="Overlay"
          style={[StyleSheet.absoluteFill, style]}
          onPress={closeOnPress || onPress ? handlePress : undefined}
          {...props}
        />
        {children}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Overlay.displayName = 'DialogOverlay';

export default Overlay;
