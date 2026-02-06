import * as Checkbox from '@rn-foundation/checkbox';
import * as CheckboxGroup from '@rn-foundation/checkbox-group';
import { Text } from 'react-native';

export default function CheckboxGroupExample() {
  return (
    <CheckboxGroup.Root allValues={['checkbox1', 'checkbox2']} defaultValue={['checkbox2']}>
      <Checkbox.Root parent>
        <Text>Checkbox Parent</Text>
        <Checkbox.Indicator style={{ backgroundColor: 'red', width: 12, height: 12 }} />
      </Checkbox.Root>
      <Checkbox.Root
        value="checkbox1"
        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text>Checkbox 1</Text>
        <Checkbox.Indicator
          style={{ backgroundColor: 'red', width: 12, height: 12, borderRadius: 6 }}
        />
      </Checkbox.Root>
      <Checkbox.Root
        value="checkbox2"
        style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text>Checkbox 2</Text>
        <Checkbox.Indicator
          style={{ backgroundColor: 'red', width: 12, height: 12, borderRadius: 6 }}
        />
      </Checkbox.Root>
    </CheckboxGroup.Root>
  );
}
