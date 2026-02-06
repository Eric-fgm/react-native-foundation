import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { View, type ViewProps } from 'react-native';

import { useItemContext } from './Item/context';

export interface ItemIndicatorProps extends PropsWithRender<ViewProps> {}

const ItemIndicator = ({ render, ...props }: ItemIndicatorProps) => {
  const { selected } = useItemContext();

  const element = useRenderElement(View, render, props);

  return selected ? element : null;
};

ItemIndicator.displayName = 'RadioGroupItemIndicator';

export default ItemIndicator;
