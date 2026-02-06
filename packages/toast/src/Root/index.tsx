import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import { type ManagerObject } from '../manager';
import { useProviderContext } from '../Provider/context';
import RootContext, { type RootContextProps } from './context';

export interface RootProps
  extends PropsWithRender<Omit<ViewProps, 'id'>, RootContextProps>, ManagerObject {}

const Root = ({ id, position, timeout, onAction, onRemove: _, render, ...props }: RootProps) => {
  const { onRemove } = useProviderContext();

  const handleAction = useCallback(() => onAction?.(), [onAction]);

  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);

  const contextValue = useMemo(
    () => ({ id, position, timeout, onAction: handleAction, onRemove: handleRemove }),
    [id, position, timeout, handleAction, handleRemove],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {useRenderElement(View, render, props, contextValue)}
    </RootContext.Provider>
  );
};

Root.displayName = 'ToastRoot';

export default Root;
