import {
  type Align,
  type CollisionBehavior,
  type ElementMeasurement,
  type Insets,
  type PropsWithRender,
  type Side,
  useAnchoredPosition,
  useOnBackPress,
  useOnResize,
  useRenderElement,
} from '@rn-foundation/shared';
import { useCallback, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View, type ViewProps } from 'react-native';

import { useRootContext } from './Root/context';

export interface PopupProps extends PropsWithRender<ViewProps> {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  collisionBehavior?: CollisionBehavior;
  collisionOffset?: number;
  insets?: Insets;
}

const Popup = ({
  style,
  side = 'top',
  sideOffset = 0,
  align = 'center',
  alignOffset = 0,
  collisionBehavior = 'shift',
  collisionOffset = 0,
  insets,
  onLayout,
  render,
  ...props
}: PopupProps) => {
  const { anchorMeasurement, onClose } = useRootContext();
  const [popupMeasurement, setPopupMeasurement] = useState<ElementMeasurement | null>(null);

  useOnBackPress(onClose);
  useOnResize(onClose);

  const popupStyles = useAnchoredPosition({
    anchorMeasurement,
    popupMeasurement,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBehavior,
    collisionOffset,
    insets,
  });

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event);
      setPopupMeasurement(event.nativeEvent.layout);
    },
    [onLayout],
  );

  return useRenderElement(View, render, {
    accessibilityViewIsModal: true,
    style: [styles.container, popupStyles, style],
    onLayout: handleLayoutChange,
    ...props,
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

Popup.displayName = 'PopoverPopup';

export default Popup;
