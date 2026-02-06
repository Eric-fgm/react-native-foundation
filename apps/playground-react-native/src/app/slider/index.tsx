import * as Slider from '@rn-foundation/slider';
import { useState } from 'react';
import { View } from 'react-native';

export default function SliderExample() {
  const [v, setV] = useState([0, 25, 50]);
  return (
    <View style={{ paddingLeft: 24, paddingTop: 24 }}>
      <Slider.Root step={5} stepsBetweenThumbs={4} value={v} onValueChange={setV}>
        <Slider.Track style={{ width: 200, height: 10, backgroundColor: 'gray' }}>
          <Slider.Indicator style={{ height: '100%', backgroundColor: 'black' }} />
          <Slider.Thumb
            index={0}
            style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }}
          />
          <Slider.Thumb
            index={1}
            style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }}
          />
          <Slider.Thumb
            index={2}
            style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }}
          />
        </Slider.Track>
      </Slider.Root>
      <Slider.Root defaultValue={60} orientation="vertical">
        <Slider.Track style={{ marginTop: 48, width: 10, height: 200, backgroundColor: 'gray' }}>
          <Slider.Indicator style={{ width: '100%', backgroundColor: 'black' }} />
          <Slider.Thumb
            index={0}
            style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }}
          />
        </Slider.Track>
      </Slider.Root>
    </View>
  );
}
