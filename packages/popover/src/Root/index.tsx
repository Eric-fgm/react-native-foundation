import { type ElementMeasurement, useControllableState } from '@rn-foundation/shared';
import { useCallback, useMemo, useState } from 'react';

import RootContext, { type RootContextProps } from './context';

export interface RootProps {
  children: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenedChange?: (opened: boolean) => void;
}

const Root = ({ children, opened, defaultOpened, onOpenedChange }: RootProps) => {
  const [openedState = false, setOpenedState] = useControllableState({
    state: opened,
    defaultState: defaultOpened,
  });
  const [anchorMeasurement, setAnchorMeasurement] = useState<ElementMeasurement | null>(null);

  const handleOpen = useCallback(
    (anchorMeasurement: ElementMeasurement) => {
      setAnchorMeasurement(anchorMeasurement);
      setOpenedState(true);
      onOpenedChange?.(true);
    },
    [setOpenedState, onOpenedChange],
  );

  const handleClose = useCallback(() => {
    setAnchorMeasurement(null);
    setOpenedState(false);
    onOpenedChange?.(false);
  }, [setOpenedState, onOpenedChange]);

  const contextValue = useMemo(
    () => ({
      anchorMeasurement,
      opened: openedState,
      onOpen: handleOpen,
      onClose: handleClose,
    }),
    [anchorMeasurement, openedState, handleOpen, handleClose],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RootContext.Provider>
  );
};

Root.displayName = 'PopoverRoot';

export default Root;
