import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useMemo } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';
import { formatValueToProgress } from './utils';

export interface ThumbProps extends PropsWithRender<ViewProps> {
  index?: number;
}

const Thumb = ({ index = 0, style, render, ...props }: ThumbProps) => {
  const { min, max, value, orientation } = useRootContext();

  const progress = useMemo(
    () => formatValueToProgress(value[index], min, max),
    [value, index, min, max],
  );

  return useRenderElement(View, render, {
    style: [
      styles.container,
      orientation === 'horizontal'
        ? {
            transform: [
              {
                translateX: '-50%',
              },
            ],
            left: `${progress}%`,
          }
        : {
            transform: [
              {
                translateY: '-50%',
              },
            ],
            top: `${progress}%`,
          },
      style,
    ],
    ...props,
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

Thumb.displayName = 'SliderThumb';

export default Thumb;
