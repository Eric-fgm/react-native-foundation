import { createContext, useContext } from 'react';

export interface ItemContextProps {
  selected: boolean;
}

const ItemContext = createContext<ItemContextProps | null>(null);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within a RadioGroup.Item');
  }
  return context;
};

export default ItemContext;
