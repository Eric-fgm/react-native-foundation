import { useStableCallback } from '@rn-foundation/shared';
import { useEffect, useMemo, useState } from 'react';

import { useTimers } from '../hooks';
import {
  createManager,
  type Manager,
  type ManagerObject,
  type ManagerPartialObject,
} from '../manager';
import ProviderContext from './context';

export interface ProviderProps extends React.PropsWithChildren {
  manager?: Manager;
  position?: ManagerObject['position'];
  timeout?: ManagerObject['timeout'];
}

const DEFAULT_MANAGER = createManager();

const Provider = ({
  children,
  manager = DEFAULT_MANAGER,
  position = 'top-center',
  timeout = 5000,
}: ProviderProps) => {
  const [toasts, setToasts] = useState<ManagerObject[]>([]);
  const { setTimer, removeTimer, resetTimer } = useTimers();

  const handleAdd = useStableCallback((toast: ManagerPartialObject) => {
    const toastId = toast.id ?? manager.generateId();
    const toastPosition = toast.position ?? position;
    const toastTimeout = toast.timeout ?? timeout;

    setToasts((previousToasts) => [
      ...previousToasts,
      {
        ...toast,
        id: toastId,
        position: toastPosition,
        timeout: toastTimeout,
      },
    ]);

    setTimer(toastId, toastTimeout, () => handleRemove(toastId));
  });

  const handleUpdate = useStableCallback((id: string, updates: ManagerPartialObject) => {
    resetTimer(id);

    setToasts((previousToasts) =>
      previousToasts.map((toast) => {
        if (toast.id === id) {
          return {
            ...toast,
            ...updates,
          };
        }
        return toast;
      }),
    );
  });

  const handleRemove = useStableCallback((id: string) => {
    removeTimer(id);
    toasts.find((toast) => toast.id === id)?.onRemove?.();

    setToasts((previousToasts) => {
      return previousToasts.filter((toast) => toast.id !== id);
    });
  });

  useEffect(() => {
    const unsubscribe = manager.subscribe((event) => {
      switch (event.action) {
        case 'add':
          handleAdd(event.options);
          break;
        case 'update':
          handleUpdate(event.options.id, event.options);
          break;
        case 'remove':
          handleRemove(event.options.id);
          break;
      }
    });
    return () => unsubscribe();
  }, [manager, handleAdd, handleUpdate, handleRemove]);

  return (
    <ProviderContext.Provider
      value={useMemo(
        () => ({
          toasts,
          onAdd: handleAdd,
          onUpdate: handleUpdate,
          onRemove: handleRemove,
        }),
        [toasts, handleAdd, handleUpdate, handleRemove],
      )}>
      {children}
    </ProviderContext.Provider>
  );
};

Provider.displatName = 'ToastProvider';

export default Provider;
