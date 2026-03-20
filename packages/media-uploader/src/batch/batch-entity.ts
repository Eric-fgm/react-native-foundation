import { type Batch, type BatchItem, type BatchStore } from '../types';

/**
 * Represents a batch extended with additional properties.
 * Also, it takes care of saving and loading the batch from the store, so that
 * the batch can be resumed after the app is closed.
 */
class BatchEntity<TBatchData extends unknown, TBatchItemData extends unknown> {
  private store: BatchStore<TBatchData, TBatchItemData>;
  // Batch properties
  private id: string;
  private status: Batch<TBatchData, TBatchItemData>['status'];
  private isPaused: boolean;
  private items: BatchItem<TBatchItemData>[];
  private scope?: string;
  private data?: TBatchData;
  // Processing properties
  /**
   * Used to prevent multiple processing of the same batch
   */
  private isRunning = false;

  constructor(
    store: BatchStore<TBatchData, TBatchItemData>,
    batch: Batch<TBatchData, TBatchItemData>,
  ) {
    this.store = store;
    this.id = batch.id;
    this.status = batch.status;
    this.items = batch.items;
    this.scope = batch.scope;
    this.data = batch.data;
    this.isPaused = batch.isPaused || false;
  }

  get() {
    return {
      id: this.id,
      status: this.status,
      isPaused: this.isPaused,
      items: this.items,
      scope: this.scope,
      data: this.data,
    };
  }

  save() {
    this.store.add({
      id: this.id,
      status: this.status,
      isPaused: this.isPaused,
      items: this.items,
      scope: this.scope,
      data: this.data,
    });
  }

  remove() {
    this.store.remove(this.id);
  }

  exist() {
    return this.store.get().find((b) => b.id === this.id) !== undefined;
  }

  getScope() {
    return this.scope;
  }

  getIsRunning() {
    return this.isRunning;
  }

  setIsRunning(isRunning: boolean) {
    this.isRunning = isRunning;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: Batch<TBatchData, TBatchItemData>['status']) {
    this.status = status;
    this.store.update(this.id, { status });
  }

  getItems() {
    return this.items;
  }

  setItemStatus(item: BatchItem<TBatchItemData>, status: BatchItem<TBatchItemData>['status']) {
    item.status = status;
    this.store.updateItem(this.id, item.id, { status });
  }

  getIsPaused() {
    return this.isPaused;
  }

  setIsPaused(isPaused: boolean) {
    this.isPaused = isPaused;
    this.store.update(this.id, { isPaused });
  }
}

export default BatchEntity;
