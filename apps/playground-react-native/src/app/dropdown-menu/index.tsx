import * as DropdownMenu from '@rn-foundation/dropdown-menu';
import { useState } from 'react';
import { Text } from 'react-native';

export default function DropdownMenuExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Text>press</Text>
      </DropdownMenu.Trigger>
      <DropdownMenu.Overlay>
        <DropdownMenu.Popup
          side="bottom"
          collisionBehavior="shift"
          collisionOffset={8}
          style={{
            padding: 16,
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}>
          <Text>Group 1</Text>
          <DropdownMenu.Item>
            <Text>Item 1</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Root>
            <DropdownMenu.SubTrigger>
              <Text>Item 2 {'>'}</Text>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Overlay>
              <DropdownMenu.Popup
                sideOffset={4}
                collisionOffset={8}
                style={{
                  padding: 16,
                  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                }}>
                <Text>SubGroup 1</Text>
              </DropdownMenu.Popup>
            </DropdownMenu.Overlay>
          </DropdownMenu.Root>
          <DropdownMenu.Group>
            <Text>Group 2</Text>
            <DropdownMenu.CheckboxItem
              checked={checkbox1}
              onCheckedChange={setCheckbox1}
              style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text>Item 1</Text>
              <DropdownMenu.CheckboxItemIndicator
                style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
              />
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              checked={checkbox2}
              onCheckedChange={setCheckbox2}
              style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text>Item 2</Text>
              <DropdownMenu.CheckboxItemIndicator
                style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
              />
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.RadioGroup value={selected} onValueChange={setSelected}>
            <Text>Group 3</Text>
            <DropdownMenu.RadioItem
              value="item-1"
              style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text>Item 1</Text>
              <DropdownMenu.RadioItemIndicator
                style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
              />
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value="item-2"
              style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text>Item 2</Text>
              <DropdownMenu.RadioItemIndicator
                style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
              />
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Popup>
      </DropdownMenu.Overlay>
    </DropdownMenu.Root>
  );
}
