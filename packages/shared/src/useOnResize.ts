import { useWindowDimensions } from 'react-native';

import useStableCallback from './useStableCallback';
import useUpdateEffect from './useUpdateEffect';

const useOnResize = (callback?: () => void) => {
  const dimensions = useWindowDimensions();
  const stableCallback = useStableCallback(callback);

  useUpdateEffect(() => {
    stableCallback();
  }, [dimensions, stableCallback]);
};

export default useOnResize;
