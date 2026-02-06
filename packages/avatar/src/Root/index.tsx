import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useMemo, useState } from 'react';
import { View, type ViewProps } from 'react-native';

import RootContext, { type RootContextProps } from './context';

export interface RootProps
  extends PropsWithRender<ViewProps, RootContextProps>, Pick<RootContextProps, 'src' | 'alt'> {}

const Root = ({ src, alt, render, ...props }: RootProps) => {
  const [status, setStatus] = useState<RootContextProps['status']>('error');

  const contextValue = useMemo(() => ({ src, alt, status, setStatus }), [src, alt, status]);

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(View, render, props, contextValue)}
    </RootContext.Provider>
  );
};

Root.displayName = 'AvatarRoot';

export default Root;
