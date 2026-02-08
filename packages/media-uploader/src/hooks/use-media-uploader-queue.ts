import { useCallback, useEffect, useMemo } from 'react';

import type { MediaUploaderStore } from '../create-store';
import type { MediaUploaderOrchestratorProps } from '../provider';
import type { UploadBatch, UploadItem, UploadItemData } from '../types';

export interface UseMediaUploaderQueueParams<T extends UploadItemData> extends Pick<
  MediaUploaderOrchestratorProps<T>,
  'uploadBatchFn' | 'uploadBatchItemFn' | 'addBatchFn' | 'onBatchCompleted' | 'onComplete'
> {
  store: MediaUploaderStore<T>;
  registerSignal: () => AbortController;
  abortAllSignals: () => void;
}

const useMediaUploaderQueue = <T extends UploadItemData>({
  store: {
    _hasHydrated,
    status,
    batches,
    getBatches,
    getBatch,
    updateBatch,
    updateBatchItem,
    reset,
  },
  uploadBatchFn,
  uploadBatchItemFn,
  addBatchFn,
  onBatchCompleted,
  onComplete,
  registerSignal,
  abortAllSignals,
}: UseMediaUploaderQueueParams<T>) => {
  const pendingBatches = useMemo(() => {
    return batches.filter((batch) => batch.status === 'pending');
  }, [batches]);

  const processingBatches = useMemo(() => {
    return batches.filter((batch) => batch.status === 'processing');
  }, [batches]);

  const processBatchItem = useCallback(
    async (item: UploadItem<T>, batch: UploadBatch<T>) => {
      try {
        await uploadBatchItemFn?.(item, batch, registerSignal());
        updateBatchItem(batch.id, item.id, { status: 'success' });
      } catch (error) {
        updateBatchItem(batch.id, item.id, {
          status: 'failed',
          error: (error as Error).message,
        });
      }
    },
    [updateBatchItem, uploadBatchItemFn, registerSignal],
  );

  const processBatch = useCallback(
    async (batch: UploadBatch<T>) => {
      try {
        updateBatch(batch.id, { status: 'processing' });

        const hasPendingItems = batch.items.some((item) => item.status === 'pending');
        // we need this condition to skip fetching after resume is triggered
        if (hasPendingItems) {
          await uploadBatchFn?.(batch, registerSignal());
          // we update items status to processing immediately
          // to avoid calling `uploadBatchFn` again after resume
          updateBatch(batch.id, {
            items: batch.items.map((item) => ({ ...item, status: 'processing' })),
          });
        }

        await Promise.all(
          // we include items with `processing` status
          // to process them after resume is triggered
          batch.items
            .filter((item) => ['pending', 'processing'].includes(item.status))
            .map((item) => processBatchItem(item, batch)),
        );
        await addBatchFn?.(batch, registerSignal());

        updateBatch(batch.id, { status: 'success' });
      } catch (error) {
        updateBatch(batch.id, { status: 'failed', error: (error as Error).message });
      } finally {
        if (onBatchCompleted) {
          const latestBatchData = getBatch(batch.id);
          latestBatchData && onBatchCompleted(latestBatchData);
        }

        const batches = getBatches();
        const areBatchesCompleted = batches.every((batch) =>
          ['success', 'failed'].includes(batch.status),
        );
        // we need to check length of batches to avoid
        // calling `onComplete` when there are no batches
        // for example after `cancelUpload` is called
        if (batches.length && areBatchesCompleted) {
          abortAllSignals();
          onComplete?.(batches);
        }
      }
    },
    [
      updateBatch,
      getBatches,
      getBatch,
      uploadBatchFn,
      addBatchFn,
      processBatchItem,
      onBatchCompleted,
      onComplete,
      registerSignal,
      abortAllSignals,
    ],
  );

  // it handles processing of batches that were
  // added manually using `uploadBatch` method
  useEffect(() => {
    pendingBatches.forEach(processBatch);
  }, [pendingBatches, processBatch]);

  // it is used to resume all requests (uploadBatchFn, uploadBatchItemFn, addBatchFn)
  // after app is restarted or status is changed from `paused` to `processing`
  useEffect(() => {
    if (!_hasHydrated) return;
    if (status === 'processing') {
      processingBatches.forEach(processBatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, status]);

  useEffect(() => {
    return () => {
      abortAllSignals();
      reset();
    };
  }, [abortAllSignals, reset]);
};

export default useMediaUploaderQueue;
