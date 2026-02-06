import * as CollapsibleTabs from '@rn-foundation/collapsible-tabs';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function CollapsibleTabsExample() {
  return (
    <CollapsibleTabs.Root>
      <CollapsibleTabs.Header>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci
          veniam, aperiam at ea illum enim obcaecati, asperiores velit, veniam, aperiam at ea illum
          enim obcaecati, asperiores velit, veniam, aperiam at ea illum enim obcaecati, asperiores
          velit,
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci
          veniam, aperiam at ea illum enim obcaecati, asperiores velit, veniam, aperiam at ea illum
          enim obcaecati, asperiores velit, veniam, aperiam at ea illum enim obcaecati, asperiores
          velit,
        </Text>
        <CollapsibleTabs.Items>
          <Pressable>
            <Text>TabsList </Text>
          </Pressable>
        </CollapsibleTabs.Items>
      </CollapsibleTabs.Header>
      <CollapsibleTabs.Content>
        <View>
          <Text>Tab 1</Text>
        </View>
        <View>
          <Text>Tab 1</Text>
        </View>
        {(tabProps) => (
          <Animated.ScrollView {...tabProps}>
            <Text style={{ fontSize: 24 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci
              veniam, aperiam at ea illum enim obcaecati, asperiores velit, tempore dolorum ad rerum
              fugiat aliquid necessitatibus sapiente possimus! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Perspiciatis earum iusto architecto alias distinctio
              neque atque delectus, incidunt nesciunt non. Ab iste quod vel itaque magni quia error
              consequuntur inventore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              qui doloremque adipisci veniam, aperiam at ea illum enim obcaecati, asperiores velit,
              tempore dolorum ad rerum fugiat aliquid necessitatibus sapiente possimus! Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Perspiciatis earum iusto architecto
              alias distinctio neque atque delectus, incidunt nesciunt non. Ab iste quod vel itaque
              magni quia error consequuntur inventore? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Non qui doloremque adipisci veniam, aperiam at ea illum enim
              obcaecati, asperiores velit, tempore dolorum ad rerum fugiat aliquid necessitatibus
              sapiente possimus! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis earum iusto architecto alias distinctio neque atque delectus, incidunt
              nesciunt non. Ab iste quod vel itaque magni quia error consequuntur inventore? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci veniam,
              aperiam at ea illum enim obcaecati, asperiores velit, tempore dolorum ad rerum fugiat
              aliquid necessitatibus sapiente possimus! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Perspiciatis earum iusto architecto alias distinctio neque atque
              delectus, incidunt nesciunt non. Ab iste quod vel itaque magni quia error consequuntur
              inventore?
            </Text>
          </Animated.ScrollView>
        )}
        {(tabProps) => (
          <Animated.ScrollView {...tabProps}>
            <Text style={{ fontSize: 24 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci
              veniam, aperiam at ea illum enim obcaecati, asperiores velit, tempore dolorum ad rerum
              fugiat aliquid necessitatibus sapiente possimus! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Perspiciatis earum iusto architecto alias distinctio
              neque atque delectus, incidunt nesciunt non. Ab iste quod vel itaque magni quia error
              consequuntur inventore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              qui doloremque adipisci veniam, aperiam at ea illum enim obcaecati, asperiores velit,
              tempore dolorum ad rerum fugiat aliquid necessitatibus sapiente possimus! Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Perspiciatis earum iusto architecto
              alias distinctio neque atque delectus, incidunt nesciunt non. Ab iste quod vel itaque
              magni quia error consequuntur inventore? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Non qui doloremque adipisci veniam, aperiam at ea illum enim
              obcaecati, asperiores velit, tempore dolorum ad rerum fugiat aliquid necessitatibus
              sapiente possimus! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis earum iusto architecto alias distinctio neque atque delectus, incidunt
              nesciunt non. Ab iste quod vel itaque magni quia error consequuntur inventore? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Non qui doloremque adipisci veniam,
              aperiam at ea illum enim obcaecati, asperiores velit, tempore dolorum ad rerum fugiat
              aliquid necessitatibus sapiente possimus! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Perspiciatis earum iusto architecto alias distinctio neque atque
              delectus, incidunt nesciunt non. Ab iste quod vel itaque magni quia error consequuntur
              inventore?
            </Text>
          </Animated.ScrollView>
        )}
      </CollapsibleTabs.Content>
    </CollapsibleTabs.Root>
  );
}
