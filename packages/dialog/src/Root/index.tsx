import { useControllableState } from '@rn-foundation/shared';
import { useCallback, useMemo } from 'react';

import RootContext, { type RootContextProps } from './context';

export interface RootProps {
  children?: React.ReactNode | ((state: RootContextProps) => React.ReactNode);
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenChange?: (opened: boolean) => void;
}

const Root = ({ children, opened, defaultOpened, onOpenChange }: RootProps) => {
  const [openedState = false, setOpenedState] = useControllableState({
    state: opened,
    defaultState: defaultOpened,
  });

  const handleOpen = useCallback(() => {
    setOpenedState(true);
    onOpenChange?.(true);
  }, [setOpenedState, onOpenChange]);

  const handleClose = useCallback(() => {
    setOpenedState(false);
    onOpenChange?.(false);
  }, [setOpenedState, onOpenChange]);

  const handleToggle = useCallback(() => {
    if (openedState) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [openedState, handleOpen, handleClose]);

  const contextValue = useMemo(
    () => ({
      opened: openedState,
      onOpen: handleOpen,
      onClose: handleClose,
      onToggle: handleToggle,
    }),
    [openedState, handleOpen, handleClose, handleToggle],
  );

  return (
    <RootContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </RootContext.Provider>
  );
};

Root.displayName = 'DialogRoot';

export default Root;
