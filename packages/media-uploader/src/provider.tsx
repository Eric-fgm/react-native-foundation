import { nanoid } from 'nanoid/non-secure';
import { useCallback, useMemo, useRef } from 'react';

import MediaUploaderContext from './context';
import { createMediaUploaderStore } from './create-store';
import { useMediaUploaderQueue } from './hooks';
import type { UploadBatch, UploadItem, UploadItemData } from './types';

export type MediaUploaderOrchestratorProps<T extends UploadItemData> = React.PropsWithChildren<{
  storeName?: string;
  uploadBatchFn?: (batch: UploadBatch<T>, signal: AbortController) => Promise<void>;
  uploadBatchItemFn?: (
    item: UploadItem<T>,
    batch: UploadBatch<T>,
    signal: AbortController,
  ) => Promise<void>;
  addBatchFn?: (batch: UploadBatch<T>, signal: AbortController) => Promise<void>;
  onBatchCompleted?: (batch: UploadBatch<T>) => void;
  onComplete?: (batches: UploadBatch<T>[]) => void;
}>;

const MediaUploaderOrchestrator = <T extends UploadItemData>({
  children,
  storeName = 'media-uploader',
  uploadBatchFn,
  uploadBatchItemFn,
  addBatchFn,
  onBatchCompleted,
  onComplete,
}: MediaUploaderOrchestratorProps<T>) => {
  const store = useRef(createMediaUploaderStore<T>(storeName)).current();
  const abortControllerList = useRef<AbortController[]>([]);
  const { batches, addBatch, reset } = store;

  const registerSignal = () => {
    const controller = new AbortController();
    abortControllerList.current.push(controller);
    return controller;
  };

  const abortAllSignals = useCallback(() => {
    abortControllerList.current.forEach((controller) => controller.abort());
    abortControllerList.current = [];
  }, []);

  useMediaUploaderQueue({
    store,
    uploadBatchFn,
    uploadBatchItemFn,
    addBatchFn,
    onBatchCompleted,
    onComplete,
    registerSignal,
    abortAllSignals,
  });

  const batchesItems = useMemo(() => {
    return batches.flatMap((batch) => batch.items);
  }, [batches]);

  const uploadBatch = useCallback(
    (items: T[]) => {
      addBatch({
        id: nanoid(),
        items: items.map((item) => ({
          id: nanoid(),
          data: item,
          status: 'pending',
        })),
      });
    },
    [addBatch],
  );

  const cancelUpload = useCallback(() => {
    abortAllSignals();
    reset();
  }, [abortAllSignals, reset]);

  return (
    <MediaUploaderContext.Provider
      value={useMemo(
        () => ({ batches, batchesItems, uploadBatch, cancelUpload }),
        [batches, batchesItems, uploadBatch, cancelUpload],
      )}>
      {children}
    </MediaUploaderContext.Provider>
  );
};

export default MediaUploaderOrchestrator;
