import React, { useCallback } from 'react';
import { type LayoutChangeEvent, StyleSheet, type ViewProps } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useScrollHandler } from './hooks';
import { useRootContext } from './Root/context';

export interface HeaderProps extends ViewProps {}

const Header = ({ children, style, ...props }: HeaderProps) => {
  const { itemsHeight, pageScrollSpace, headerHeight, pageId } = useRootContext();
  const { animatedProps, scrollOffset, handleScroll } = useScrollHandler(pageId);

  const maxHeightAnimatedStyle = useAnimatedStyle(() => ({
    maxHeight: headerHeight.value,
  }));

  const scrollSpaceAnimatedStyle = useAnimatedStyle(() => ({
    height: pageScrollSpace.value,
  }));

  const translateYAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -Math.min(scrollOffset.value, headerHeight.value - itemsHeight.value) },
    ],
  }));

  const reverseTranslateYAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollOffset.value }],
  }));

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      'worklet';
      headerHeight.value = event.nativeEvent.layout.height;
    },
    [headerHeight],
  );

  return (
    <Animated.ScrollView
      accessibilityRole="header"
      accessibilityLabel="Collapsible Header"
      style={[styles.container, style, translateYAnimatedStyle, maxHeightAnimatedStyle]}
      showsVerticalScrollIndicator={false}
      animatedProps={animatedProps}
      onScroll={handleScroll}
      {...props}>
      <Animated.View style={reverseTranslateYAnimatedStyle} onLayout={handleLayoutChange}>
        {children}
      </Animated.View>
      <Animated.View style={scrollSpaceAnimatedStyle} pointerEvents="none" />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
});

export default React.memo(Header);
