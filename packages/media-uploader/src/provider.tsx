import { nanoid } from 'nanoid/non-secure';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import BatchProcessor from './batch/batch-processor';
import MediaUploaderContext from './context';
import type { Batch, BatchItem, BatchStore } from './types';

export type MediaUploaderOrchestratorProps<
  TBatchData extends unknown,
  TBatchItemData extends unknown,
> = React.PropsWithChildren<{
  store: BatchStore<TBatchData, TBatchItemData>;
  uploadBatchFn?: (batch: Batch<TBatchData, TBatchItemData>) => Promise<unknown>;
  uploadBatchItemFn?: (
    item: BatchItem<TBatchItemData>,
    index: number,
    batch: Batch<TBatchData, TBatchItemData>,
  ) => Promise<unknown>;
  addBatchFn?: (batch: Batch<TBatchData, TBatchItemData>) => Promise<unknown>;
  onBatchComplete?: (batch: Batch<TBatchData, TBatchItemData>) => void;
  onComplete?: (batches: Batch<TBatchData, TBatchItemData>[]) => void;
}>;

const MediaUploaderOrchestrator = <TBatchData extends unknown, TBatchItemData extends unknown>({
  children,
  store,
  uploadBatchFn,
  uploadBatchItemFn,
  addBatchFn,
  onBatchComplete,
  onComplete,
}: MediaUploaderOrchestratorProps<TBatchData, TBatchItemData>) => {
  const batchProcessor = useRef<BatchProcessor<TBatchData, TBatchItemData>>(null);

  useEffect(() => {
    if (!store.hasHydrated) return;
    const processor = new BatchProcessor({
      store,
      onBatchStart: uploadBatchFn,
      onItemProcess: uploadBatchItemFn,
      onBatchEnd: addBatchFn,
      onBatchComplete: onBatchComplete,
      onComplete: onComplete,
    });
    batchProcessor.current = processor;

    return () => processor.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.hasHydrated]);

  const batchesItems = useMemo(() => {
    return store.batches.flatMap((batch) => batch.items);
  }, [store.batches]);

  const uploadBatch = useCallback(
    (items: TBatchItemData[], scope?: string) => {
      batchProcessor.current?.add({
        id: nanoid(),
        scope,
        status: 'pending',
        isPaused: false,
        items: items.map((item) => ({
          id: nanoid(),
          status: 'pending',
          data: item,
        })),
      });
    },
    [batchProcessor],
  );

  const cancelUpload = useCallback(
    (scope?: string) => {
      batchProcessor.current?.cancel(scope);
    },
    [batchProcessor],
  );

  const pauseUpload = useCallback(
    (scope?: string) => {
      batchProcessor.current?.pause(scope);
    },
    [batchProcessor],
  );

  const resumeUpload = useCallback(
    (scope?: string) => {
      batchProcessor.current?.resume(scope);
    },
    [batchProcessor],
  );

  return (
    <MediaUploaderContext.Provider
      value={useMemo(
        () => ({
          batches: store.batches,
          batchesItems,
          uploadBatch,
          cancelUpload,
          pauseUpload,
          resumeUpload,
        }),
        [store.batches, batchesItems, uploadBatch, cancelUpload, pauseUpload, resumeUpload],
      )}>
      {children}
    </MediaUploaderContext.Provider>
  );
};

export default MediaUploaderOrchestrator;
