import { createContext } from 'react';

import type { Batch, BatchItem } from './types';

export interface MediaUploaderContextType<
  TBatchData extends unknown = any,
  TBatchItemData extends unknown = any,
> {
  batches: Batch<TBatchData, TBatchItemData>[];
  batchesItems: BatchItem<TBatchItemData>[];
  uploadBatch: (data: TBatchItemData[], scope?: string) => void;
  cancelUpload: (scope?: string) => void;
  pauseUpload: (scope?: string) => void;
  resumeUpload: (scope?: string) => void;
}

const MediaUploaderContext = createContext<MediaUploaderContextType | null>(null);

export default MediaUploaderContext;
