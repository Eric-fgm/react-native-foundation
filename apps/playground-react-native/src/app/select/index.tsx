import * as Select from '@rn-foundation/select';
import { ScrollView, Text } from 'react-native';

export default function SelectExample() {
  return (
    <Select.Root placeholder="Select...">
      <Select.Trigger>
        <Text>
          <Select.Value />
        </Text>
      </Select.Trigger>
      <Select.Overlay>
        <Select.Popup
          insets={{ top: 57, bottom: 40 }}
          side="bottom"
          collisionBehavior="flip"
          collisionOffset={8}
          sideOffset={8}
          style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 16px grey',
          }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {[
              { name: 'Item 1', value: 'item1' },
              { name: 'Item 2', value: 'item2' },
            ].map(({ name, value }) => (
              <Select.Item
                key={value}
                value={value}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {({ selected }) => (
                  <Text>
                    {name} {selected ? '+' : ''}
                  </Text>
                )}
              </Select.Item>
            ))}
          </ScrollView>
        </Select.Popup>
      </Select.Overlay>
    </Select.Root>
  );
}
