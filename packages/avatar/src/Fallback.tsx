import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface FallbackProps extends PropsWithRender<ViewProps> {}

const Fallback = ({ render, ...props }: FallbackProps) => {
  const { alt, status } = useRootContext();

  const element = useRenderElement(View, render, {
    accessibilityRole: 'image',
    accessibilityLabel: alt,
    ...props,
  });

  if (status !== 'error') {
    return null;
  }

  return element;
};

Fallback.displayName = 'AvatarFallback';

export default Fallback;
