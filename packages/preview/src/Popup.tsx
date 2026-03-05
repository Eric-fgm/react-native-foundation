import * as Popover from '@rn-foundation/popover';
import {
  type ElementMeasurement,
  type Insets,
  type PropsWithRender,
  useOnBackPress,
  useOnResize,
  useRenderElement,
} from '@rn-foundation/shared';
import { StyleSheet, type View, type ViewProps } from 'react-native';
import Animated, {
  type AnimatedRef,
  type EntryAnimationsValues,
  type ExitAnimationsValues,
  measure,
  type SharedValue,
  useAnimatedRef,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { useRootContext } from './Root/context';

const calculatePosition = (
  popupMeasurement: ElementMeasurement | null,
  anchorMeasurement: ElementMeasurement,
  windowWidth: number,
  windowHeight: number,
  { top = 0, left = 0, bottom = 0, right = 0 }: Insets = {},
) => {
  'worklet';
  if (!popupMeasurement) {
    return anchorMeasurement;
  }

  const { width: popupWidth, height: popupHeight } = popupMeasurement;
  return {
    x: Math.min(Math.max(left, anchorMeasurement.x), windowWidth - popupWidth - right),
    y: Math.min(Math.max(top, anchorMeasurement.y), windowHeight - popupHeight - bottom),
    width: Math.min(popupWidth, windowWidth - left - right),
    height: Math.min(popupHeight, windowHeight - top - bottom),
  };
};

const EnteringTransition =
  (
    popupRef: AnimatedRef<View>,
    anchorMeasurement: ElementMeasurement,
    insets: Insets,
    finalPopupMeasurement: SharedValue<ElementMeasurement>,
  ) =>
  ({ windowWidth, windowHeight }: EntryAnimationsValues) => {
    'worklet';
    const { x, y, width, height } = calculatePosition(
      measure(popupRef),
      anchorMeasurement,
      windowWidth,
      windowHeight,
      insets,
    );
    finalPopupMeasurement.set({ x, y, width, height });
    return {
      initialValues: {
        originX: anchorMeasurement.x,
        originY: anchorMeasurement.y,
        width: anchorMeasurement.width,
        height: anchorMeasurement.height,
      },
      animations: {
        originX: withSpring(x, { duration: 300 }),
        originY: withSpring(y, { duration: 300 }),
        width: withSpring(width, { duration: 300 }),
        height: withSpring(height, { duration: 300 }),
      },
    };
  };

const ExitingTransition =
  (
    triggerRef: AnimatedRef<View>,
    oldAnchorMeasurement: ElementMeasurement,
    finalPopupMeasurement: SharedValue<ElementMeasurement>,
  ) =>
  ({ currentOriginX, currentOriginY, currentWidth, currentHeight }: ExitAnimationsValues) => {
    'worklet';
    const {
      pageX: triggerX,
      pageY: triggerY,
      width: triggerWidth,
      height: triggerHeight,
    } = measure(triggerRef) ?? {
      pageX: oldAnchorMeasurement.x,
      pageY: oldAnchorMeasurement.y,
      width: oldAnchorMeasurement.width,
      height: oldAnchorMeasurement.height,
    };

    const {
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
    } = finalPopupMeasurement.get();

    return {
      initialValues: {
        originX: currentOriginX || initialX,
        originY: currentOriginY || initialY,
        width: currentOriginY ? currentWidth : initialWidth,
        height: currentOriginY ? currentHeight : initialHeight,
        opacity: 1,
      },
      animations: {
        originX: withSpring(triggerX, { duration: 300 }),
        originY: withSpring(triggerY, { duration: 300 }),
        width: withSpring(triggerWidth, { duration: 300 }),
        height: withSpring(triggerHeight, { duration: 300 }),
        opacity: withDelay(150, withSpring(0)),
      },
    };
  };

export interface PopupProps extends PropsWithRender<ViewProps> {
  insets?: Insets;
}

const Popup = ({ style, render, insets = {}, ...props }: PopupProps) => {
  const { triggerRef } = useRootContext();
  const { anchorMeasurement, onClose } = Popover.useRootContext();
  const popupAnimatedRef = useAnimatedRef<View>();
  const finalPopupMeasurement = useSharedValue({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useOnBackPress(onClose);
  useOnResize(onClose);

  return useRenderElement(Animated.View, render, {
    ref: popupAnimatedRef,
    accessibilityViewIsModal: true,
    style: [styles.container, style],
    ...(anchorMeasurement && {
      entering: EnteringTransition(
        popupAnimatedRef,
        anchorMeasurement,
        insets,
        finalPopupMeasurement,
      ),
      exiting: ExitingTransition(triggerRef, anchorMeasurement, finalPopupMeasurement),
    }),
    ...props,
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

Popup.displayName = 'PreviewPopup';

export default Popup;
