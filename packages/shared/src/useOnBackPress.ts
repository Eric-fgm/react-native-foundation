import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import useStableCallback from './useStableCallback';

const useOnBackPress = (callback?: () => void) => {
  const stableCallback = useStableCallback(callback);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      stableCallback();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [stableCallback]);
};

export default useOnBackPress;
