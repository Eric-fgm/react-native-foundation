import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import type PagerView from 'react-native-pager-view';
import { useSharedValue } from 'react-native-reanimated';

import RootContext from './context';

export interface RootProps extends PropsWithRender<ViewProps> {
  initialPage?: number;
  ref?: React.Ref<{ scrollToPage: (index: number) => void }>;
}

const Root = ({ ref, style, initialPage = 0, render, ...props }: RootProps) => {
  const pagerViewRef = useRef<PagerView>(null);
  const scrollOffsetMap = useSharedValue<Record<string, number | undefined>>({});
  const headerHeight = useSharedValue(0);
  const itemsHeight = useSharedValue(0);
  const pageScrollSpace = useSharedValue(0);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageIds, setPageIds] = useState<string[]>([]);

  const scrollToPage = useCallback(
    (index: number) => {
      pagerViewRef.current?.setPage(Math.max(Math.min(index, pageIds.length - 1), 0));
    },
    [pageIds],
  );

  useImperativeHandle(ref, () => ({
    scrollToPage,
  }));

  return (
    <RootContext.Provider
      value={useMemo(
        () => ({
          scrollOffsetMap,
          pageScrollSpace,
          headerHeight,
          itemsHeight,
          pageId,
          setPageId,
          pageIds,
          setPageIds,
          pageIndex,
          setPageIndex,
          pagerViewRef,
          scrollToPage,
        }),
        [
          scrollOffsetMap,
          pageScrollSpace,
          headerHeight,
          itemsHeight,
          pageId,
          setPageId,
          pageIds,
          setPageIds,
          pageIndex,
          setPageIndex,
          pagerViewRef,
          scrollToPage,
        ],
      )}>
      {useRenderElement(View, render, { style: [styles.container, style], ...props })}
    </RootContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default React.memo(Root);
