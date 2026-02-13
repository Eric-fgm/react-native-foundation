import * as Popover from '@rn-foundation/popover';
import type { Insets } from '@rn-foundation/shared';
import { useMemo } from 'react';

import RootContext from './context';

export interface RootProps extends Popover.RootProps {
  insets?: Insets;
}

const Root = ({ insets = {}, ...props }: RootProps) => {
  return (
    <RootContext.Provider
      value={useMemo(
        () => ({
          insets,
        }),
        [insets],
      )}>
      <Popover.Root {...props} />
    </RootContext.Provider>
  );
};

Root.displayName = 'PreviewRoot';

export default Root;
