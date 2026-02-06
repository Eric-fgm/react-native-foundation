import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useOnBackPress } from '@rn-foundation/shared';
import { View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface ContentProps extends PropsWithRender<ViewProps> {
  insets?: Partial<{ top: number; left: number; bottom: number; right: number }>;
}

const Content = ({ style, insets, render, ...props }: ContentProps) => {
  const { onClose } = useRootContext();

  useOnBackPress(onClose);

  return useRenderElement(View, render, {
    accessibilityViewIsModal: true,
    style: [{ marginTop: insets?.top, marginBottom: insets?.bottom }, style],
    ...props,
  });
};

Content.displayName = 'DialogContent';

export default Content;
