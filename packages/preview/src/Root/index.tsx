import * as Popover from '@rn-foundation/popover';
import { useMemo } from 'react';
import type { View } from 'react-native';
import { useAnimatedRef } from 'react-native-reanimated';

import RootContext from './context';

export interface RootProps extends Popover.RootProps {}

const Root = (props: RootProps) => {
  const triggerRef = useAnimatedRef<View>();

  return (
    <RootContext.Provider
      value={useMemo(
        () => ({
          triggerRef,
        }),
        [triggerRef],
      )}>
      <Popover.Root {...props} />
    </RootContext.Provider>
  );
};

Root.displayName = 'PreviewRoot';

export default Root;
