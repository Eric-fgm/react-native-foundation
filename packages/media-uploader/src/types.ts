export interface Batch<TData extends unknown = unknown, TBatchItemData extends unknown = unknown> {
  id: string;
  /**
   * Status is used to track the progress of the batch.
   * We can easily skip to the next stage (e.g. when app was killed and restored)
   */
  status: 'pending' | 'processing' | 'processing-items' | 'completed' | 'error';
  isPaused?: boolean;
  items: BatchItem<TBatchItemData>[];
  /**
   * Scope is used to group batches together.
   * If scope is provided, only one batch in that scope can be processed at a time.
   */
  scope?: string;
  data?: TData;
}

export interface BatchItem<TData extends unknown = unknown> {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  data?: TData;
}

export interface BatchStore<
  TBatchData extends unknown = unknown,
  TBatchItemData extends unknown = unknown,
> {
  /**
   * Flag to indicate if the store has been hydrated from storage.
   * This is used to prevent race conditions when rehydrating the store.
   */
  hasHydrated: boolean;
  setHasHydrated?: (state: boolean) => void;
  /**
   * Operations on batches.
   */
  batches: Batch<TBatchData, TBatchItemData>[];
  set: (batches: Batch<TBatchData, TBatchItemData>[]) => void;
  get: () => Batch<TBatchData, TBatchItemData>[];
  add: (batch: Batch<TBatchData, TBatchItemData>) => void;
  update: (id: string, updates: Partial<Batch<TBatchData, TBatchItemData>>) => void;
  updateItem: (
    batchId: string,
    itemId: string,
    updates: Partial<BatchItem<TBatchItemData>>,
  ) => void;
  remove: (id: string) => void;
  reset: () => void;
}
