import { createContext } from 'react';

import type { UploadBatch, UploadItem, UploadItemData } from './types';

export interface MediaUploaderContextType<T extends UploadItemData> {
  batches: UploadBatch<T>[];
  batchesItems: UploadItem<T>[];
  uploadBatch: (data: T[]) => void;
  cancelUpload: () => void;
}

const MediaUploaderContext = createContext<MediaUploaderContextType<any> | null>(null);

export default MediaUploaderContext;
