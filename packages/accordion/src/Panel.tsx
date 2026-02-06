import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { type ViewProps } from 'react-native';
import { View } from 'react-native';

import { useItemContext } from './Item/context';

export interface PanelProps extends PropsWithRender<ViewProps> {}

const Panel = ({ render, ...props }: PanelProps) => {
  const { expanded, triggerId } = useItemContext();

  const element = useRenderElement(View, render, {
    accessibilityElementsHidden: !expanded,
    accessibilityLabelledBy: triggerId,
    ...props,
  });

  return expanded ? element : null;
};

Panel.displayName = 'AccordionPanel';

export default Panel;
