import { useCallback, useId, useMemo } from 'react';

import { useRootContext } from '../Root/context';
import ItemContext, { type ItemContextProps } from './context';

export interface ItemProps {
  children: React.ReactNode | ((state: ItemContextProps) => React.ReactNode);
  value?: unknown;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Item = ({ children, disabled = false, value, onOpenChange }: ItemProps) => {
  const itemId = useId();
  const triggerId = useId();
  const { disabled: rootDisabled, value: rootValue, onToggleValue } = useRootContext();

  const itemValue = value ?? itemId;
  const itemDisabled = disabled || rootDisabled;
  const expanded = rootValue.includes(itemValue);

  const handleItemToggle = useCallback(() => {
    onOpenChange?.(!expanded);
    onToggleValue(itemValue);
  }, [expanded, itemValue, onOpenChange, onToggleValue]);

  const contextValue = useMemo(
    () => ({
      value: itemValue,
      disabled: itemDisabled,
      expanded,
      onItemToggle: handleItemToggle,
      triggerId,
    }),
    [itemValue, itemDisabled, expanded, handleItemToggle, triggerId],
  );

  return (
    <ItemContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </ItemContext.Provider>
  );
};

Item.displayName = 'AccordionItem';

export default Item;
