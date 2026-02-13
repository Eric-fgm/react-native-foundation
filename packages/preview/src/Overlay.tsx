import * as Popover from '@rn-foundation/popover';

import RootContext, { useRootContext } from './Root/context';

export interface OverlayProps extends Popover.OverlayProps {}

const Overlay = ({ children, ...props }: OverlayProps) => {
  return (
    <Popover.Overlay {...props}>
      <RootContext.Provider value={useRootContext()}>{children}</RootContext.Provider>
    </Popover.Overlay>
  );
};

export default Overlay;
