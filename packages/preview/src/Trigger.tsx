import * as Popover from '@rn-foundation/popover';
import { useRenderElement } from '@rn-foundation/shared';
import { useCallback, useEffect } from 'react';
import { type GestureResponderEvent, Pressable } from 'react-native';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN, scheduleOnUI } from 'react-native-worklets';

import { useRootContext } from './Root/context';

export interface TriggerProps extends Popover.TriggerProps {}

const Trigger = ({
  withLongPress = true,
  render,
  onPress,
  onLongPress,
  ...props
}: TriggerProps) => {
  const { insets } = useRootContext();
  const { opened, onOpen, anchorMeasurement } = Popover.useRootContext();
  const animatedRef = useAnimatedRef<Animated.View>();

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const zIndex = useSharedValue(1);

  useEffect(() => {
    zIndex.value = 2;
    offsetX.value = withSpring(
      opened && anchorMeasurement && insets.left ? anchorMeasurement.x - insets.left : 0,
    );
    offsetY.value = withSpring(
      opened && anchorMeasurement && insets.top ? anchorMeasurement.y - insets.top : 0,
    );
    opacity.value = withDelay(
      opened && anchorMeasurement ? 200 : 0,
      withSpring(
        opened && anchorMeasurement ? 0 : 1,
        undefined,
        (finished) => finished && (zIndex.value = 1),
      ),
    );
  }, [opened, anchorMeasurement, insets, offsetX, offsetY, opacity, zIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offsetX.value }, { translateY: -offsetY.value }],
    opacity: opacity.value,
    zIndex: zIndex.value,
  }));

  const handleInteraction = useCallback(
    (event: GestureResponderEvent) => {
      withLongPress ? onLongPress?.(event) : onPress?.(event);
      scheduleOnUI(() => {
        const measurement = measure(animatedRef);
        if (!measurement) return;
        scheduleOnRN(onOpen, {
          x: measurement.pageX,
          y: measurement.pageY,
          width: measurement.width,
          height: measurement.height,
        });
      });
    },
    [animatedRef, withLongPress, onPress, onLongPress, onOpen],
  );

  return (
    <Animated.View style={animatedStyle}>
      {useRenderElement(Pressable, render, {
        ref: animatedRef,
        [withLongPress ? 'onLongPress' : 'onPress']: handleInteraction,
        ...props,
      })}
    </Animated.View>
  );
};

Trigger.defaultName = 'PreviewTrigger';

export default Trigger;
