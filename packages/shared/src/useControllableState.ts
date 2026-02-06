import { useCallback, useRef, useState } from 'react';

interface UseControllableState<T> {
  state?: T;
  defaultState?: T;
}

const useControllableState = <T>({ state, defaultState }: UseControllableState<T>) => {
  const isControlledRef = useRef(state !== undefined);
  const [valueState, setValue] = useState(defaultState);

  const setValueIfUncontrolled = useCallback(
    (newValue: React.SetStateAction<T>) => {
      if (!isControlledRef.current) {
        setValue(newValue as T);
      }
    },
    [setValue],
  );

  return [isControlledRef.current ? state : (valueState as T), setValueIfUncontrolled] as const;
};

export default useControllableState;
