import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';
import { formatValueToProgress } from './utils';

export interface IndicatorProps extends PropsWithRender<ViewProps> {}

const Indicator = ({ style, render, ...props }: IndicatorProps) => {
  const { min, max, value, orientation } = useRootContext();

  const { offset, progress } = useMemo(() => {
    const firstValueAsProgress = formatValueToProgress(value[0], min, max);

    if (value.length === 1) {
      return {
        offset: 0,
        progress: firstValueAsProgress,
      };
    }
    return {
      offset: firstValueAsProgress,
      progress: formatValueToProgress(value[value.length - 1], min, max) - firstValueAsProgress,
    };
  }, [value, min, max]);

  return useRenderElement(View, render, {
    style: [
      orientation === 'horizontal'
        ? { left: `${offset}%`, width: `${progress}%` }
        : {
            top: `${offset}%`,
            height: `${progress}%`,
          },
      style,
    ],
    ...props,
  });
};

Indicator.displayName = 'SliderIndicator';

export default Indicator;
