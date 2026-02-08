export type UploadItemData = Record<string, unknown>;

export type UploadStatus = 'pending' | 'processing' | 'success' | 'failed';

export interface UploadItem<T extends UploadItemData> {
  id: string;
  batchId?: string;
  data: T;
  status: UploadStatus;
  error?: string;
  completedAt?: number;
}

export interface UploadBatch<T extends UploadItemData> {
  id: string;
  items: UploadItem<T>[];
  status: UploadStatus;
  error?: string;
  createdAt: number;
  completedAt?: number;
}
