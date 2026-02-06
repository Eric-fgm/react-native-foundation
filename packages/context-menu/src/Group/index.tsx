import { type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import GroupContext, { type GroupContextProps } from './context';

export interface GroupProps extends PropsWithRender<ViewProps, GroupContextProps> {
  disabled?: boolean;
}

const Group = ({ disabled = false, render, ...props }: GroupProps) => {
  const contextValue = useMemo(() => ({ disabled }), [disabled]);
  return (
    <GroupContext.Provider value={contextValue}>
      {useRenderElement(
        View,
        render,
        {
          role: 'group',
          ...props,
        },
        contextValue,
      )}
    </GroupContext.Provider>
  );
};

Group.displayName = 'MenuGroup';

export default Group;
