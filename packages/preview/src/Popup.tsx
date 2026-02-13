import * as Popover from '@rn-foundation/popover';
import {
  type ElementMeasurement,
  type Insets,
  type PropsWithRender,
  useOnBackPress,
  useOnResize,
  useRenderElement,
} from '@rn-foundation/shared';
import { StyleSheet, type ViewProps } from 'react-native';
import Animated, {
  type AnimatedRef,
  type ExitAnimationsValues,
  measure,
  useAnimatedRef,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { useRootContext } from './Root/context';

const EnteringTransition =
  (
    animatedRef: AnimatedRef<Animated.View>,
    anchorMeasurement: ElementMeasurement,
    insets: Insets,
  ) =>
  () => {
    'worklet';
    const popupMeasurement = measure(animatedRef);
    return {
      initialValues: {
        originX: anchorMeasurement.x,
        originY: anchorMeasurement.y,
        width: anchorMeasurement.width,
        height: anchorMeasurement.height,
        opacity: 0,
      },
      animations: {
        originX: withSpring(insets.left ?? anchorMeasurement.x),
        originY: withSpring(insets.top ?? anchorMeasurement.y),
        width: withSpring(popupMeasurement?.width ?? anchorMeasurement.width),
        height: withSpring(popupMeasurement?.height ?? anchorMeasurement.height),
        opacity: withSpring(1),
      },
    };
  };

const ExitingTransition =
  (anchorMeasurement: ElementMeasurement, insets: Insets) =>
  ({ currentOriginX, currentOriginY, currentWidth, currentHeight }: ExitAnimationsValues) => {
    'worklet';
    return {
      initialValues: {
        originX: currentOriginX || (insets.left ?? anchorMeasurement.x),
        originY: currentOriginY || (insets.top ?? anchorMeasurement.y),
        width: currentWidth,
        height: currentHeight,
        opacity: 1,
      },
      animations: {
        originX: withSpring(anchorMeasurement.x),
        originY: withSpring(anchorMeasurement.y),
        width: withSpring(anchorMeasurement.width),
        height: withSpring(anchorMeasurement.height),
        opacity: withDelay(200, withSpring(0)),
      },
    };
  };

export interface PopupProps extends PropsWithRender<ViewProps> {}

const Popup = ({ style, render, ...props }: PopupProps) => {
  const { insets } = useRootContext();
  const { anchorMeasurement, onClose } = Popover.useRootContext();
  const popupAnimatedRef = useAnimatedRef<Animated.View>();

  useOnBackPress(onClose);
  useOnResize(onClose);

  return useRenderElement(Animated.View, render, {
    ref: popupAnimatedRef,
    accessibilityViewIsModal: true,
    style: [styles.container, style],
    ...(anchorMeasurement && {
      entering: EnteringTransition(popupAnimatedRef, anchorMeasurement, insets),
      exiting: ExitingTransition(anchorMeasurement, insets),
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
