import * as Checkbox from '@rn-foundation/checkbox';
import { useRootContext as usePopoverContext } from '@rn-foundation/popover';
import { useCallback } from 'react';
import { type GestureResponderEvent } from 'react-native';

export interface CheckboxItemProps<T> extends Checkbox.RootProps<T> {
  closeOnPress?: boolean;
}

const CheckboxItem = <T,>({
  children,
  closeOnPress = true,
  onPress,
  ...props
}: CheckboxItemProps<T>) => {
  const { onClose } = usePopoverContext();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (closeOnPress) {
        onClose();
      }
    },
    [closeOnPress, onPress, onClose],
  );

  return (
    <Checkbox.Root onPress={handlePress} {...props}>
      {children}
    </Checkbox.Root>
  );
};

CheckboxItem.displayName = 'MenuCheckboxItem';

export default CheckboxItem;
