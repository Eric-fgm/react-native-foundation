import * as Popover from '@rn-foundation/popover';
import { useRenderElement } from '@rn-foundation/shared';
import { useCallback, useEffect } from 'react';
import { type GestureResponderEvent, Pressable } from 'react-native';
import Animated, {
  measure,
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
  const { triggerRef } = useRootContext();
  const { opened, onOpen } = Popover.useRootContext();

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(opened ? 0 : 150, withSpring(opened ? 0 : 1, { duration: 1 }));
  }, [opened, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleInteraction = useCallback(
    (event: GestureResponderEvent) => {
      withLongPress ? onLongPress?.(event) : onPress?.(event);
      scheduleOnUI(() => {
        const measurement = measure(triggerRef);
        if (!measurement) return;
        scheduleOnRN(onOpen, {
          x: measurement.pageX,
          y: measurement.pageY,
          width: measurement.width,
          height: measurement.height,
        });
      });
    },
    [triggerRef, withLongPress, onPress, onLongPress, onOpen],
  );

  return (
    <Animated.View style={animatedStyle}>
      {useRenderElement(Pressable, render, {
        ref: triggerRef,
        [withLongPress ? 'onLongPress' : 'onPress']: handleInteraction,
        ...props,
      })}
    </Animated.View>
  );
};

Trigger.defaultName = 'PreviewTrigger';

export default Trigger;
