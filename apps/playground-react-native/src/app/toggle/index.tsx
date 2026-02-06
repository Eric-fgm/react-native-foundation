import * as Toggle from '@rn-foundation/toggle';
import { Text } from 'react-native';

export default function ToggleExample() {
  return (
    <Toggle.Root>{({ activated }) => <Text>Toggle {activated ? 'on' : 'off'}</Text>}</Toggle.Root>
  );
}
