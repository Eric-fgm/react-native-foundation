import InfiniteList from '@rn-foundation/infinite-list';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function InfiniteListExample() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <BlurView
        tint="extraLight"
        style={{
          paddingTop: 56 + 16,
          paddingBottom: 16,
          alignItems: 'center',
          zIndex: 1,
        }}>
        <Text>Header</Text>
      </BlurView>
      <InfiniteList
        data={Array.from({ length: 20 }, (_, i) => i)}
        gap={4}
        renderItem={({ item }) => (
          <Text
            style={{
              backgroundColor: 'red',
              height: 200,
            }}>
            {item}
          </Text>
        )}
      />
    </>
  );
}
