import { createContext, useContext } from 'react';

export interface ItemContextProps {
  selected: boolean;
}

const ItemContext = createContext<ItemContextProps | null>(null);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === null) {
    throw new Error('useItemContext must be used within a Select.Item');
  }
  return context;
};

export default ItemContext;
