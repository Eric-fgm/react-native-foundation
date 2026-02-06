import * as Toggle from '@rn-foundation/toggle';
import * as ToggleGroup from '@rn-foundation/toggle-group';
import { Text } from 'react-native';

export default function ToggleExample() {
  return (
    <ToggleGroup.Root multiple>
      <Toggle.Root>
        {({ activated }) => <Text>Toggle 1 {activated ? 'on' : 'off'}</Text>}
      </Toggle.Root>
      <Toggle.Root>
        {({ activated }) => <Text>Toggle 2 {activated ? 'on' : 'off'}</Text>}
      </Toggle.Root>
      <Toggle.Root>
        {({ activated }) => <Text>Toggle 3 {activated ? 'on' : 'off'}</Text>}
      </Toggle.Root>
    </ToggleGroup.Root>
  );
}
