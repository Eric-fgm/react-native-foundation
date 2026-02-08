import { useContext } from 'react';

import MediaUploaderContext, { type MediaUploaderContextType } from '../context';
import type { UploadItemData } from '../types';

const useMediaUploader = <T extends UploadItemData>() => {
  const context = useContext(MediaUploaderContext);
  if (!context) {
    throw new Error('useMediaUploader must be used within an MediaUploaderOrchestrator');
  }
  return context as MediaUploaderContextType<T>;
};

export default useMediaUploader;
