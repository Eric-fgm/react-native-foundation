import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { BatchStore } from '../types';

export const createBatchStore = <TBatchData extends unknown, TBatchItemData extends unknown>(
  name: string,
) =>
  create<BatchStore<TBatchData, TBatchItemData>>()(
    persist(
      (set, get) => ({
        hasHydrated: false,

        setHasHydrated: (hasHydrated) => set({ hasHydrated }),

        batches: [],

        set: (batches) => set({ batches }),

        get: () => get().batches,

        add: (item) =>
          set((state) => ({
            batches: [...state.batches, { ...item }],
          })),

        update: (id, updates) =>
          set((state) => ({
            batches: state.batches.map((batch) =>
              batch.id === id ? { ...batch, ...updates } : batch,
            ),
          })),

        updateItem: (batchId, itemId, updates) =>
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

        remove: (id) =>
          set((state) => ({
            batches: state.batches.filter((batch) => batch.id !== id),
          })),

        reset: () => set({ batches: [] }),
      }),
      {
        name,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          batches: state.batches,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (!error && state?.setHasHydrated) {
            state.setHasHydrated(true);
          }
        },
      },
    ),
  );
