import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type UploadBatch, type UploadItem, type UploadItemData, type UploadStatus } from './types';

interface MediaUploaderState<T extends UploadItemData> {
  _hasHydrated: boolean;
  status: 'processing' | 'paused';
  batches: UploadBatch<T>[];
}

interface MediaUploaderActions<T extends UploadItemData> {
  _setHasHydrated: (state: boolean) => void;
  getBatches: () => UploadBatch<T>[];
  getBatch: (id: string) => UploadBatch<T> | undefined;
  addBatch: (item: Omit<UploadBatch<T>, 'status' | 'createdAt'>) => void;
  updateBatch: (id: string, updates: Partial<UploadBatch<T>>) => void;
  updateBatchItem: (batchId: string, itemId: string, updates: Partial<UploadItem<T>>) => void;
  removeBatch: (id: string) => void;
  clear: (status: UploadStatus) => void;
  reset: () => void;
}

export type MediaUploaderStore<T extends UploadItemData> = MediaUploaderState<T> &
  MediaUploaderActions<T>;

export const createMediaUploaderStore = <T extends UploadItemData>(name: string) =>
  create<MediaUploaderStore<T>>()(
    persist(
      (set, get) => ({
        _hasHydrated: false,
        status: 'processing',
        batches: [],

        _setHasHydrated: (state) => set({ _hasHydrated: state }),

        getBatches: () => {
          return get().batches;
        },

        getBatch: (id) => {
          return get().batches.find((batch) => batch.id === id);
        },

        addBatch: (item) =>
          set((state) => ({
            batches: [
              ...state.batches,
              {
                ...item,
                status: 'pending',
                createdAt: Date.now(),
              },
            ],
          })),

        updateBatch: (id, updates) =>
          set((state) => ({
            batches: state.batches.map((batch) =>
              batch.id === id ? { ...batch, ...updates } : batch,
            ),
          })),

        updateBatchItem: (batchId, itemId, updates) =>
          set((state) => ({
            batches: state.batches.map((batch) =>
              batch.id === batchId
                ? {
                    ...batch,
                    items: batch.items.map((item) =>
                      item.id === itemId ? { ...item, ...updates } : item,
                    ),
                  }
                : batch,
            ),
          })),

        removeBatch: (id) =>
          set((state) => ({
            batches: state.batches.filter((batch) => batch.id !== id),
          })),

        clear: (status) =>
          set((state) => ({
            batches: state.batches.filter((batch) => batch.status !== status),
          })),

        reset: () => set({ status: 'processing', batches: [] }),
      }),
      {
        name,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          status: state.status,
          batches: state.batches,
        }),
        onRehydrateStorage: () => (state) => {
          state?._setHasHydrated(true);
        },
      },
    ),
  );
