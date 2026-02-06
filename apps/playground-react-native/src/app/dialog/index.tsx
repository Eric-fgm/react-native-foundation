import * as Dialog from '@rn-foundation/dialog';
import { ScrollView, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function DialogExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text>Trigger</Text>
      </Dialog.Trigger>
      <Dialog.Overlay>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0000002a',
          }}
          entering={FadeIn}
          exiting={FadeOut}
          pointerEvents="box-none">
          <Dialog.Content insets={{ top: 57, bottom: 40 }} style={{ backgroundColor: 'white' }}>
            <Dialog.Close>
              <Text>Close</Text>
            </Dialog.Close>
            <ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ padding: 16 }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima ratione totam
                voluptatem incidunt quaerat eos quam voluptatibus alias sed quisquam non dolore,
                blanditiis, necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt
                quaerat eos quam voluptatibus alias sed quisquam non dolore, blanditiis,
                necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat
                eos quam voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus
                consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat eos quam
                voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus consequuntur
                dolorum. A, culpa natus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nemo minima ratione totam voluptatem incidunt quaerat eos quam voluptatibus alias
                sed quisquam non dolore, blanditiis, necessitatibus consequuntur dolorum. A, culpa
                natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima ratione
                totam voluptatem incidunt quaerat eos quam voluptatibus alias sed quisquam non
                dolore, blanditiis, necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Nemo minima ratione totam voluptatem
                incidunt quaerat eos quam voluptatibus alias sed quisquam non dolore, blanditiis,
                necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat
                eos quam voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima ratione totam
                voluptatem incidunt quaerat eos quam voluptatibus alias sed quisquam non dolore,
                blanditiis, necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt
                quaerat eos quam voluptatibus alias sed quisquam non dolore, blanditiis,
                necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat
                eos quam voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus
                consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat eos quam
                voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus consequuntur
                dolorum. A, culpa natus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nemo minima ratione totam voluptatem incidunt quaerat eos quam voluptatibus alias
                sed quisquam non dolore, blanditiis, necessitatibus consequuntur dolorum. A, culpa
                natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima ratione
                totam voluptatem incidunt quaerat eos quam voluptatibus alias sed quisquam non
                dolore, blanditiis, necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Nemo minima ratione totam voluptatem
                incidunt quaerat eos quam voluptatibus alias sed quisquam non dolore, blanditiis,
                necessitatibus consequuntur dolorum. A, culpa natus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nemo minima ratione totam voluptatem incidunt quaerat
                eos quam voluptatibus alias sed quisquam non dolore, blanditiis, necessitatibus
              </Text>
            </ScrollView>
          </Dialog.Content>
        </Animated.View>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
