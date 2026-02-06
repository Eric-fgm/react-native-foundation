import { createContext, useContext } from 'react';

export interface ItemContextProps {
  value: unknown;
  disabled: boolean;
  expanded: boolean;
  onItemToggle: () => void;
  triggerId?: string;
}

const ItemContext = createContext<ItemContextProps | null>(null);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within a Accordion.Item');
  }
  return context;
};

export default ItemContext;
