import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useProviderContext } from './Provider/context';

export const useToastManager = () => {
  const { toasts, onAdd, onUpdate, onRemove } = useProviderContext();

  return useMemo(
    () => ({
      toasts,
      add: onAdd,
      update: onUpdate,
      remove: onRemove,
    }),
    [toasts, onAdd, onUpdate, onRemove],
  );
};

interface TimerInfo {
  reference: ReturnType<typeof setTimeout>;
  timeout: number;
  callback: () => void;
}

export const useTimers = () => {
  const timersRef = useRef<Map<string, TimerInfo>>(new Map());

  const removeTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer.reference);
      timersRef.current.delete(id);
    }
  }, []);

  const setTimer = useCallback(
    (id: string, timeout: number, callback: () => void) => {
      removeTimer(id);

      timersRef.current.set(id, {
        reference: setTimeout(callback, timeout),
        timeout,
        callback,
      });
    },
    [removeTimer],
  );

  const resetTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer.reference);
      timer.reference = setTimeout(timer.callback, timer.timeout);
    }
  }, []);

  const resetTimers = useCallback(() => {
    timersRef.current.forEach((timer) => {
      clearTimeout(timer.reference);
      timer.reference = setTimeout(timer.callback, timer.timeout);
    });
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer.reference));
    };
  }, []);

  return { setTimer, resetTimers, resetTimer, removeTimer };
};
