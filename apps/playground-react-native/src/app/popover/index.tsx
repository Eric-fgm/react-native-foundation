import * as Popover from '@rn-foundation/popover';
import { ScrollView, Text } from 'react-native';

export default function PopoverExample() {
  return (
    <Popover.Root>
      <Popover.Trigger style={{ width: 100, backgroundColor: 'gray' }}>
        <Text>Trigger</Text>
      </Popover.Trigger>
      <Popover.Overlay>
        <Popover.Popup
          insets={{ top: 57, bottom: 40 }}
          side="top"
          align="end"
          collisionBehavior="flip"
          collisionOffset={8}
          sideOffset={8}
          style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 16px grey',
          }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure suscipit
              similique repellat atque velit? Deleniti aspernatur doloremque dicta, officiis,
              expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              suscipit similique repellat atque velit? Deleniti aspernatur doloremque dicta,
              officiis, expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure suscipit
              similique repellat atque velit? Deleniti aspernatur doloremque dicta, officiis,
              expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              suscipit similique repellat atque velit? Deleniti aspernatur doloremque dicta,
              officiis, expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure suscipit
              similique repellat atque velit? Deleniti aspernatur doloremque dicta, officiis,
              expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              suscipit similique repellat atque velit? Deleniti aspernatur doloremque dicta,
              officiis, expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure suscipit
              similique repellat atque velit? Deleniti aspernatur doloremque dicta, officiis,
              expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              suscipit similique repellat atque velit? Deleniti aspernatur doloremque dicta,
              officiis, expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure suscipit
              similique repellat atque velit? Deleniti aspernatur doloremque dicta, officiis,
              expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
              suscipit similique repellat atque velit? Deleniti aspernatur doloremque dicta,
              officiis, expedita reprehenderit qui ipsam tempore exercitationem perferendis vero quo
              dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam iure
            </Text>
          </ScrollView>
        </Popover.Popup>
      </Popover.Overlay>
    </Popover.Root>
  );
}
