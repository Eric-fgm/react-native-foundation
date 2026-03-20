import { useContext } from 'react';

import MediaUploaderContext, { type MediaUploaderContextType } from '../context';

const useMediaUploader = <TBatchData extends unknown, TBatchItemData extends unknown>() => {
  const context = useContext(MediaUploaderContext);
  if (!context) {
    throw new Error('useMediaUploader must be used within an MediaUploaderOrchestrator');
  }
  return context as MediaUploaderContextType<TBatchData, TBatchItemData>;
};

export default useMediaUploader;
