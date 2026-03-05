import InfiniteList from '@rn-foundation/infinite-list';
import * as Preview from '@rn-foundation/preview';
import { BlurView } from 'expo-blur';
import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function PreviewExample() {
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);
  return (
    <InfiniteList
      data={Array.from({ length: 100 }).map((_, i) => i)}
      keyExtractor={(item) => item.toString()}
      gap={8}
      numColumns={2}
      scrollEnabled={!isPreviewOpened}
      scrollsToTop={!isPreviewOpened}
      renderItem={useCallback(
        ({ item }: { item: number }) => (
          <Preview.Root onOpenedChange={setIsPreviewOpened}>
            <Preview.Trigger style={{ height: 300, backgroundColor: 'lightpink' }} withLongPress>
              <Text>Trigger {item}</Text>
            </Preview.Trigger>
            <Preview.Overlay>
              <AnimatedBlurView
                style={StyleSheet.absoluteFill}
                intensity={100}
                entering={FadeIn.duration(200)}
                exiting={FadeOut}
                pointerEvents="none"
              />
              <Preview.Popup
                insets={{ left: 16, top: 54 }}
                style={{
                  backgroundColor: 'lightpink',
                }}>
                <Text>Trigger {item}</Text>
              </Preview.Popup>
            </Preview.Overlay>
          </Preview.Root>
        ),
        [],
      )}
    />
  );
}
