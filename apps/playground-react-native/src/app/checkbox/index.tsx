import * as Checkbox from '@rn-foundation/checkbox';
import { Text } from 'react-native';

export default function CheckboxExample() {
  return (
    <Checkbox.Root style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Checkbox.Indicator
        style={{ backgroundColor: 'red', width: 12, height: 12, borderRadius: 6 }}
      />
      <Text>Checkbox</Text>
    </Checkbox.Root>
  );
}
