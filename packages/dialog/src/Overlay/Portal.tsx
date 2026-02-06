import { Portal as RNPortal } from '@rn-foundation/portal';

import RootContext, { useRootContext } from '../Root/context';

interface PortalProps extends React.PropsWithChildren {}

const Portal = ({ children }: PortalProps) => {
  return (
    <RNPortal>
      <RootContext.Provider value={useRootContext()}>{children}</RootContext.Provider>
    </RNPortal>
  );
};

export default Portal;
