import { useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { useRootContext } from './Root/context';

export const useScrollHandler = (id: string | null) => {
  const { headerHeight, scrollOffsetMap, pageScrollSpace, pageId, pageIds } = useRootContext();

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (id !== pageId) return;
      const { y } = event.contentOffset;
      scrollOffsetMap.value = pageIds.reduce<Record<string, number>>((acc, nextId) => {
        if (nextId === id) {
          acc[nextId] = y;
        } else {
          acc[nextId] =
            y < headerHeight.value
              ? Math.max(0, y)
              : Math.max(scrollOffsetMap.value[nextId] ?? 0, headerHeight.value);
        }
        return acc;
      }, {});
    },
  });

  const scrollOffset = useDerivedValue(() => {
    if (pageScrollSpace.value <= 0) return 0;
    return id ? (scrollOffsetMap.value[id] ?? 0) : 0;
  });

  const animatedProps = useAnimatedProps(() => ({
    contentOffset: {
      x: 0,
      y: scrollOffset.value,
    },
    scrollIndicatorInsets: { top: headerHeight.value },
    scrollEnabled: pageScrollSpace.value > 0,
  }));

  return { animatedProps, scrollOffset, handleScroll };
};

export const useScrollViewMeasurements = () => {
  const containerHeight = useSharedValue(0);
  const contentContainerHeight = useSharedValue(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      containerHeight.value = event.nativeEvent.layout.height;
    },
    [containerHeight],
  );

  const onContentSizeChange = useCallback(
    (_: number, height: number) => {
      contentContainerHeight.value = height;
    },
    [contentContainerHeight],
  );

  return { containerHeight, contentContainerHeight, onLayout, onContentSizeChange };
};
