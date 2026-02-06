import * as Accordion from '@rn-foundation/accordion';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

export default function AccordionExample() {
  return (
    <>
      <Accordion.Root multiple defaultValue={['panel-2']}>
        <Accordion.Item>
          <Animated.View layout={LinearTransition} style={{ overflow: 'hidden' }}>
            <Accordion.Trigger>
              <Text>Panel 1</Text>
            </Accordion.Trigger>
            <Accordion.Panel render={<Animated.View entering={FadeIn} exiting={FadeOut} />}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi consequatur rem,
                earum fugit perferendis provident. Suscipit hic esse quisquam repellat commodi optio
                aperiam tempora fugit nostrum! Molestiae tenetur tempora fuga!
              </Text>
            </Accordion.Panel>
          </Animated.View>
        </Accordion.Item>
        <Accordion.Item value="panel-2">
          <Animated.View layout={LinearTransition} style={{ overflow: 'hidden' }}>
            <Accordion.Trigger>
              <Text>Panel 2</Text>
            </Accordion.Trigger>
            <Accordion.Panel render={<Animated.View entering={FadeIn} exiting={FadeOut} />}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi consequatur rem,
                earum fugit perferendis provident. Suscipit hic esse quisquam repellat
              </Text>
            </Accordion.Panel>
          </Animated.View>
        </Accordion.Item>
        <Accordion.Item>
          <Animated.View layout={LinearTransition} style={{ overflow: 'hidden' }}>
            <Accordion.Trigger>
              <Text>Panel 3</Text>
            </Accordion.Trigger>
            <Accordion.Panel render={<Animated.View entering={FadeIn} exiting={FadeOut} />}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi consequatur rem,
                earum fugit perferendis provident. Suscipit hic esse quisquam repellat Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Atque voluptatem iure velit totam ea
                fuga voluptate ex ad aliquid aut deleniti, quos quia tenetur eligendi mollitia
                itaque quae quis enim?
              </Text>
            </Accordion.Panel>
          </Animated.View>
        </Accordion.Item>
      </Accordion.Root>

      <ScrollView>
        <View style={{ paddingBottom: 40, height: 1000, justifyContent: 'flex-end' }}>
          <Accordion.Root>
            <Accordion.Item>
              <Animated.View layout={LinearTransition} style={{ overflow: 'hidden' }}>
                <Accordion.Trigger>
                  <Text>Panel 2</Text>
                </Accordion.Trigger>
                <Accordion.Panel render={<Animated.View entering={FadeIn} exiting={FadeOut} />}>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi consequatur
                    rem, earum fugit perferendis provident. Suscipit hic esse quisquam repellat
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatem iure
                    velit totam ea fuga voluptate ex ad aliquid aut deleniti, quos quia tenetur
                    eligendi mollitia itaque quae quis enim?
                  </Text>
                </Accordion.Panel>
              </Animated.View>
            </Accordion.Item>
          </Accordion.Root>
        </View>
      </ScrollView>
    </>
  );
}
