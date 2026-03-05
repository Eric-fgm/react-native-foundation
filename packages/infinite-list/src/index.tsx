import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export interface InfiniteListProps<TItem> extends FlashListProps<TItem> {
  gap?: number;
}

const InfiniteList = <TItem,>({
  gap = 0,
  horizontal,
  numColumns = 1,
  drawDistance = 300,
  style,
  contentContainerStyle,
  ListHeaderComponentStyle,
  ListFooterComponentStyle,
  ...props
}: InfiniteListProps<TItem>) => {
  const memoizedCellRendererComponent = useCallback(
    ({ index, style, ...props }: any) => {
      const cellStyle = {
        paddingHorizontal: gap / 2,
        paddingTop: horizontal || index < numColumns ? 0 : gap,
      };
      return <View style={[cellStyle, style]} {...props} />;
    },
    [gap, horizontal, numColumns],
  );

  const memoizedStyle = useMemo(
    () => ({
      marginHorizontal: -gap / 2,
      ...styles.overflowVisible,
      ...style,
    }),
    [gap, style],
  );

  return (
    <FlashList
      horizontal={horizontal}
      numColumns={numColumns}
      drawDistance={drawDistance}
      style={memoizedStyle}
      overrideProps={{ style: styles.overflowVisible }}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      ListHeaderComponentStyle={[{ paddingHorizontal: gap / 2 }, ListHeaderComponentStyle]}
      ListFooterComponentStyle={[{ paddingHorizontal: gap / 2 }, ListFooterComponentStyle]}
      CellRendererComponent={memoizedCellRendererComponent}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  overflowVisible: {
    overflow: 'visible',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default InfiniteList;
