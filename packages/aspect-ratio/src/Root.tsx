import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { View, type ViewProps } from 'react-native';

export interface RootProps extends PropsWithRender<ViewProps> {
  ratio?: number;
}

const Root = ({ style, ratio = 1, render, ...props }: RootProps) => {
  return useRenderElement(View, render, { style: [style, { aspectRatio: ratio }], ...props });
};

Root.displayName = 'AspectRatioRoot';

export default Root;
