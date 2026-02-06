import { type Insets, type PropsWithRender, useRenderElement } from '@rn-foundation/shared';
import { useCallback, useRef } from 'react';
import { type LayoutChangeEvent, View, type ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useRootContext } from './Root/context';
import { findClosestValue } from './utils';

export interface TrackProps extends PropsWithRender<ViewProps> {
  insets?: Insets;
}

const Track = ({ style, insets, render, ...props }: TrackProps) => {
  const {
    min,
    max,
    value,
    orientation,
    trackMeasurement,
    setTrackMeasurement,
    onProgressChange,
    onProgressCommit,
  } = useRootContext();
  const previousValueRef = useRef(0);
  const indexRef = useRef(0);

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      setTrackMeasurement(event.nativeEvent.layout);
    },
    [setTrackMeasurement],
  );

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onBegin((event) => {
      if (!trackMeasurement) return;
      const progress =
        orientation === 'horizontal'
          ? event.x / trackMeasurement.width
          : event.y / trackMeasurement.height;

      const calculatedValue = progress * (max - min) + min;
      const closestValue = findClosestValue(value, calculatedValue);
      indexRef.current = value.indexOf(closestValue);

      previousValueRef.current = calculatedValue;
      onProgressChange(calculatedValue, indexRef.current);
    })
    .onUpdate((event) => {
      if (!trackMeasurement) return;
      const progress =
        orientation === 'horizontal'
          ? event.translationX / trackMeasurement.width
          : event.translationY / trackMeasurement.height;
      const nextValue = previousValueRef.current + progress * (max - min);

      onProgressChange(nextValue, indexRef.current);
    })
    .onEnd(onProgressCommit)
    .runOnJS(true);

  return (
    <GestureDetector gesture={panGesture}>
      {useRenderElement(View, render, {
        ...props,
        style: [
          {
            paddingLeft: insets?.left ?? 0,
            paddingRight: insets?.right ?? 0,
            paddingTop: insets?.top ?? 0,
            paddingBottom: insets?.bottom ?? 0,
          },
          style,
        ],
        children: (
          <View
            style={[
              {
                width: '100%',
                height: '100%',
                [orientation === 'horizontal' ? 'justifyContent' : 'alignItems']: 'center',
              },
            ]}
            onLayout={handleLayoutChange}
            {...props}>
            {props.children}
          </View>
        ),
      })}
    </GestureDetector>
  );
};

Track.displayName = 'SliderTrack';

export default Track;
