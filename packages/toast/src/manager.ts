export interface ManagerObject {
  id: string;
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  timeout: number;
  onAction?: () => void;
  onRemove?: () => void;
}

export interface ManagerPartialObject extends Partial<ManagerObject> {}

export interface ManagerPartialWithIdObject extends Omit<ManagerPartialObject, 'id'> {
  id: string;
}

export type ManagerEvent =
  | { action: 'add'; options: ManagerPartialWithIdObject }
  | { action: 'remove'; options: { id: string } }
  | { action: 'update'; options: ManagerPartialWithIdObject };

export interface Manager {
  generateId: () => string;
  subscribe: (listener: (data: ManagerEvent) => void) => () => void;
  add: (options: ManagerPartialObject) => string;
  remove: (id: string) => void;
  update: (id: string, updates: ManagerPartialObject) => void;
}

export function createManager(): Manager {
  let counter = 0;
  const listeners: ((data: ManagerEvent) => void)[] = [];

  function emit(data: ManagerEvent) {
    listeners.forEach((listener) => listener(data));
  }

  return {
    generateId() {
      return `toast-${counter++}`;
    },

    subscribe(listener: (data: ManagerEvent) => void) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    },

    add(options: ManagerPartialObject): string {
      const id = options.id || this.generateId();

      emit({
        action: 'add',
        options: {
          ...options,
          id,
        },
      });

      return id;
    },

    remove(id: string): void {
      emit({
        action: 'remove',
        options: { id },
      });
    },

    update(id: string, updates: ManagerPartialObject): void {
      emit({
        action: 'update',
        options: {
          ...updates,
          id,
        },
      });
    },
  };
}
