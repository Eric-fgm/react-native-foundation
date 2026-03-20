import type { Batch, BatchItem, BatchStore } from '../types';
import BatchEntity from './batch-entity';

export interface BatchProcessorOptions<TBatchData extends unknown, TBatchItemData extends unknown> {
  store: BatchStore<TBatchData, TBatchItemData>;
  onBatchStart?: (batch: Batch<TBatchData, TBatchItemData>) => Promise<unknown>;
  onItemProcess?: (
    item: BatchItem<TBatchItemData>,
    index: number,
    batch: Batch<TBatchData, TBatchItemData>,
  ) => Promise<unknown>;
  onBatchEnd?: (batch: Batch<TBatchData, TBatchItemData>) => Promise<unknown>;
  onBatchComplete?: (batch: Batch<TBatchData, TBatchItemData>) => void;
  onComplete?: (batches: Batch<TBatchData, TBatchItemData>[]) => void;
}

class BatchProcessor<TBatchData extends unknown, TBatchItemData extends unknown> {
  private store: BatchStore<TBatchData, TBatchItemData>;
  private batchEntities: BatchEntity<TBatchData, TBatchItemData>[] = [];
  private onBatchStart: BatchProcessorOptions<TBatchData, TBatchItemData>['onBatchStart'];
  private onItemProcess: BatchProcessorOptions<TBatchData, TBatchItemData>['onItemProcess'];
  private onBatchEnd: BatchProcessorOptions<TBatchData, TBatchItemData>['onBatchEnd'];
  private onBatchComplete: BatchProcessorOptions<TBatchData, TBatchItemData>['onBatchComplete'];
  private onComplete: BatchProcessorOptions<TBatchData, TBatchItemData>['onComplete'];

  constructor({
    store,
    onBatchStart,
    onItemProcess,
    onBatchEnd,
    onBatchComplete,
    onComplete,
  }: BatchProcessorOptions<TBatchData, TBatchItemData>) {
    this.store = store;
    this.onBatchStart = onBatchStart;
    this.onItemProcess = onItemProcess;
    this.onBatchEnd = onBatchEnd;
    this.onBatchComplete = onBatchComplete;
    this.onComplete = onComplete;

    this.store
      .get()
      .forEach((batch) => this.batchEntities.push(new BatchEntity(this.store, batch)));
    // Process all batches after initialization (resume mechanism after app is brought back to foreground)
    this.processAll();
  }

  public add(batch: Batch<TBatchData, TBatchItemData>) {
    const batchEntity = new BatchEntity(this.store, batch);
    batchEntity.save();
    this.batchEntities.push(batchEntity);
    this.process(batch.scope);
  }

  public pause(scope?: string) {
    this.batchEntities
      .filter((b) => scope === undefined || b.getScope() === scope)
      .forEach((b) => b.setIsPaused(true));
  }

  public resume(scope?: string) {
    this.batchEntities
      .filter((b) => scope === undefined || b.getScope() === scope)
      .forEach((b) => b.setIsPaused(false));

    scope ? this.process(scope) : this.processAll();
  }

  public cancel(scope?: string) {
    this.batchEntities
      .filter((b) => scope === undefined || b.getScope() === scope)
      .forEach((b) => b.remove());

    this.batchEntities = this.batchEntities.filter(
      (b) => scope !== undefined && b.getScope() !== scope,
    );
  }

  private async process(scope?: string) {
    const batchEntitiesInScopeToProcess = this.batchEntities.filter(
      (b) =>
        b.getScope() === scope &&
        !b.getIsPaused() &&
        ['pending', 'processing', 'processing-items'].includes(b.getStatus()),
    );

    if (scope === undefined) {
      // we process all batches without scope in parallel
      batchEntitiesInScopeToProcess
        .filter((b) => !b.getIsRunning())
        .forEach((b) => this.processBatch(b));
    } else {
      if (
        !batchEntitiesInScopeToProcess.length ||
        batchEntitiesInScopeToProcess.some((b) => b.getIsRunning())
      )
        return;

      this.processBatch(batchEntitiesInScopeToProcess[0]);
    }
  }

  private processAll() {
    const uniqueScopes = [...new Set(this.batchEntities.map((batch) => batch.getScope()))];
    uniqueScopes.forEach((scope) => this.process(scope));
  }

  private async processBatch(batchEntity: BatchEntity<TBatchData, TBatchItemData>) {
    const batchProcessPipeline = [
      {
        allowedStatuses: ['pending', 'processing'],
        handler: this.handleBatchStart.bind(this),
      },
      { allowedStatuses: ['processing-items'], handler: this.handleBatchItems.bind(this) },
      { handler: this.handleBatchEnd.bind(this) },
    ];

    try {
      // Prevent multiple processing of the same batch
      batchEntity.setIsRunning(true);

      for (const { allowedStatuses, handler } of batchProcessPipeline) {
        // Skip if the batch is not in the allowed statuses, so that we don't process it again after resume.
        if (allowedStatuses && !allowedStatuses.includes(batchEntity.getStatus())) continue;

        await handler?.(batchEntity);
        // It handles cases when batch was paused or removed during async action, and we come back here after await.
        if (batchEntity.getIsPaused() || !batchEntity.exist()) return;
      }
      batchEntity.setStatus('completed');
    } catch {
      // It handles cases when batch was paused or removed during async action, and exception was thrown.
      if (batchEntity.getIsPaused() || !batchEntity.exist()) return;
      batchEntity.setStatus('error');
    } finally {
      batchEntity.setIsRunning(false);
    }
    this.onBatchComplete?.(batchEntity.get());
    if (batchEntity.getScope() !== undefined) this.process(batchEntity.getScope());
    this.handleComplete(batchEntity.getScope());
  }

  private async handleBatchStart(batchEntity: BatchEntity<TBatchData, TBatchItemData>) {
    batchEntity.setStatus('processing');
    await this.onBatchStart?.(batchEntity.get());
    batchEntity.setStatus('processing-items');
  }

  private async handleBatchItems(batchEntity: BatchEntity<TBatchData, TBatchItemData>) {
    const itemsToProcess = batchEntity
      .getItems()
      .filter((item) => ['pending', 'processing'].includes(item.status));
    for (const [index, item] of itemsToProcess.entries()) {
      try {
        batchEntity.setItemStatus(item, 'processing');

        await this.onItemProcess?.(item, index, batchEntity.get());
        // It handles cases when batch was paused or removed during async action, and we come back here after await.
        if (batchEntity.getIsPaused() || !batchEntity.exist()) return;

        batchEntity.setItemStatus(item, 'completed');
      } catch {
        // It handles cases when batch was paused or removed during async action, and exception was thrown.
        if (batchEntity.getIsPaused() || !batchEntity.exist()) return;
        batchEntity.setItemStatus(item, 'error');
      }
    }
  }

  private async handleBatchEnd(batchEntity: BatchEntity<TBatchData, TBatchItemData>) {
    await this.onBatchEnd?.(batchEntity.get());
  }

  private handleComplete(scope?: string) {
    if (!this.onComplete) return;

    const batchEntitiesInScope = this.batchEntities.filter((b) => b.getScope() === scope);
    if (batchEntitiesInScope.every((b) => ['error', 'completed'].includes(b.getStatus()))) {
      this.onComplete(batchEntitiesInScope.map((b) => b.get()));
    }
  }
}

export default BatchProcessor;
