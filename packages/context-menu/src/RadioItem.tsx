import { useRootContext as usePopoverContext } from '@rn-foundation/popover';
import * as RadioGroup from '@rn-foundation/radio-group';
import { useCallback } from 'react';
import { type GestureResponderEvent } from 'react-native';

export interface RadioItemProps extends RadioGroup.ItemProps {
  closeOnPress?: boolean;
}

const RadioItem = ({ children, closeOnPress = true, onPress, ...props }: RadioItemProps) => {
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
    <RadioGroup.Item onPress={handlePress} {...props}>
      {children}
    </RadioGroup.Item>
  );
};

RadioItem.displayName = 'MenuRadioItem';

export default RadioItem;
