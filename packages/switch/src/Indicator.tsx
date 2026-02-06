import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface IndicatorProps extends PropsWithRender<ViewProps> {}

const Indicator = ({ render, ...props }: IndicatorProps) => {
  const { checked } = useRootContext();

  const element = useRenderElement(View, render, props);

  return checked ? element : null;
};

Indicator.displayName = 'SwitchIndicator';

export default Indicator;
