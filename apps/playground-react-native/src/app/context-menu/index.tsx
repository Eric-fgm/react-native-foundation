import * as ContextMenu from '@rn-foundation/context-menu';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function ContextMenuExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  return (
    <ContextMenu.Root>
      {({ onClose }) => (
        <>
          <ContextMenu.Trigger style={{ padding: 32 }}>
            <Text>Long press</Text>
          </ContextMenu.Trigger>
          <ContextMenu.Overlay>
            <AnimatedPressable
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              entering={FadeIn}
              exiting={FadeOut}
              onPress={onClose}>
              <ContextMenu.Popup
                collisionBehavior="shift"
                collisionOffset={8}
                style={{
                  padding: 16,
                  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white',
                }}>
                <Text>Group 1</Text>
                <ContextMenu.Item>
                  <Text>Item 1</Text>
                </ContextMenu.Item>
                <ContextMenu.Root>
                  {({ onClose }) => (
                    <>
                      <ContextMenu.SubTrigger>
                        <Text>Item 2 {'>'}</Text>
                      </ContextMenu.SubTrigger>
                      <ContextMenu.Overlay>
                        <AnimatedPressable
                          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                          entering={FadeIn}
                          exiting={FadeOut}
                          onPress={onClose}>
                          <ContextMenu.Popup
                            side="right"
                            align="start"
                            sideOffset={8}
                            collisionOffset={8}
                            style={{
                              padding: 16,
                              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                              backgroundColor: 'white',
                            }}>
                            <Text>SubGroup 1</Text>
                          </ContextMenu.Popup>
                        </AnimatedPressable>
                      </ContextMenu.Overlay>
                    </>
                  )}
                </ContextMenu.Root>
                <ContextMenu.Group>
                  <Text>Group 2</Text>
                  <ContextMenu.CheckboxItem
                    checked={checkbox1}
                    onCheckedChange={setCheckbox1}
                    style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>Item 1</Text>
                    <ContextMenu.CheckboxItemIndicator
                      style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
                    />
                  </ContextMenu.CheckboxItem>
                  <ContextMenu.CheckboxItem
                    checked={checkbox2}
                    onCheckedChange={setCheckbox2}
                    style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>Item 2</Text>
                    <ContextMenu.CheckboxItemIndicator
                      style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
                    />
                  </ContextMenu.CheckboxItem>
                </ContextMenu.Group>
                <ContextMenu.RadioGroup value={selected} onValueChange={setSelected}>
                  <Text>Group 3</Text>
                  <ContextMenu.RadioItem
                    value="item-1"
                    style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>Item 1</Text>
                    <ContextMenu.RadioItemIndicator
                      style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
                    />
                  </ContextMenu.RadioItem>
                  <ContextMenu.RadioItem
                    value="item-2"
                    style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Text>Item 2</Text>
                    <ContextMenu.RadioItemIndicator
                      style={{ borderRadius: 6, width: 12, height: 12, backgroundColor: 'red' }}
                    />
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.Popup>
            </AnimatedPressable>
          </ContextMenu.Overlay>
        </>
      )}
    </ContextMenu.Root>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
