import { useToastManager } from '@rn-foundation/toast';
import { Pressable, Text } from 'react-native';

export default function ToastExample() {
  const toastManager = useToastManager();

  return (
    <>
      <Pressable onPress={() => toastManager.add({ position: 'top-left' })}>
        <Text>Show toast top-left</Text>
      </Pressable>
      <Pressable onPress={() => toastManager.add({ position: 'top-center' })}>
        <Text>Show toast top-center</Text>
      </Pressable>
      <Pressable onPress={() => toastManager.add({ position: 'top-right' })}>
        <Text>Show toast top-right</Text>
      </Pressable>
      <Pressable onPress={() => toastManager.add({ position: 'bottom-left' })}>
        <Text>Show toast bottom-left</Text>
      </Pressable>
      <Pressable onPress={() => toastManager.add({ position: 'bottom-center' })}>
        <Text>Show toast bottom-center</Text>
      </Pressable>
      <Pressable onPress={() => toastManager.add({ position: 'bottom-right' })}>
        <Text>Show toast bottom-right</Text>
      </Pressable>
    </>
  );
}
