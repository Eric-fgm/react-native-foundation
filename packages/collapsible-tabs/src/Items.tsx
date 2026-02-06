import React from 'react';
import { type LayoutChangeEvent, StyleSheet, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { useRootContext } from './Root/context';

export interface ItemsProps extends ViewProps {}

const Items = ({ children, style, onLayout, ...props }: ItemsProps) => {
  const { headerHeight, itemsHeight, pageId, scrollOffsetMap } = useRootContext();
  const offsetY = useSharedValue<number>(0);

  const scrollOffset = useDerivedValue(() => {
    return pageId ? (scrollOffsetMap.value[pageId] ?? 0) : 0;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: Math.min(
          Math.max(scrollOffset.value - offsetY.value, 0),
          headerHeight.value - itemsHeight.value - offsetY.value,
        ),
      },
    ],
  }));

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    offsetY.value = event.nativeEvent.layout.y;
    itemsHeight.value = event.nativeEvent.layout.height;
    onLayout?.(event);
  };

  return (
    <Animated.View
      accessibilityRole="tablist"
      style={[style, styles.container, animatedStyle]}
      onLayout={handleLayoutChange}
      {...props}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({ container: { zIndex: 1 } });

export default React.memo(Items);
