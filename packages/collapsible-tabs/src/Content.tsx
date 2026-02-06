import React, { useEffect, useId } from 'react';
import { StyleSheet } from 'react-native';
import PagerView, { type PagerViewProps } from 'react-native-pager-view';
import Animated, {
  type AnimatedScrollViewProps,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useScrollHandler, useScrollViewMeasurements } from './hooks';
import { useRootContext } from './Root/context';

type Child =
  | ((
      props: Pick<
        AnimatedScrollViewProps,
        | 'role'
        | 'accessibilityElementsHidden'
        | 'animatedProps'
        | 'style'
        | 'onScroll'
        | 'onLayout'
        | 'onContentSizeChange'
      >,
    ) => React.ReactNode)
  | React.ReactNode;

export interface ContentProps extends Pick<
  PagerViewProps,
  | 'style'
  | 'scrollEnabled'
  | 'offscreenPageLimit'
  | 'pageMargin'
  | 'keyboardDismissMode'
  | 'onPageScroll'
  | 'onPageSelected'
  | 'onPageScrollStateChanged'
> {
  children: Child[];
}

const ContentChild = ({ children, isActive }: { children: Child; isActive: boolean }) => {
  const id = useId();
  const { pageScrollSpace, headerHeight, setPageId, setPageIds } = useRootContext();
  const { animatedProps, handleScroll } = useScrollHandler(id);
  const { containerHeight, contentContainerHeight, onLayout, onContentSizeChange } =
    useScrollViewMeasurements();

  const animatedStyle = useAnimatedStyle(() => ({
    paddingTop: headerHeight.value,
  }));

  useAnimatedReaction(
    () => ({
      isActive,
      scrollSpace: contentContainerHeight.value
        ? contentContainerHeight.value - containerHeight.value + headerHeight.value
        : 0,
    }),
    ({ isActive, scrollSpace }) => {
      if (!isActive) return;
      pageScrollSpace.value = scrollSpace;
    },
  );

  useEffect(() => {
    if (isActive) {
      setPageId(id);
    }
  }, [isActive, id, setPageId]);

  useEffect(() => {
    setPageIds((prevIds) => [...prevIds, id]);
    return () => {
      setPageIds((prevIds) => prevIds.filter((pageId) => pageId !== id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typeof children === 'function' ? (
    children({
      role: 'tabpanel',
      accessibilityElementsHidden: !isActive,
      animatedProps,
      style: animatedStyle,
      onScroll: handleScroll,
      onLayout,
      onContentSizeChange,
    })
  ) : (
    <Animated.View style={animatedStyle}>{children}</Animated.View>
  );
};

const Content = ({ children, style, onPageSelected, ...props }: ContentProps) => {
  const { pagerViewRef, pageIndex, setPageIndex } = useRootContext();

  return (
    <PagerView
      ref={pagerViewRef}
      style={[styles.container, style]}
      initialPage={pageIndex}
      onPageSelected={(event) => {
        setPageIndex(event.nativeEvent.position);
        onPageSelected?.(event);
      }}
      {...props}
      overdrag>
      {children.map((child, index) => (
        <ContentChild key={index} isActive={pageIndex === index}>
          {child}
        </ContentChild>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Content);
